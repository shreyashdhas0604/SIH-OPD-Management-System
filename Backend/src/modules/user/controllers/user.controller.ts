import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        console.log("UserController Created !!");
    }

    // Arrow function to preserve the context of `this`
    public register = async (req: Request, res: Response) => {
        try {
            console.log(this.userService); // Check if this.userService is defined
            const user = await this.userService.register(req.body);
            res.status(201).json({
                user: user, 
                message: 'User created successfully'
            });
        } catch (error: any) {
            console.error(error.message);
            res.status(400).json({ message: error.message });
        }
    };
}
