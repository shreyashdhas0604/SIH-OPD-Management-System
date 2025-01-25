import { Router } from 'express';
import { HospitalController } from '../controllers/hospital.controller';
import { isAuthenticated } from '../../user/middlewares/user.middleware';
import multer from 'multer';

const upload = multer();
const router = Router();
const hospitalController = new HospitalController();

router.get('/ping', (req, res) => {
    res.send('pong'); 
}); 

// Create a new hospital
router.post('/create-hospital',isAuthenticated,upload.array('hospitalImages') ,  hospitalController.createHospital.bind(hospitalController));

// // Get all hospitals
router.get('/hospitals', isAuthenticated, hospitalController.getHospitals.bind(hospitalController));

// // Get a single hospital
router.get('/hospital/:id', isAuthenticated, hospitalController.getHospital.bind(hospitalController));

//update hospital
router.put('/update-hospital/:id', isAuthenticated, hospitalController.updateHospital.bind(hospitalController));

// // Delete a hospital
router.delete('/delete-hospital/:id', isAuthenticated, hospitalController.deleteHospital.bind(hospitalController));

//verify hospital by admin
router.put('/verify-hospital/:id', isAuthenticated, hospitalController.verifyHospital.bind(hospitalController));

// get doctors by department id and hospital id
router.get('/:hospitalId/:departmentId/doctors', isAuthenticated, hospitalController.getDoctorsByHospitalandDepartment.bind(hospitalController));

//get all doctors of a hospital
router.get('/:hospitalId/doctors', isAuthenticated, hospitalController.getDoctorsByHospital.bind(hospitalController));

//get all verified hospitals
router.get('/verified-hospitals', isAuthenticated, hospitalController.getVerifiedHospitals.bind(hospitalController));

//get all beds in a hospital
router.get('/:hospitalId/beds', isAuthenticated, hospitalController.getBedsByHospital.bind(hospitalController));

//get all departments in a hospital
router.get('/:hospitalId/departments', isAuthenticated, hospitalController.getDepartmentsByHospital.bind(hospitalController));

//get all ratings for a hospital
router.get('/:hospitalId/ratings', isAuthenticated, hospitalController.getRatingsByHospital.bind(hospitalController));

//add a rating to a hospital by user id
router.post('/:hospitalId/rating', isAuthenticated, hospitalController.addRating.bind(hospitalController));

//update a specific rating by user id for a hospital
router.put('/:hospitalId/rating/:ratingId', isAuthenticated, hospitalController.updateRating.bind(hospitalController));

//delete specific rating for a hospital
router.delete('/:hospitalId/rating/:ratingId', isAuthenticated, hospitalController.deleteRating.bind(hospitalController));
 
//get all available timeslots for a hospital
router.get('/:hospitalId/timeslots', isAuthenticated, hospitalController.getTimeSlots.bind(hospitalController));

//add a timeslot for a hospital
router.post('/:hospitalId/timeslots', isAuthenticated, hospitalController.addTimeSlot.bind(hospitalController));

//update a specific timeslot for a hospital
router.put('/:hospitalId/timeslots/:timeslotId', isAuthenticated, hospitalController.updateTimeSlot.bind(hospitalController));

//delete a specific timeslot for a hospital
router.delete('/:hospitalId/timeslots/:timeslotId', isAuthenticated, hospitalController.deleteTimeSlot.bind(hospitalController));

//get slot availability for a hospital by date in params
router.get('/availability/:hospitalId/:date', isAuthenticated, hospitalController.getAvailability.bind(hospitalController));

//get available timeslots
router.get('/available-timeslots/:hospitalId/:date', isAuthenticated, hospitalController.getAvailableTimeSlots.bind(hospitalController));

export default router;