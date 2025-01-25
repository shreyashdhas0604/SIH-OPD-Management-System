import exp from "constants";
import { ApiError } from "../../utils/ApiError";
import {AddutilityRepository} from "../repositories/addutility.repository";

export class AddUtilityService{
    private addutilityRepository: AddutilityRepository;

    constructor() {
        this.addutilityRepository = new AddutilityRepository();
    }

    public async getUtilityforHospital(){
        try {
            const utility = await this.addutilityRepository.getUtilityforHospital();
            if(utility instanceof ApiError){
                return utility;
            }
            return utility;
        } catch (error) {
            return new ApiError(500,"Error in getting utility");
        }
    }

    public async getUtilityforDoctor(){
        try {
            const utility = await this.addutilityRepository.getUtilityforDoctor();
            if(utility instanceof ApiError){
                return utility;
            }
            return utility;
        } catch (error) {
            return new ApiError(500,"Error in getting utility");
        }
    }

    public async search(query: any){
        try {
            const utility = await this.addutilityRepository.search(query);
            if(utility instanceof ApiError){
                return utility;
            }
            return utility;
        } catch (error) {
            return new ApiError(500,"Error in getting utility");
        }
    }
    
}