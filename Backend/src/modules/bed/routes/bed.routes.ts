import { isAuthenticated } from "../../user/middlewares/user.middleware";
import { Router } from "express";
import { BedController } from "../controllers/bed.controller";

const router = Router();

const bedController = new BedController();
 
//register a new bed
router.post("/register", isAuthenticated, bedController.registerBed.bind(bedController));

//get bed details by bed id
router.get("/:id", isAuthenticated, bedController.getBedById.bind(bedController));

//update bed details by bed id
router.put("/:id", isAuthenticated, bedController.updateBed.bind(bedController));

//delete bed by bed id only admin can delete bed
router.delete("/:id", isAuthenticated, bedController.removeBed.bind(bedController));

//Get a list of all beds
router.get("/getallbeds", isAuthenticated, bedController.getallBeds.bind(bedController));

//get a list of available beds
router.get("/getavailablebeds", isAuthenticated, bedController.getBedsByAvailability.bind(bedController));

//Get all beds in a specific hospital
router.get("/gethospitalbeds/:id", isAuthenticated, bedController.getBedsByHospital.bind(bedController));

//Update bed status (available, booked, occupied, under maintenance)
router.put("/updatestatus/:id", isAuthenticated, bedController.updateBedStatus.bind(bedController));








export default router;