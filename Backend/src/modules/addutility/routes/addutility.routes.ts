import { Router } from "express";
import { AddUtilityController } from "../controllers/addutility.controller";

const router = Router();

const addUtilityController = new AddUtilityController();

//Get statistics for all hospitals (e.g., average ratings, number of doctors, bed availability).
router.get("/getUtilityforHospital", addUtilityController.getUtilityforHospital);

// Get statistics for all doctors (e.g., average ratings, patient count).
router.get("/getUtilityforDoctor", addUtilityController.getUtilityforDoctor);

// Perform a global search across doctors, hospitals, departments, and beds based on query parameters.
router.get("/search", addUtilityController.search);


export default router;