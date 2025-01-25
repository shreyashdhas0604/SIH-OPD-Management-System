import { isAuthenticated } from "../../user/middlewares/user.middleware";
import { Router } from "express";
import { DoctorController } from "../controllers/doctor.controller";

const router = Router();
const doctorController = new DoctorController();

//register a doctor and assign it to hospital
router.post('/register', isAuthenticated, doctorController.createDoctor.bind(doctorController));

//get all doctors by department id in params
router.get('/getDoctors/:departmentId', isAuthenticated, doctorController.getDoctorsByDepartment.bind(doctorController));

//get doctors by hospital id
router.get('/getDoctorsByHospital/:hospitalId', isAuthenticated, doctorController.getDoctorsByHospital.bind(doctorController));

//get doctors based on availability
router.get('/getDoctorsByAvailability/:availability', isAuthenticated, doctorController.getDoctorsByAvailability.bind(doctorController));

//get specific doctor by id
router.get('/getDoctor/:id', isAuthenticated, doctorController.getDoctor.bind(doctorController));

//update doctor details
router.put('/updateDoctor/:id', isAuthenticated, doctorController.updateDoctor.bind(doctorController));

//delete doctor
router.delete('/deleteDoctor/:id', isAuthenticated, doctorController.deleteDoctor.bind(doctorController));

//get all ratings for a specific doctor
router.get('/getRatings/:id', isAuthenticated, doctorController.getRatings.bind(doctorController));

//add rating to doctor by user id
router.post('/addRating/:id', isAuthenticated, doctorController.addRating.bind(doctorController));

//update a specific rating for the doctor
router.put('/updateRating/:id', isAuthenticated, doctorController.updateRating.bind(doctorController));

//delete a specific rating for the doctor
router.delete('/deleteRating/:id', isAuthenticated, doctorController.deleteRating.bind(doctorController));

//get list of all doctors
router.get('/getAllDoctors', isAuthenticated, doctorController.getAllDoctors.bind(doctorController));

//get list of all doctors by speciality
router.get('/getDoctorsBySpeciality/:speciality', isAuthenticated, doctorController.getDoctorsBySpeciality.bind(doctorController));

//Get all OPD registrations handled by a specific doctor
router.get('/getOPDRegistrations/:doctorId', isAuthenticated, doctorController.getOPDRegistrations.bind(doctorController)); 

export default router;