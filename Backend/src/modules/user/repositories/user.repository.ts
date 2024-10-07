import { Gender, PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {

    constructor() {
        console.log("UserRepository Created !!");
    }

    // Create a new user
    public async create(username: string, email: string, password: string, role: UserRole, contactNumber: string,age : number,gender : Gender,address : string,insuranceCard : string,rationCard : string,permanentIllness : string,disabilityStatus : string): Promise<any> {
        return prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password,
                role:'Patient',
                contactNumber:contactNumber,
                age : age,
                gender : gender,
                address : address,
                insuranceCard : insuranceCard,
                rationCard : rationCard,
                permanentIllness : permanentIllness,
                disabilityStatus : disabilityStatus
            }
        });
    }

    public async getUserByEmail(email: string): Promise<any> {
        return prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    //for registration
    public async register(user: any) {
        return this.create(user.username, user.email, user.password, user.role, user.contactNumber,user?.age,user?.gender,user?.address,user?.insuranceCard,user?.rationCard,user?.permanentIllness,user?.disabilityStatus);
    }
}