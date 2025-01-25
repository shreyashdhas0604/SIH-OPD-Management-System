import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { AddUtilityService } from "../services/addutility.service";


export class AddUtilityController {
    private addUtilityService: AddUtilityService;

    constructor() {
        this.addUtilityService = new AddUtilityService();
    }

    public async getUtilityforHospital(req: any, res: any){
        try {
            const utility = await this.addUtilityService.getUtilityforHospital();
            if(utility instanceof ApiError){
                return new ApiError(500,"Error in getting utility");
            }
            return res.status(200).json(new ApiResponse(200,utility));
        } catch (error) {
            console.log("Error in getUtilityforHospital controller : ",error);
            return new ApiError(500,"Error in getting utility");
        }
    }

    public async getUtilityforDoctor(req: any, res: any){
        try {
            const utility = await this.addUtilityService.getUtilityforDoctor();
            if(utility instanceof ApiError){
                return new ApiError(500,"Error in getting utility");
            }
            return res.status(200).json(new ApiResponse(200,utility));
        } catch (error) {
            console.log("Error in getUtilityforDoctor controller : ",error);
            return new ApiError(500,"Error in getting utility");
        }
    }

    public async search(req: any, res: any){
        try {
            const utility = await this.addUtilityService.search(req.query);
            if(utility instanceof ApiError){
                return new ApiError(500,"Error in getting utility");
            }
            return res.status(200).json(new ApiResponse(200,utility));
        } catch (error) {
            console.log("Error in search controller : ",error);
            return new ApiError(500,"Error in getting utility");
        }
    }

}