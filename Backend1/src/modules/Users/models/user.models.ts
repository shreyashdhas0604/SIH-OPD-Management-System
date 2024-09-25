// src/index.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    },
  });

  console.log('New User:', newUser);

  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('All Users:', users);
}



export default main;