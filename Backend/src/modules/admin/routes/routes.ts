import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";


const adminRouter = Router();
const adminController = new AdminController();

adminRouter.get("/ping", (req, res) => res.send("pong"))


export { adminRouter };