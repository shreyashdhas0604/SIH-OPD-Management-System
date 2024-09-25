"use strict";
// import { Request, Response } from 'express';
// import { UserService } from '../services/user.service';
// export class UserController {
//     private userService: UserService;
//     constructor() {
//         this.userService = new UserService();
//     }
//     async createUser(req: Request, res: Response): Promise<any> {
//         try {
//             const user = await this.userService.createUserAndHandleEvents(req.body);
//             return res.status(201).json({ user});
//         } catch (error) {
//             console.error("Error in UserController createUser:", error);
//             if (error instanceof Error) {
//                 return res.status(500).json({ message: error.message });
//             } else {
//                 return res.status(500).json({ message: 'An unknown error occurred.' });
//             }
//         }
//     }
// }
