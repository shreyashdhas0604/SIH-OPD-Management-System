import { Router } from "express"
import { adminRouter } from "./routes/routes";

const AdminModule = Router()

AdminModule.use("/admin", adminRouter)

export { AdminModule };