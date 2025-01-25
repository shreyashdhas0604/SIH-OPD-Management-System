import { Router } from "express"
import { userRouter } from "./routes/user.routes";

const UserModule = Router()

UserModule.use("/user", userRouter)

export { UserModule };