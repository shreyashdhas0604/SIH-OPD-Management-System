import router from "./routes/opd.routes";
import { Router } from "express";

const OPDModule = Router();

OPDModule.use("/opd", router);

export { OPDModule };