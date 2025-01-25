import { isAuthenticated } from "../../user/middlewares/user.middleware";
import { Router } from "express";
import { OPDController } from "../controllers/opd.controller";

const router = Router();
const opdController = new OPDController();

//register a new opd visit
router.post("/register", isAuthenticated, opdController.registerOpdVisit.bind(opdController));

//get opd registrations details by opd id
router.get("/:id", isAuthenticated, opdController.getOpdVisitById.bind(opdController));
 
//update opd visit details by opd id
router.put("/:id", isAuthenticated, opdController.updateOpdVisit.bind(opdController));

//delete opd registration by opd id
router.delete("/:id", isAuthenticated, opdController.deleteOpdVisit.bind(opdController));


//Get a list of all OPD registrations
router.get("/getallopds", isAuthenticated, opdController.getAllOpdVisits.bind(opdController));

// Get all OPD registrations for a specific patient
router.get("/getpatientopds/:id", isAuthenticated, opdController.getPatientOpds.bind(opdController));
 
// Get all OPD registrations handled by a specific doctor
router.get("/getdoctoropds/:id", isAuthenticated, opdController.getDoctorOpds.bind(opdController));

//Update payment status (paid or pending)
router.put("/updatepayment/:id", isAuthenticated, opdController.updatePaymentStatus.bind(opdController));

// Get OPD registrations by date range
router.get("/getopdsbydate", isAuthenticated, opdController.getOpdsByDate.bind(opdController));

// Create a follow-up registration for an existing patient
router.post("/followup", isAuthenticated, opdController.registerFollowUp.bind(opdController));

//Get all OPD registrations for a specific department
router.get("/getdepartmentopds/:departmentId", isAuthenticated, opdController.getDepartmentOpds.bind(opdController));

// Get all OPD registrations by payment status
// Endpoint: GET /getopdsbypaymentstatus/:status
router.get("/getopdsbypaymentstatus/:status", isAuthenticated, opdController.getOpdsByPaymentStatus.bind(opdController));

//SCHEDULE MEET
router.post("/schedulemeet", isAuthenticated, opdController.scheduleMeet.bind(opdController));

//video-call
router.get("/video-call/:id", isAuthenticated, opdController.videoCall.bind(opdController));

export default router;