import router from "./routes/department.routes";
import { Router } from "express";

const DepartmentModule = Router();

DepartmentModule.use("/department", router);

export { DepartmentModule };