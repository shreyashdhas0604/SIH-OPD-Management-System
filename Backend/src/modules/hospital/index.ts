import { Router } from "express";
import router from "./routes/hospital.routes";

const HospitalModule = Router()

HospitalModule.use("/hospital", router)

export { HospitalModule };