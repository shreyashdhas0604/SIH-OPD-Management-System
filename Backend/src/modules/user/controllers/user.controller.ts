import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { UserService } from "../services/user.service.js";
import cloudinaryService from "../../utils/cloudinaryService.js";
import exp from "constants";
import redisClient from "../../../database/redis/Redis.js";
import { producer } from "../../ApacheKafkaService/kafkaClient.js";

const userRepository = new UserRepository();
const userService = new UserService();

export class UserController {
 
    private static async generateAccessAndRefreshTokens(userId: number) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) throw new ApiError(404, "User not found");

            const accessToken = await userService.generateAccessToken(user);
            const refreshToken = await userService.generateRefreshToken(user);
            user.refreshToken = refreshToken;

            return { accessToken, refreshToken };
        } catch (error) {
            console.error("Error in generateAccessAndRefreshTokens Controller : ",error);
            throw new ApiError(500, "Something went wrong while generating refresh and access token");
        }
    }

    public async registerUser(req: any, res: any) {
        try {
            
            const { username, email, password, contactNumber, avatar, age, gender, address, insuranceCard, rationCard, permanentIllness, disabilityStatus, role } = req.body;
    
            if (!username || !email || !password || !contactNumber || !role) {
                return res.status(400).json({
                    message: 'Please provide all the details (username, email, password, contactNumber, role)',
                });
            }
    
            const existingUser = await userRepository.getUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    message: 'User with this email or username already exists',
                });
            }
    
            let avatarUrl = avatar || 'https://www.shutterstock.com/shutterstock/photos/1760295569/display_1500/stock-vector-profile-picture-avatar-icon-vector-1760295569.jpg'; // Default avatar URL

    
            if (req.files ) {
                const file = req.files[req.files.length - 1];
                try {
                    const uploadResult = await cloudinaryService.uploadImage(file.buffer, `${username}-${Date.now()}`);
                    const result = uploadResult as { secure_url: string };
                    avatarUrl = result.secure_url;
                } catch (uploadError) {
                    return res.status(500).json({
                        message: 'Error while uploading avatar image',
                        error: uploadError,
                    });
                }
            }
    
            const userData = {
                username,
                email,
                password,
                contactNumber,
                avatar: avatarUrl,
                role,
                age: age ? parseInt(age) : null,
                gender: gender || null,
                address: address || null,
                insuranceCard: insuranceCard || null,
                rationCard: rationCard || null,
                permanentIllness: permanentIllness || null,
                disabilityStatus: disabilityStatus || null,
            };
    
            // Create user
            const user = await userRepository.register(userData);
    
            if (!user) {
                return res.status(500).json({
                    message: 'Something went wrong while registering the user',
                });
            }

            await producer.send({
                topic : 'UserRegistered',
                messages : [{
                    value : JSON.stringify({patientId : user.id,...user})
                },],
            })
    
            return res.status(201).json({
                message: 'User registered successfully',
                user,
            });
    
        } catch (error) {
            console.error("Error in registerUser Controller : ",error);
            return res.status(500).json({
                message: 'Error while registering user',
                error,
            });
        }
    }

    public loginUser = asyncHandler(async (req: any, res: any) => {
        try {
            const { email, password } = req.body;

        if (!password && !email) {
            throw new ApiError(400, "email and password is required");
        }

        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            throw new ApiError(404, "User does not exist");
        }

        const isPasswordValid = await userRepository.verifyPassword(password, user.password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials");
        }

        const { accessToken, refreshToken } = await UserController.generateAccessAndRefreshTokens(user.id);

        const loggedInUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        };

        const options = {
            httpOnly: true,
            secure: false,
        };
        const option1 = {
            httpOnly: true,
            secure: false,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        };
        return res
            .setHeader("Authorization", `Bearer ${accessToken}`)
            .status(200)
            .cookie("accessToken", String(accessToken), options)
            .cookie("refreshToken", String(refreshToken), option1)
            .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged In Successfully"));
        } catch (error) {
            console.log("Error in loginUser Controller : ",error);
            res.status(500).json(new ApiResponse(500, {}, "Something went wrong while logging in user"));
        }
    });

    // Logout User
    public logoutUser = asyncHandler(async (req: any, res: any) => {
       try {
        const refrreshToken = req.cookies.refreshToken;
        if(!refrreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }
        let userId: number;
        try {
            const decoded = jwt.verify(refrreshToken, process.env.JWT_REFRESH_SECRET_KEY!);
            userId = (decoded as { userId: number }).userId; // Cast to the expected payload type
        } catch (error) {
            throw new ApiError(403, "Invalid refresh token"); // Handle token verification failure
        }

        await userRepository.deleteRefreshToken(userId);

        const options = {
            httpOnly: true,
            secure: false
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"));
       } catch (error) {
           console.log("Error in logoutUser Controller : ",error);
            res.status(500).json(new ApiResponse(500, {}, "Something went wrong while logging out user"));
       }
    });

    // Refresh Access Token
    public refreshAccessToken = asyncHandler(async (req: any, res: any) => {
        try {
            const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
            
            if (!incomingRefreshToken) {
                throw new ApiError(401, "Unauthorized request");
            }
            const decodedToken = jwt.verify(incomingRefreshToken, String(process.env.JWT_REFRESH_SECRET_KEY)) as { userId : number };
            const user = await userRepository.getUserById(decodedToken.userId);
            const refreshToken = await userRepository.getRefreshToken(decodedToken.userId);
            if(!refreshToken) {
                throw new ApiError(401, "Invalid refresh token");
            }
            const dbrefreshToken = refreshToken.token;


            if (!user || incomingRefreshToken !== dbrefreshToken) {
                throw new ApiError(401, "Refresh token is expired or invalid");
            }


            const accessToken = await userService.generateAccessToken(user);

            const options = {
                httpOnly: true,
                secure: true
            };
            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", dbrefreshToken, options)
                .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
        } catch (error) {
            console.log("Error in refreshAccessToken Controller : ",error);
            if (error instanceof Error) {
                throw new ApiError(401, error.message || "Invalid refresh token");
            } else {
                throw new ApiError(401, "Invalid refresh token");
            }
        }
        finally {
            console.log("Access Token Refereshed Successfully");
        }
    });

    // Change Current Password
    public changeCurrentPassword = asyncHandler(async (req: any, res: any) => {
        try {
            const { oldPassword, newPassword } = req.body;

        const user = await userRepository.getUserById(req.user.userId);
        const isPasswordCorrect = await userRepository.verifyPassword(oldPassword, user.password);

        if (!isPasswordCorrect) {
            throw new ApiError(400, "Invalid old password");
        }

        user.password = newPassword;
        await userRepository.updatePassword(user.email, newPassword);

        return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
        } catch (error) {
            console.log("Error in changeCurrentPassword Controller : ",error);
            res.status(500).json(new ApiResponse(500, {}, "Something went wrong while changing password"));
            
        }
    });

    public async forgetPassword(req: any, res: any) {
        const { email} = req.body;
        if(!email) {
            throw new ApiError(400, "Email is required");
        }
        try {
          const response = await userService.handleForgetPassword(email);
          res.status(200).json(new ApiResponse(200, response, "OTP sent successfully"));
        } catch (error) {
            console.log("Error in forgetPassword controller : ",error);
          res.status(400).json({ error: error });
        }
      }

      public async resetPassword(req:any,res:any){
        try {
            const {email,otp,newPassword} = req.body;
            if(!email || !otp){
                throw new ApiError(400, "Email and OTP is required");
            }
            const response = await userService.updatePassword(email,otp,newPassword);
            if(response == true){
               return res.status(200).json(new ApiResponse(200, {}, "Password Updated Successfully"));
            }else{
                return res.status(400).json(new ApiResponse(400, {}, "Failed To Update Password"));
            }
        } catch (error) {
            console.log("Error in resetPassword controller : ",error);
            res.status(500).json({ error: error });
        }

    }

    // Get Current User
    public async getMe(req: any, res: any) {
        try {
            const user = await userRepository.getUserById(parseInt(req.user.userId));
            const cachedKey = `/getme:${req.user.userId}`;
            const cachedData = await redisClient.get(cachedKey);

            if(cachedData){
                return res.status(200).json(new ApiResponse(200,JSON.parse(cachedData),"User Fetched Successfully using Redis"));
            }

            if (!user) {
                return res.status(404).json(new ApiResponse(404, {}, "User not found"));
            }

            await redisClient.set(cachedKey,JSON.stringify(user),{EX : 600}); 

            return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
        } catch (error) {
            console.log("Error in getMe controller : ",error);
            return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while fetching user"));
        }
    }

    // Update Profile
    public async updateProfile(req: any, res: any) {
        try {
            const { username, email, contactNumber, age  } = req.body;
            const user = await userRepository.getUserById(req.user.userId);
            if (!user) {
                return res.status(404).json(new ApiResponse(404, {}, "User not found"));
            }
            const avatar = user.avatar;
            let avatarUrl = avatar || 'https://www.shutterstock.com/shutterstock/photos/1760295569/display_1500/stock-vector-profile-picture-avatar-icon-vector-1760295569.jpg'; // Default avatar

            console.log("req.files : ",req.files);

            if (req.files && req.files.length > 0) {
                const file = req.files[req.files.length - 1];
                try {
                    const uploadResult = await cloudinaryService.uploadImage(file.buffer, `${username}-${Date.now()}`);
                    const result = uploadResult as { secure_url: string };
                    avatarUrl = result.secure_url;
                } catch (uploadError) {
                    return res.status(500).json({
                        message: 'Error while uploading avatar image',
                        error: uploadError,
                    });
                }
            }

            const updatedUser = await userRepository.updateProfile(req.user.userId, {
                username,
                email,
                contactNumber,
                avatar: avatarUrl,
                age: age ? parseInt(age) : null,
            });

            if (!updatedUser) {
                return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while updating user profile"));
            }

            return res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully"));
        } catch (error) {
            console.log("Error in updateProfile controller : ",error);
            return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while updating user profile"));
        }

    }

    //get all users
    public async getAllUsers(req: any, res: any) {
        try {
            const users = await userRepository.getAllUsers();
            if (!users) {
                return res.status(404).json(new ApiResponse(404, {}, "No users found"));
            }
            return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
        } catch (error) {
            console.log("Error in getAllUsers controller : ",error);
            return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while fetching users"));
        }
    }
}

