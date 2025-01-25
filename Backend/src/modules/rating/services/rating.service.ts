import exp from "constants";
import { ApiError } from "../../utils/ApiError";
import {RatingRepository} from "../repositories/rating.repository";

export class RatingService{
    private ratingRepository: RatingRepository;

    constructor() {
        this.ratingRepository = new RatingRepository();
    }

    public async registerRatingforHospital(ratingparam: any){
        try {
            const rating = await this.ratingRepository.registerRatingforHospital(ratingparam);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in registerRatingforHospital Service : ",error);
            return new ApiError(500,"Error in registering rating");
        }
    }

    public async getRatingByHospitalID(hospitalID: number){
        try {
            const rating = await this.ratingRepository.getRatingByHospitalID(hospitalID);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in getRatingByHospitalID Service : ",error);
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async getRatingByDoctorID(doctorID: number){
        try {
            const rating = await this.ratingRepository.getRatingByDoctorID(doctorID);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in getRatingByDoctorID Service : ",error);
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async getRatingByID(ratingID: number){
        try {
            const rating = await this.ratingRepository.getRatingByID(ratingID);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in getRatingByID Service : ",error);
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async getRatingByUserID(userID: number){
        try {
            const rating = await this.ratingRepository.getRatingByUserID(userID);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in getRatingByUserID Service : ",error);
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async updateRating(ratingID: number, ratingparam: any){
        try {
            const rating = await this.ratingRepository.updateRating(ratingID,ratingparam);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in updateRating Service : ",error);
            return new ApiError(500,"Error in updating rating");
        }
    }

    public async deleteRating(ratingID: number){
        try {
            const rating = await this.ratingRepository.deleteRating(ratingID);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in deleteRating Service : ",error);
            return new ApiError(500,"Error in deleting rating");
        }
    }

    public async registerRatingforDoctor(ratingparam: any){
        try {
            const rating = await this.ratingRepository.registerRatingforDoctor(ratingparam);
            if(rating instanceof ApiError){
                return rating;
            }
            return rating;
        } catch (error) {
            console.log("Error in registerRatingforDoctor Service : ",error);
            return new ApiError(500,"Error in registering rating");
        }
    }
}