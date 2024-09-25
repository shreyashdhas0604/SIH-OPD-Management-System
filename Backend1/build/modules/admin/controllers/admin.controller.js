"use strict";
// import { Request, Response } from 'express';
// import { AdminService } from '../services/admin.service';
// export class AdminController {
//     private adminService: AdminService;
//     constructor() {
//         this.adminService = new AdminService();
//     }
//     async saveQuestions(req: Request, res: Response): Promise<any> {
//         if (!req.file) {
//             res.status(400).send('No file uploaded');
//             return;
//         }
//         try {
//             await this.adminService.saveQuestions(req, res);
//         } catch (error) {
//             console.error("Error in AdminController saveQuestions:", error);
//             if (error instanceof Error) {
//                 res.status(500).json({ message: error.message });
//             } else {
//                 res.status(500).json({ message: 'An unknown error occurred.' });
//             }
//         }
//     }
//     async generateLeaderboard(req: Request, res: Response): Promise<any> {
//         try {
//             await this.adminService.generateLeaderboard(req, res);
//         } catch (error) {
//             console.error("Error in AdminController generateLeaderboard:", error);
//             if (error instanceof Error) {
//                 res.status(500).json({ message: error.message });
//             } else {
//                 res.status(500).json({ message: 'An unknown error occurred.' });
//             }
//         }
//     }
// }
