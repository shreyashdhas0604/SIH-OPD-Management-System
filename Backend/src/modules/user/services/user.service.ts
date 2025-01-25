import { UserRepository } from "../repositories/user.repository";
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../../utils/emailUtil';
import { ApiError } from "../../utils/ApiError";

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async register(user: any): Promise<any> {
        try {

            let userObj = await this.userRepository.getUserByEmail(user.email);

            if(userObj) {
                throw new Error("User Already Exists");
                return userObj;
            }

            userObj = await this.userRepository.register(user);
            
            if(!userObj) {
                throw new Error("Failed to Create User");
                return;
            }

            return userObj;

        } catch (error: any) {
            console.log("Error in registerUser Service : " + error);
            throw new Error("Failed To Create User : " + error.message);
        }
    }

    public async login(user: any): Promise<any> {
        try {

            let userObj = await this.userRepository.getUserByEmail(user.email);

            if(!userObj) {
                throw new Error("User Not Found");
            }

            if(userObj.password !== user.password) {
                throw new Error("Invalid Password");
            }

            return userObj;

        } catch (error: any) {
            console.log("Error in loginUser Service : " + error);
            throw new Error("Failed To Login : " + error.message);
        }
    }

    public async me(user: any): Promise<any> {
        try {
            let userObj = await this.userRepository.getUserById(user.id);
            if(!userObj) {
                throw new Error("User Not Found");
            }
            return userObj;
        } catch (error: any) {
            console.log("Error in me Service : " + error);
            throw new Error("Failed To Get User : " + error.message);
        }
    }

    public async generateAccessToken(user: any){
        try {
            const secret = (process.env.JWT_ACCESS_SECRET_KEY)?.toString();
            const accessTOken = jwt.sign(
                {
                    userId : user.id,
                    email : user.email,
                    username : user.username,
                    role : user.role,
                }, 
                secret as string,
                {
                    expiresIn: '1h'  //1 hour
                }
            );
            return accessTOken;
        } catch (error) {
            console.log("Error in generateAccessToken Service : " + error);
        }
    }

    public async generateRefreshToken(user: any){
        try {
            if(!process.env.JWT_REFRESH_SECRET_KEY){
                throw new Error("JWT_REFRESH_SECRET_KEY Not Found");
            }
            const secret = String(process.env.JWT_REFRESH_SECRET_KEY);
            const token = jwt.sign(
                {
                    userId : user.id,
                },
                secret,
                {
                    expiresIn: '7d'
                }
            );
            await this.userRepository.saveRefreshToken(user.id, token);
            return token;
        } catch (error) {
            console.log("Failed To Generate Refresh Token : " + error);
        }
    }

    public async handleForgetPassword(email: string) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) throw new Error('User not found');
    
              // Generate OTP and send email
              const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
              const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
              await this.userRepository.updateOtp(user.id, generatedOtp, otpExpires);
              await sendOtpEmail(email, generatedOtp);
              return { message: 'OTP sent to your email' };
        } catch (error) {
            console.log("Error in the handleForgetPassword Service : " + error);
        }
      }

    public async updatePassword(email: string,otp : string, password: string): Promise<any> {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if(!user) throw new ApiError(404, 'User not found');
            const isValid = await this.userRepository.verifyOtp(user.id,otp);
            if (!isValid) throw new ApiError(400, 'Invalid OTP');
            await this.userRepository.updatePassword(email, password);
            return true;
        } catch (error: any) {
            throw new Error("Error in UpdatePassword Service : " + error.message);
        }
    }
}