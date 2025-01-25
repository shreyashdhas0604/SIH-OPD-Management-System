import router from "./routes/rating.routes";
import { Router } from "express";

const RatingModule = Router();

RatingModule.use("/rating", router);

export { RatingModule };