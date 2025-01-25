import { Router } from "express";
import router from "./routes/doctor.routes";

const DoctorModule = Router();

DoctorModule.use("/doctor", router);

export { DoctorModule };

