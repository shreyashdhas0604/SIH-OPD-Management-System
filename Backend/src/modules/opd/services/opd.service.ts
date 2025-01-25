import { Bed, PaymentStatus } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";
import {OPDRepository} from "../repositories/opd.repository";

export class OpdService{
    private opdRepository: OPDRepository;

    constructor() { 
        this.opdRepository = new OPDRepository();
    }

    public async registerOpdVisit(opd : any){
        try {
            const opdvisit = this.opdRepository.register(opd);
            if(opdvisit == undefined){
                return undefined;
            }
            return opdvisit;
        } catch (error) {
            console.log("Error in registerOpdVisiit Service : ", error);
            return new ApiError(500,"Error in registering OPD visit");
        }
    }

    public async getOpdVisitById(id: number){
        try {
            const opdvisit = this.opdRepository.getOpdVisitById(id);
            if(opdvisit == undefined){
                return undefined;
            }
            return opdvisit;
        } catch (error) {
            console.log("Error in getOpdVisitById Service : ", error);
            return new ApiError(500,"Error in getting OPD visit");
        }
    }

    public async updateOpdVisit(opd : any){
        try {
            const opdvisit = this.opdRepository.updateOpdVisit(opd.id, opd);
            if(opdvisit == undefined){
                return undefined;
            }
            return opdvisit;
        } catch (error) {
            console.log("Error in updateOpdVisit Service : ", error);
            return new ApiError(500,"Error in updating OPD visit");
        }
    }

    public async deleteOpdVisit(id: number){
        try {
            const opdvisit = this.opdRepository.deleteOpdVisit(id);
            if(opdvisit == undefined){
                return undefined;
            }
            return opdvisit;
        } catch (error) {
            console.log("Error in deleteOpdVisit Service : ", error);
            return new ApiError(500,"Error in deleting OPD visit");
        }
    }

    public async getAllOpdVisits(){
        try {
            const opdvisits = this.opdRepository.getAllOpdVisits();
            if(opdvisits == undefined){
                return undefined;
            }
            return opdvisits;
        } catch (error) {
            console.log("Error in getAllOpdVisits Service : ", error);
            return new ApiError(500,"Error in getting all OPD visits");
        }
    }

    public async getPatientOpds(id: number){
        try {
            const opdvisits = this.opdRepository.getPatientOpds(id);
            if(opdvisits == undefined){
                return undefined;
            }
            return opdvisits;
        } catch (error) {
            console.log("Error in getPatientOpds Service : ", error);
            return new ApiError(500,"Error in getting patient OPDs");
        }
    }

    public async getDoctorOpds(id: number){
        try {
            const opdvisits = this.opdRepository.getDoctorOpds(id);
            if(opdvisits == undefined){
                return undefined;
            }
            return opdvisits;
        } catch (error) {
            console.log("Error in getDoctorOpds Service : ", error);
            return new ApiError(500,"Error in getting doctor OPDs");
        }
    }

    public async updatePaymentStatus(id: number, status: PaymentStatus){
        try {
            const opdvisit = this.opdRepository.updatePaymentStatus(id, status);
            if(opdvisit == undefined){
                return undefined;
            }
            return opdvisit;
        } catch (error) {
            console.log("Error in updatePaymentStatus Service : ", error);
            return new ApiError(500,"Error in updating payment status");
        }
    }

    public async getOpdsByDate(from: Date, to: Date){
        try {
            const opdvisits = this.opdRepository.getOpdsByDate(from, to);
            if(opdvisits == undefined){
                return undefined;
            }
            return opdvisits;
        } catch (error) {
            console.log("Error in getOpdsByDate Service : ", error);
            return new ApiError(500,"Error in getting OPDs by date");
        }
    }

    public async registerFollowUp(opd : any){
        try {
            const opdvisit = this.opdRepository.registerFollowUp(opd);
            if(opdvisit == undefined){
                return undefined;
            }
            return opdvisit;
        } catch (error) {
            console.log("Error in registerFollowUp Service : ", error);
            return new ApiError(500,"Error in registering follow-up");
        }
    }

    public async getDepartmentOpds(departmentId: number){
        try {
            const opdvisits = this.opdRepository.getDepartmentOpds(departmentId);
            if(opdvisits == undefined){
                return undefined;
            }
            return opdvisits;
        } catch (error) {
            console.log("Error in getDepartmentOpds Service : ", error);
            return new ApiError(500,"Error in getting department OPDs");
        }
    }

    public async getOpdsByPaymentStatus(status: PaymentStatus){
        try {
            const opdvisits = this.opdRepository.getOpdsByPaymentStatus(status);
            if(opdvisits == undefined){
                return undefined;
            }
            return opdvisits;
        } catch (error) {
            console.log("Error in getOpdsByPaymentStatus Service : ", error);
            return new ApiError(500,"Error in getting OPDs by payment status");
        }
    }
    
    public async scheduleMeet(meet : any){
        try {

            const uniqueRoomName = `virtual-opd-room-${meet.patientID}-${meet.doctorID}-${meet.date}`;

            meet.VirtualOPDRoomName = uniqueRoomName;

            const result = this.opdRepository.scheduleMeet(meet);
            if(result == undefined){
                return undefined;
            }

            return result;
        } catch (error) {
            console.log("Error in scheduleMeet Service : ", error);
            return new ApiError(500,"Error in scheduling meet");
        }
    }

    public async createRoom(roomName: string): Promise<any> {
        try {
            const apiKey = process.env.DAILY_API_KEY;
            const headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`, // Replace with your Daily.co API key
            };
    
            const response = await fetch("https://api.daily.co/v1/rooms", {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: roomName,
                    properties: {
                        enable_screenshare: true,
                        enable_chat: true,
                        start_video_off: true,
                        start_audio_off: false,
                        lang: "en",
                    },
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Error creating room: ${response.statusText}`);
            }
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error in createRoom Service :", error);
            throw new ApiError(500, "Error in creating a virtual OPD room");
        }
    }
    

      public async getRoom(roomName: string): Promise<any> {
        try {
            const apiKey = process.env.DAILY_API_KEY;
            const headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization : `Bearer ${apiKey}`, // Replace with your Daily.co API key
            };
    
            const response = await fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
                method: "GET",
                headers,
            });
    
            if (!response.ok) {
                if (response.status === 404) {
                    // Room not found, handle gracefully
                    return null;
                }
                throw new Error(`Error getting room: ${response.statusText}`);
            }
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error in getRoom Service :", error);
            throw new ApiError(500, "Error in getting virtual OPD room");
        }
    }
    
    public async VerifyVirtualMeet(roomId: string, userId: number): Promise<any> {
        try {
            const meetingRoom = await this.opdRepository.getPatientOpds(userId);
            if (!meetingRoom) {
                console.log("No meeting rooms found for user:", userId);
                return false;
            }
    
    
            for (const room of meetingRoom) {
                if (room.VirtualOPDRoomName === roomId) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error in VerifyVirtualMeet Service :", error);
            throw new ApiError(500, "Error in verifying virtual OPD meet");
        }
    }
    
}