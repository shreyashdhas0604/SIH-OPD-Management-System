// //import { UsersType } from "../../../database/interfaces/user.interface";
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// export interface UsersType {
//     id: number;
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
// }

// export class AdminRepository {
//     async create(email: string, password: string, first_name: string, last_name: string): Promise<UsersType> {
//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 password,
//                 firstName: first_name,
//                 lastName: last_name
//             },
//         });
//         return user;
//     }

//     async findEventBySlotId(slotId: string) {
//         return await prisma.event.findFirst({
//             where: { emsSlotId: slotId },
//         });
//     }

//     async createUserEvent(userId: number, eventId: number) { // `userId` and `eventId` are integers now
//         return await prisma.user_Event.create({
//             data: {
//                 userId: userId, // Foreign key reference to the User
//                 eventId: eventId, // Foreign key reference to the Event
//                 testId: 0, // Initialize or handle as required (this needs to be updated accordingly)
//                  // Initialize or handle as required (this needs to be updated accordingly)
//             },
//         });
//     }

//     async insertQuestion(
//         statement: string, 
//         options: string[], 
//         code: string | null, 
//         imageUrl: string | null, 
//         correctOption: number, 
//         eventId: number // Now an integer ID
//     ) {
//         return await prisma.question.create({
//             data: {
//                 statement: statement,
//                 options: options,
//                 code: code,
//                 imageUrl: imageUrl,
//                 correctOption: correctOption,
//                 eventId: eventId, // Foreign key reference to Event
//             },
//         });
//     }

//     async getEvents(emsEventId: string) {
//         return await prisma.event.findMany({
//             where: { emsEventId: emsEventId },
//         });
//     }

//     async getTestResults(slotIds: number[]) {
//         return await prisma.test_Result.findMany({
//             where: {
//                 eventId: {
//                     in: slotIds,
//                 }
//             },
//             orderBy: {
//                 score: 'desc',
//             }
//         });
//     }
// }
