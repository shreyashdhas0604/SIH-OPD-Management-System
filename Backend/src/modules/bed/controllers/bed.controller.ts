import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import {BedService} from "../services/bed.service";
import { Bed, BedStatus } from "@prisma/client";



export class BedController {
    private bedService: BedService;

    constructor() {
        this.bedService = new BedService();
    }

    public async registerBed(req: any, res: any) {
        try {
            const adminCheckResult = await this.bedService.checkAdmin(req.user.role);
            
            if(adminCheckResult == true){
                const bed:Bed = {
                    id: req.body.id,
                    bedNumber: req.body.bedNumber,
                    availability: req.body.availability,
                    patientID: req.body.patientId,
                    registrationID: req.body.registrationID,
                    assignedDate: new Date(req.body.assignedDate),
                    hospitalID: req.body.hospitalID,
                    status: req.body.status
                };
    
                const result = await this.bedService.registerBed(bed);
    
                if(result == undefined){
                    return res.status(400).json(new ApiResponse(400, "Failed to register bed"));
                }
    
                return res.status(200).json(new ApiResponse(200, result));
            }
            else{

                if (adminCheckResult instanceof ApiError) {
                    return res.status(401).json(new ApiResponse(401, "Unauthorized"));
                }
                const isadmin: boolean = adminCheckResult;
                if (!isadmin) {
                    return res.status(401).json(new ApiResponse(401, "Unauthorized"));
                }
            }

            

        } catch (error) {
            console.log("Error in registerBed Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }

    public async getBedById(req: any, res: any) {
        try {
            const id = req.params.id;

            const result = await this.bedService.getBedById(id);

            if(result == undefined){
                return res.status(400).json(new ApiResponse(400, "Failed to get bed"));
            }

            return res.status(200).json(new ApiResponse(200, result));

        } catch (error) {
            console.log("Error in getBedById Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }

    public async updateBed(req: any, res: any) {
        try {
            const bed:Bed = {
                id: req.body.id,
                bedNumber: req.body.bedNumber,
                availability: req.body.availability,
                patientID: req.body.patientId,
                registrationID: req.body.registrationID,
                assignedDate: new Date(req.body.assignedDate),
                hospitalID: req.body.hospitalID,
                status: req.body.status
            };

            const result = await this.bedService.updateBed(bed);

            if(result == undefined){
                return res.status(400).json(new ApiResponse(400, "Failed to update bed"));
            }

            return res.status(200).json(new ApiResponse(200, result));

        } catch (error) {
            console.log("Error in updateBed Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }

    //Remove bed from system (admin only).
    public async removeBed(req: any, res: any) {
        try {
            const id = req.params.id;
            const adminCheckResult = await this.bedService.checkAdmin(req.body.role);
            if (adminCheckResult instanceof ApiError) {
                return res.status(401).json(new ApiResponse(401, "Unauthorized"));
            }
            const isadmin: boolean = adminCheckResult;
            if (!isadmin) {
                return res.status(401).json(new ApiResponse(401, "Unauthorized"));
            }
            const result = await this.bedService.removeBed(id);

            if(result == undefined){
                return res.status(400).json(new ApiResponse(400, "Failed to remove bed"));
            }

            return res.status(200).json(new ApiResponse(200, result));

        } catch (error) {
            console.log("Error in removeBed Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }

    public async getallBeds(req: any, res: any) {
        try {
            const result = await this.bedService.getAllBeds();

            if(result == undefined){
                return res.status(400).json(new ApiResponse(400, "Failed to get beds"));
            }

            return res.status(200).json(new ApiResponse(200, result));

        } catch (error) {
            console.log("Error in getallBeds Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }

    public async getBedsByAvailability(req: any, res: any) {
        try {
            const availability = req.params.availability;

            const result = await this.bedService.getBedsByAvailability(availability);

            if(result == undefined){
                return res.status(400).json(new ApiResponse(400, "Failed to get beds by availability"));
            }

            return res.status(200).json(new ApiResponse(200, result));

        } catch (error) {
            console.log("Error in getBedsByAvailability Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }

    public async getBedsByHospital(req: any, res: any) {
        try {
            const hospitalID = req.params.hospitalID;

            const result = await this.bedService.getBedsByHospital(hospitalID);

            if(result == undefined){
                return res.status(400).json(new ApiResponse(400, "Failed to get beds by hospital"));
            }

            return res.status(200).json(new ApiResponse(200, result));

        } catch (error) {
            console.log("Error in getBedsByHospital Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }

    public async updateBedStatus(req: any, res: any) {
        try {
            const id = req.params.id;
            const status:BedStatus = req.params.status;

            const result = await this.bedService.updateBedStatus(id, status);

            if(result == undefined){
                return res.status(400).json(new ApiResponse(400, "Failed to update bed status"));
            }

            return res.status(200).json(new ApiResponse(200, result));

        } catch (error) {
            console.log("Error in updateBedStatus Controller : ",error);
            return res.status(500).json(new ApiResponse(500, error));
        }
    }
}