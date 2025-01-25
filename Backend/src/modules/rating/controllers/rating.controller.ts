import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { RatingService } from "../services/rating.service";

interface RatingParam {
    userID: number;
    hospitalID: number | null;
    rating: Float32Array | 0.0;
    comment: string | null;
    doctorID: number | null;
}

export class RatingController {
    private ratingService: RatingService;

    constructor() {
        this.ratingService = new RatingService();
    }

    public async registerRatingforHospital(req: any, res: any){
        try {

            const ratingparam = req.body as RatingParam;
            const rating = await this.ratingService.registerRatingforHospital(ratingparam);
            if(rating instanceof ApiError){
                return new ApiError(500,"Error in registering rating");
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in registerRatingforhospital controller : ",error)
            return new ApiError(500,"Error in registering rating");
        }
    }

    public async registerRatingforDoctor(req: any, res: any){
        try {
            const ratingparam = req.body;
            const rating = await this.ratingService.registerRatingforDoctor(ratingparam);
            if(rating instanceof ApiError){
                return res.status(500).json(new ApiError(500,"Error in registering rating"));
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in registerRatingfordoctor controller : ",error)
            return new ApiError(500,"Error in registering rating");
        }
    }

    public async getRatingByHospitalID(req: any, res: any){
        try {
            const hospitalID = req.params.hospitalID;
            const rating = await this.ratingService.getRatingByHospitalID(hospitalID);
            if(rating instanceof ApiError){
                return new ApiError(500,"Error in getting rating");
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in getRatingByHospitalID controller : ",error)
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async getRatingByDoctorID(req: any, res: any){
        try {
            const doctorID = req.params.doctorID;
            const rating = await this.ratingService.getRatingByDoctorID(doctorID);
            if(rating instanceof ApiError){
                return new ApiError(500,"Error in getting rating");
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in getRatingByDoctorID controller : ",error)
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async getRatingByID(req: any, res: any){
        try {
            const ratingID = req.params.ratingID;
            const rating = await this.ratingService.getRatingByID(ratingID);
            if(rating instanceof ApiError){
                return new ApiError(500,"Error in getting rating");
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in getRatingByID controller : ",error)
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async getRatingByUserID(req: any, res: any){
        try {
            const userID = req.params.userID;
            const rating = await this.ratingService.getRatingByUserID(userID);
            if(rating instanceof ApiError){
                return new ApiError(500,"Error in getting rating");
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in getRatingByUserID controller : ",error)
            return new ApiError(500,"Error in getting rating");
        }
    }

    public async updateRating(req: any, res: any){
        try {
            const ratingID = req.params.ratingID;
            const ratingparam = req.body as RatingParam;
            const rating = await this.ratingService.updateRating(ratingID,ratingparam);
            if(rating instanceof ApiError){
                return new ApiError(500,"Error in updating rating");
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in updateRating controller : ",error)
            return new ApiError(500,"Error in updating rating");
        }
    }

    public async deleteRating(req: any, res: any){
        try {
            const ratingID = req.params.ratingID;
            const rating = await this.ratingService.deleteRating(ratingID);
            if(rating instanceof ApiError){
                return new ApiError(500,"Error in deleting rating");
            }
            return res.status(200).json(new ApiResponse(200,rating));
        } catch (error) {
            console.log("Error in deleteRating controller : ",error)
            return new ApiError(500,"Error in deleting rating");
        }
    }
}