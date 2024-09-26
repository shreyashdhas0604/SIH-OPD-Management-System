import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
    // Create a new user
    public async create(username: string, email: string, password: string, role: UserRole, contactNumber: string) {
        return prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password,
                role:'Patient',
                contactNumber:contactNumber,
            },
        });
    }
}