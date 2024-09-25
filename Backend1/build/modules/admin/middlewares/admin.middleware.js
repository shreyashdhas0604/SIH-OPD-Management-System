"use strict";
// import { PrismaClient } from '@prisma/client';
// import { Question } from '../../../database/interfaces/admin.interface';
// import fs from 'fs';
// import { parse as csvParser } from 'csv-parse';
// const prisma = new PrismaClient();
// export function parseCsv(filePath: string): Promise<Question[] | null> {
//     return new Promise((resolve, reject) => {
//         const questions: Question[] = [];
//         fs.createReadStream(filePath)
//             .pipe(csvParser())
//             .on('data', (data) => {
//                 const question: Question = {
//                     id: data.id,
//                     statement: data.statement,
//                     options: data.options.split(','),  // Assuming options are comma-separated
//                     code: data.code || null,
//                     image_url: data.image_url || null,
//                     correct_option: parseInt(data.correct_option, 10),
//                     fk_event: data.fk_event ? JSON.parse(data.fk_event) : null, // Assuming fk_event is a JSON string in the CSV
//                     created_at: new Date(data.created_at),
//                     updated_at: new Date(data.updated_at),
//                 };
//                 questions.push(question);
//             })
//             .on('end', () => {
//                 resolve(questions);
//             })
//             .on('error', (error) => {
//                 reject(error);
//             });
//     });
// }
