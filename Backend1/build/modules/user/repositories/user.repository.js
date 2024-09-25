"use strict";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// export class UserRepository {
//   // Create a new user
//     public async create(email: string, password: string, firstName: string, lastName: string) {
//     return prisma.user.create({
//       data: {
//         email,
//         password,
//         firstName,  
//         lastName,   
//       },
//     });
//   }
//   // Find an event by slot ID
//   public async findEventBySlotId(slotId: string) {
//     return prisma.event.findUnique({
//       where: { emsSlotId: slotId }, 
//     });
//   }
//   // Create a new user-event association
//   public async createUserEvent(userId: number, eventId: number, testId: number) {
//     return prisma.user_Event.create({
//       data: {
//         userId,
//         eventId,
//         testId: testId,
//       },
//     });
//   }
//   // Upsert a test
//   public async upsertTest(testId: number, eventId: number, userId: number, startTime: Date, endTime: Date) {
//     return prisma.test.upsert({
//       where: { id: testId },
//       update: { 
//         eventId, 
//         userId,
//         startTime,
//         endTime
//       },  // Update existing test with new values
//       create: { 
//         id: testId,
//         eventId,
//         userId,
//         startTime,
//         endTime
//       },  // Create a new test if it does not exist
//     });
//   }
//     // Create Test Record
//     public async createTest(eventId: number, userId: number, startTime: Date, endTime: Date) {
//         try {
//             return prisma.test.create({
//                 data: {
//                     eventId,
//                     userId,
//                     startTime,
//                     endTime
//                 },
//             });
//         } catch (error) {
//             console.error("Error creating Test:", error);
//             throw error;
//         }
//     }
//     public async handleTestCreationOrUpdate(eventId: number, userId: number, startTime: Date, endTime: Date) {
//         try {
//             // Check if a test already exists for the given userId and eventId
//             const existingTest = await prisma.test.findFirst({
//                 where: {
//                     eventId: eventId,
//                     userId: userId,
//                 },
//             })
//             let testObj;
//             if (existingTest) {
//                 // If the test exists, upsert it (update or create if not exists)
//                 testObj = await this.upsertTest(existingTest.id, eventId, userId, startTime, endTime);
//             } else {
//                 // If the test does not exist, create a new one
//                 testObj = await this.createTest(eventId, userId, startTime, endTime);
//             }
//             return testObj;
//         } catch (error) {
//             console.error("Error in handleTestCreationOrUpdate:", error);
//             throw error;
//         }
//     }
//     public async createResult(testId: number, eventId: number, score: number) {
//         try {
//             return prisma.test_Result.create({
//                 data: {
//                     testId,
//                     eventId,
//                     score
//                 },
//             });
//         } catch (error) {
//             console.error("Error creating User_Event:", error);
//             throw error;
//         }
//     }
// }
