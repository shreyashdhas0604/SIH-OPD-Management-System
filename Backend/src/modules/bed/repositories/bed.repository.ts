import { Bed, PrismaClient, BedStatus } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";

const prisma = new PrismaClient();

export class BedRepository{

    public async register(bedparam : Bed){
        try {
            const bed = await prisma.bed.create({
                data: {
                    bedNumber : bedparam.bedNumber,
                    availability : bedparam.availability,
                    patientID : bedparam.patientID,
                    registrationID : bedparam.registrationID,
                    hospitalID : bedparam.hospitalID,
                    status: bedparam.status
                }
            });
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in registerBed Repository : ",error);
            return new ApiError(500,"Error in registering bed");
        }
    }

    public async getBedById(id: number){
        try {
            const bed = await prisma.bed.findUnique({
                where: {
                    id: id
                }
            });
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in getBedById Repository : ",error);
            return new ApiError(500,"Error in getting bed");
        }
    }

    public async updateBed(bedparam : Bed){
        try {
            const bed = await prisma.bed.update({
                where: {
                    id: bedparam.id
                },
                data: {
                    bedNumber : bedparam.bedNumber,
                    availability : bedparam.availability,
                    patientID : bedparam.patientID,
                    registrationID : bedparam.registrationID,
                    hospitalID : bedparam.hospitalID,
                    status: bedparam.status
                }
            });
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in updateBed Repository : ",error);
            return new ApiError(500,"Error in updating bed");
        }
    }

    public async deleteBed(id: number){
        try {
            const bed = await prisma.bed.delete({
                where: {
                    id: id
                }
            });
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in deleteBed Repository : ",error);
            return new ApiError(500,"Error in deleting bed");
        }
    }

    public async getAllBeds(){
        try {
            const beds = await prisma.bed.findMany();
            if(beds == undefined){
                return undefined;
            }
            return beds;
        } catch (error) {
            console.log("Error in getAllBeds Repository : ",error);
            return new ApiError(500,"Error in getting all beds");
        }
    }

    public async getBedsByAvailability(availability: boolean){
        try {
            const beds = await prisma.bed.findMany({
                where: {
                    availability: availability
                }
            });
            if(beds == undefined){
                return undefined;
            }
            return beds;
        } catch (error) {
            console.log("Error in getBedsByAvailability Repository : ",error);
            return new ApiError(500,"Error in getting beds by availability");
        }
    }

    public async getBedsByHospital(hospitalID: number){
        try {
            const beds = await prisma.bed.findMany({
                where: {
                    hospitalID: hospitalID
                }
            });
            if(beds == undefined){
                return undefined;
            }
            return beds;
        } catch (error) {
            console.log("Error in getBedsByHospital Repository : ",error);
            return new ApiError(500,"Error in getting beds by hospital");
        }
    }

    public async updateBedStatus(id: number, status: BedStatus){
        try {
            const bed = await prisma.bed.update({
                where: {
                    id: id
                },
                data: {
                    status: status
                }
            });
            if(bed == undefined){
                return undefined;
            }
            return bed;
        } catch (error) {
            console.log("Error in updateBedStatus Repository : ",error);
            return new ApiError(500,"Error in updating bed status");
        }
    }

}