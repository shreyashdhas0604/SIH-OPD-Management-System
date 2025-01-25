import { Request, Response } from "express"

export interface UsersType {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    //token: string
}

export interface UserBody {
    body: {
        first_name: string,
        last_name: string,
        email: string,
        password: string,
    }

}

export interface ReqMid extends Request {
    user: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    };
    token: string;
}