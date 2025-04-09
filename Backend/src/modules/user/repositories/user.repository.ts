import { Gender, PrismaClient, UserRole } from '@prisma/client';
import  bcryptjs  from 'bcryptjs';
const prisma = new PrismaClient();

export class UserRepository {

    constructor() {
    }

    // Create a new user
    public async create(username: string, email: string, password: string, role: UserRole, contactNumber: string,age : number,gender : Gender,address : string,insuranceCard : string,rationCard : string,permanentIllness : string,disabilityStatus : string,avatar : any): Promise<any> {
       try {
        return prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password,
                role: role || 'Patient',
                contactNumber:contactNumber,
                age : age,
                gender : gender,
                address : address,
                insuranceCard : insuranceCard,
                rationCard : rationCard,
                permanentIllness : permanentIllness,
                disabilityStatus : disabilityStatus,
                avatar : avatar || "https://www.shutterstock.com/shutterstock/photos/1760295569/display_1500/stock-vector-profile-picture-avatar-icon-vector-1760295569.jpg",
            }
        });
       } catch (error) {
        console.log("Error in create repo : " + error);
       }
    }

    public async getUserByEmail(email: string): Promise<any> {
       try {
         return prisma.user.findUnique({
            where: {
                email: email,
            },
        });    
       } catch (error) {
        console.log("Error in getUserByEmail repo : " + error);
       }
    }

    //for registration
    public async register(user: any) {
       try {
        const hashedPassword = await bcryptjs.hash(user.password, 10);
        user.password = hashedPassword;

        return this.create(user.username, user.email, user.password, user.role, user.contactNumber,user?.age,user?.gender,user?.address,user?.insuranceCard,user?.rationCard,user?.permanentIllness,user?.disabilityStatus,user?.avatar);
       } catch (error) {
        console.log("Error in registerUser repo : " + error);
       }
    }

    public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcryptjs.compare(password, hashedPassword);
        } catch (error) {
            console.log("Error in verifyPassword repo : " + error);
            return false;
        }
    }

    public async updatePassword(email: string, password: string): Promise<any> {
        try {
            const hashedPassword = await bcryptjs.hash(password, 10);
        const response =  prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: hashedPassword,
            },
        });
        return response;
        } catch (error) {
            console.log("Error in updatePassword repo : " + error);   
        }
    }

    public async updateOtp(userId: number, otp: string, otpExpires: Date) {
        try {
            return await prisma.user.update({
                where: { id: userId },
                data: { otp, otpExpires },
              });
        } catch (error) {
            console.log("Error in updateOtp repo : " + error);
            
        }
      }

     public async verifyOtp(userId: number, otp: string) {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user && user.otp === otp && user.otpExpires! > new Date()) {
          return true;
        }
        return false;
        } catch (error) {
            console.log("Error in verifyOtp repo : " + error);
            
        }
      }

    public async getUserById(id: number): Promise<any> {
       try {
        // exclude password from the query

        const user = await prisma.user.findUnique({
            where: {
            id: id,
            },
            select: {
            id: true,
            username: true,
            email: true,
            role: true,
            avatar: true,
            contactNumber: true,
            age: true,
            gender: true,
            address: true,
            insuranceCard: true,
            rationCard: true,
            permanentIllness: true,
            disabilityStatus: true,
            doctorInfo: {
                select:{
                    department: true,
                    specialization: true,
                    experience: true,
                    qualification: true,
                    hospital : true,
                    registrations: {
                        select : {
                            patient : {
                                select : {
                                    id : true,
                                    username : true,
                                    email : true,
                                    role : true,
                                    avatar : true,
                                    contactNumber : true,
                                    age : true,
                                }
                            },
                            OPDTime : true,
                            hospital : true,
                            date : true,
                            isVirtualOPD : true,
                            updatedAt : true,
                        }
                    },
                    ratings: true,
                }
            },
            beds: true,
            ratings: true,
            managedHospitals: true,
            registrations: {
                select: {
                    doctor : {
                        select:{
                            user : {
                                select : {
                                    id : true,
                                    username : true,
                                    email : true,
                                    role : true,
                                    avatar : true,
                                    contactNumber : true,
                                    age : true,
                            },
                        }
                    },
                },
                hospital : true,
                date : true,
                OPDTime : true,
                isVirtualOPD : true,
                updatedAt : true,
                VirtualOPDRoomName : true,
            }
            },
            },
        });
            if (!user) {
                throw new Error('User not found');
            }
            return user;

       } catch (error) {
        console.log("Failed To GetUserById repo : " + error);
       }
    }

    public async saveRefreshToken(userId: number, refreshToken: string): Promise<any> {
        try {
            const existingToken = await this.getRefreshToken(userId);
            if (existingToken) {
                return await prisma.refreshToken.update({
                    where: {
                        userId: userId,
                    },
                    data: {
                        token: refreshToken,
                    },
                });
            }
            
            return await prisma.refreshToken.create({
                data: {
                    userId: userId,
                    token: refreshToken,
                },
            });
        } catch (error) {
            console.log("Failed To SaveRefreshToken repo : " + error);
            
        }
    }

    public async getRefreshToken(userId: number): Promise<any> {
       try {
        return prisma.refreshToken.findUnique({
            where: { 
                userId: userId,
            },
        });
       } catch (error) {
        console.log("Failed To GetRefreshToken repo : " + error);
       }
    }

    public async deleteRefreshToken(userId : number): Promise<any> {
        try {
            return prisma.refreshToken.delete({
                where: {
                    userId: userId,
                },
            });
        } catch (error) {
            console.log("Failed To DeleteRefreshToken repo : " + error);
            
        }
    }

    public async updateProfile(userId: number, data: any): Promise<any> {
        try {
            return prisma.user.update({
                where: { id: userId },
                data: data,
            });
        } catch (error) {
            console.log("Failed To UpdateProfile repo : " + error);
        }
    }

    // Get all users
    public async getAllUsers(): Promise<any> {
        try {
            return prisma.user.findMany();
        } catch (error) {
            console.log("Failed To GetAllUsers repo : " + error);
        }
    }
}