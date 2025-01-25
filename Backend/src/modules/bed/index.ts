import router from "./routes/bed.routes";
import { Router } from "express";

const BedModule = Router();

BedModule.use("/bed", router);

export { BedModule };