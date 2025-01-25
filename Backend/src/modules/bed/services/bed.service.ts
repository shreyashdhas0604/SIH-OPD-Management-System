import { Bed, BedStatus } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";
import { BedRepository } from "../repositories/bed.repository";

export class BedService{
    private bedRepository: BedRepository;

    constructor() {
        this.bedRepository = new BedRepository();
    }

    public async registerBed(bedparam : Bed){
        try {
            const bed = this.bedRepository.register(bedparam);
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in registerBed Service : ",error);
            return new ApiError(500,"Error in registering bed");
        }
    }

    public async getBedById(id: number){
        try {
            const bed = this.bedRepository.getBedById(id);
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in getBedById Service : ",error);
            return new ApiError(500,"Error in getting bed");
        }
    }

    public async updateBed(bedparam : Bed){
        try {
            const bed = this.bedRepository.updateBed(bedparam);
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in updateBed Service : ",error);
            return new ApiError(500,"Error in updating bed");
        }
    }

    public async removeBed(id: number){
        try {
            const bed = this.bedRepository.deleteBed(id);
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in removeBed Service : ",error);
            return new ApiError(500,"Error in deleting bed");
        }
    }

    public async checkAdmin(role : any){
        try {
            
            if(role == "Admin"){
                return true;
            }
            return false;

        } catch (error) {
            console.log("Error in checkAdmin Service : ",error);
            return new ApiError(500,"Error in checking admin");
        }
    }

    public async getAllBeds(){
        try {
            const beds = this.bedRepository.getAllBeds();
            if(beds == undefined){
                return undefined;
            }
            return beds;
        } catch (error) {
            console.log("Error in getAllBeds Service : ",error);
            return new ApiError(500,"Error in getting all beds");
        }
    }

    public async getBedsByAvailability(availability: boolean){
        try {
            const beds = this.bedRepository.getBedsByAvailability(availability);
            if(beds == undefined){
                return undefined;
            }
            return beds;
        } catch (error) {
            console.log("Error in getBedsByAvailability Service : ",error);
            return new ApiError(500,"Error in getting beds by availability");
        }
    }

    public async getBedsByHospital(hospitalID: number){
        try {
            const beds = this.bedRepository.getBedsByHospital(hospitalID);
            if(beds == undefined){
                return undefined;
            }
            return beds;
        } catch (error) {
            console.log("Error in getBedsByHospital Service : ",error);
            return new ApiError(500,"Error in getting beds by hospital");
        }
    }

    public async updateBedStatus(id: number, status: BedStatus){
        try {
            const bed = this.bedRepository.updateBedStatus(id, status);
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in updateBedStatus Service : ",error);
            return new ApiError(500,"Error in updating bed status");
        }
    }
}