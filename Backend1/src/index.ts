// import express, { Express, Request, Response } from "express";
// import http from "http";
// import cors from "cors";
// import * as dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client";
// import { UserModule } from "./modules/user";
// import { AdminModule } from "./modules/admin";
// import { TestModule } from "./modules/test";
// import { QuestionModule } from "./modules/question";
// import { EventModule } from "./modules/event";
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';
// import path from 'path';
// const cron = require("node-cron");
// import { ResultModule } from "./modules/result";
import main from "./modules/Users/models/user.models";

// // Load environment variables
// dotenv.config();

// const app: Express = express();
// const server = http.createServer(app);
// const prisma = new PrismaClient();


// app.use(express.json());
// app.use(cors());
// app.set('PORT', process.env.PORT || 3000);
// app.set("BASE_URL", process.env.BASE_URL || "localhost");

// app.use('/api', UserModule, AdminModule);
// app.use('/api/u', UserModule);

// app.get('/health', async (req: Request, res: Response) => {
//     try {
//         await prisma.$queryRaw`SELECT 1;`;
//         res.status(200).send("Hello");
//     } catch (err: any) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//     }
// });

// const initializeDatabase = async () => {
//     try {
//         await prisma.$queryRaw`SELECT 1;`;
//         console.log("Database connection successful");
//     } catch (error) {
//         console.error("Error connecting to the database:", error);
//         process.exit(1); // Exit the process with an error code
//     }
// };

// const startServer = async () => {
//     try {
//         await initializeDatabase(); // Ensure the database is connected
//         const port: number = app.get('PORT');
//         server.listen(port, (): void => {
//             console.log("Server is listening on", port);
//         });
//     } catch (error) {
//         console.error('Error starting server:', error);
//     }
// };

// startServer();


console.log("Hello World 1");
main();

// export default server;
