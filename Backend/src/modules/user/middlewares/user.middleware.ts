// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
// import { ReqMid } from "../../../database/interfaces/user.interface";

const prisma = new PrismaClient();

// export const isAuthenticated = async (req: ReqMid, res: Response, next: NextFunction) => {
//     try {
//         const authHeader = req.header("Authorization");
//         const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

//         if (!token) {
//             return res.status(401).json({ error: "Unauthorized user! No token provided." });
//         }

//         const userToken = await prisma.userToken.findFirst({
//             where: { token },
//             include: { user: true }
//         });

//         if (!userToken) {
//             return res.status(401).json({ error: "Unauthorized user! Invalid or expired token." });
//         }

//         const userId = userToken.user.id;
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//         });

//         if (!user) {
//             return res.status(404).json({ error: "User not found." });
//         }

//         // Map the database fields and handle null cases
//         req.user = {
//             id: user.id,
//             first_name: user.firstName ?? '', // Handle null by assigning an empty string
//             last_name: user.lastName ?? '',  // Handle null by assigning an empty string
//             email: user.email,
//             password: user.password,
//         };

//         req.token = userToken.token;

//         next();
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };



// export const generateUserToken = async (userId: number) => {
//     try {
//         console.log(userId);
//         const key = process.env.TOKEN_SECRET || 'default_secret_key';
//         const token = jwt.sign({ id: userId }, key, { expiresIn: '24h' });

//         const tokenRecord = await prisma.userToken.create({
//             data: {
//                 userId: userId,
//                 token,
//             },
//             include: {
//                 user: true,
//             }
//         });

//         return token;
//     } catch (err: any) {
//         console.log(err);
//         throw new Error('Could not generate user token');
//     }
// };
