import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import {UserModule} from './modules/user';
dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const prisma = new PrismaClient();


async function initializeApp() {
    app.use(express.json());
    app.use(cors());
    app.set('PORT', process.env.PORT || 6000);
    app.set("BASE_URL", process.env.BASE_URL || "localhost");

    // app.use('/api', AdminModule);
    app.use('/api', UserModule);

    app.get('/health', async (req: Request, res: Response) => {
        try {
            await prisma.$queryRaw`SELECT 1;`;
            res.status(200).send("Hello");
        } catch (err: any) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    });
}

async function initializeDatabase() {
    try {
        await prisma.$queryRaw`SELECT 1;`;
        console.log("Database connection successful");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}

// // async function initializeRedis() {
// //     try {
// //         client.on('error', (err) => {
// //             console.error('Redis Client Error', err);
// //         });
// //         console.log('Connected to Redis');
// //     } catch (error) {
// //         console.error("Error connecting to Redis:", error);
// //         throw error;
// //     }
// // }


async function startServer() {
    try {
        await initializeDatabase();
        // await initializeRedis();
        await initializeApp();

        const port = app.get('PORT');
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer();

process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    // await redisClient.quit();
    process.exit(0);
});

export default server;