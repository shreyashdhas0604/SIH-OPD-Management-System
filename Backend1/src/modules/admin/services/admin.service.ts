// import { AdminRepository } from "../repositories/admin.repository";
// import { Request, Response } from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import csv from 'csv-parser';
// import path from 'path';

// interface CSVRow {
//     statement: string;
//     optionA: string;
//     optionB: string;
//     optionC: string;
//     optionD: string;
//     code?: string | null;
//     image_url?: string | null;
//     correct_option: number;
//     fk_event: number; // Assuming event is represented by an ID in the CSV
// }

// export class AdminService {
//     private adminRepository: AdminRepository;
//     private upload: multer.Multer;

//     constructor() {
//         this.adminRepository = new AdminRepository();
//         this.upload = multer({ dest: 'uploads/' });
//     }

//     // Function to handle CSV file upload and parse it
//     public saveQuestions = async (req: Request, res: Response): Promise<void> => {
//         if (!req.file) {
//             res.status(400).send('No file uploaded');
//             return;
//         }

//         const filePath = req.file.path;
//         const questions: CSVRow[] = [];

//         try {
//             fs.createReadStream(filePath)
//                 .pipe(csv())
//                 .on('data', (row: CSVRow) => {
//                     questions.push(row); // Collect rows to process them later
//                 })
//                 .on('end', async () => {
//                     try {
//                         // Insert questions into the database
//                         for (const row of questions) {
//                             const img = row.image_url || null;

//                             await this.adminRepository.insertQuestion(
//                                 row.statement,
//                                 [row.optionA, row.optionB, row.optionC, row.optionD],
//                                 row.code || null,
//                                 img,
//                                 Number(row.correct_option),
//                                 Number(req.body.eventId)
//                             );
//                         }
                        
//                         // Remove the uploaded file after processing
//                         fs.unlinkSync(filePath);

//                         res.status(200).send('CSV file successfully processed');
//                     } catch (error) {
//                         console.error('Error inserting questions into database:', error);
//                         res.status(500).send('Error while inserting questions into database');
//                     }
//                 })
//                 .on('error', (error) => {
//                     console.error('Error reading CSV file:', error);
//                     res.status(500).send('Error while reading CSV file');
//                 });
//         } catch (error) {
//             console.error('Error processing CSV file:', error);
//             res.status(500).send('Error while processing CSV file');
//         }
//     }

//     public generateLeaderboard = async (req: Request, res: Response): Promise<any> => {
//         try {
//             const emsEventId = req.params.emsEventId;
//             const slots = await this.adminRepository.getEvents(emsEventId);

//             if (slots.length == 0)
//                 res.status(400).send('No Slots found for the given EventId');

//             const slotIds = [];
//             for (const slot of slots)
//                 slotIds.push(slot.id);

//             const results = await this.adminRepository.getTestResults(slotIds);
//             res.status(200).json(results);

//         } catch (error) {
//             console.error('Error Generating Leaderboard:', error);
//             res.status(500).send('Error Generating Leaderboard');
//         }
//     }
// }
