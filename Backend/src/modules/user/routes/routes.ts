import { Router } from "express";
import { UserController } from "../controllers/user.controller";
const { isAuthenticated } = require("../middlewares/user.middleware");


const userRouter = Router();
const userController = new UserController();

userRouter.get("/ping", (req, res) => res.send("pong"))


export { userRouter };