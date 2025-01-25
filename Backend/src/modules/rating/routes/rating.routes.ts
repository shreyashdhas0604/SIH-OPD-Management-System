import { isAuthenticated } from "../../user/middlewares/user.middleware";
import { Router } from "express";
import { RatingController } from "../controllers/rating.controller";

const router = Router();

const ratingController = new RatingController();

//Create a new rating for a hospital
router.post("/registerforhospital", isAuthenticated, ratingController.registerRatingforHospital.bind(ratingController));

//create a new rating for a doctor
router.post("/registerfordoctor", isAuthenticated, ratingController.registerRatingforDoctor.bind(ratingController));

//get all ratings for a hospital
router.get("/getbyhospital/:hospitalID", isAuthenticated, ratingController.getRatingByHospitalID.bind(ratingController));

//get all ratings for a doctor
router.get("/getbydoctor/:doctorID", isAuthenticated, ratingController.getRatingByDoctorID.bind(ratingController));

//get details of a specific rating
router.get("/get/:ratingID", isAuthenticated, ratingController.getRatingByID.bind(ratingController));

//get all ratings by a userid
router.get("/getbyuser/:userID", isAuthenticated, ratingController.getRatingByUserID.bind(ratingController));

//update an existing rating by ratingID
router.put("/update/:ratingID", isAuthenticated, ratingController.updateRating.bind(ratingController));

//delete a rating by ratingID
router.delete("/delete/:ratingID", isAuthenticated, ratingController.deleteRating.bind(ratingController));

export default router; 