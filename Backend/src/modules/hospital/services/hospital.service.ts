import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { HospitalRepository } from "../repositories/hospital.repository";

export class HospitalService{
    private hospitalRepository: HospitalRepository;
    constructor() {
        this.hospitalRepository = new HospitalRepository();
    }
    
    public async getHospitals(query: any) {
        try {
            const hospitals = await this.hospitalRepository.getHospitals(query);
            return new ApiResponse(200, 'Hospitals fetched successfully', hospitals);
        } catch (error) {
            console.log("Error in getHospitals Service : ",error);
            return new ApiError(500, 'Error while fetching hospitals');
        }
    } 

    public async updateHospital(id: number, hospital: any) {
        try {
            const updatedHospital = await this.hospitalRepository.updateHospital(id, hospital);
            return new ApiResponse(200, 'Hospital updated successfully', updatedHospital);
        } catch (error) {
            console.log("Error in updateHospital Service : ",error);
            return new ApiError(500, 'Error while updating hospital');
        }
    }

    public async deleteHospital(id: number) {
        try {
            const deletedHospital = await this.hospitalRepository.deleteHospital(id);
            return new ApiResponse(200, 'Hospital deleted successfully', deletedHospital);
        } catch (error) {
            console.log("Error in deleteHospital Service : ",error);
            return new ApiError(500, 'Error while deleting hospital');
        }
    }

    public async verifyHospital(id: number) {
        try {
            const verifiedHospital = await this.hospitalRepository.verifyHospital(id);
            return new ApiResponse(200, 'Hospital verified successfully', verifiedHospital);
        } catch (error) {
            console.log("Error in verifyHospital Service : ",error);
            return new ApiError(500, 'Error while verifying hospital');
        }
    }

    public async getDoctorsByHospitalandDepartment(hospitalId: number, departmentId: number) {
        try {
            // get doctors by hospital id and department id
            const doctors = await this.hospitalRepository.getDoctorsByHospitalandDepartment(hospitalId, departmentId);
            return new ApiResponse(200, 'Doctors fetched successfully', doctors);
        } catch (error) {
            console.log("Error in getDoctorsByHospitalandDepartment Service : ",error);
            return new ApiError(500, 'Error while fetching doctors');
        }
    }

    public async getDoctorsByHospital(hospitalId: number) {
        try {
            // get all doctors of a hospital
            const doctors = await this.hospitalRepository.getDoctorsByHospital(hospitalId);
            return new ApiResponse(200, 'Doctors fetched successfully', doctors);
        } catch (error) {
            console.log("Error in getDoctorsByHospital Service : ",error);
            return new ApiError(500, 'Error while fetching doctors');
        }
    }

    public async getVerifiedHospitals() {
        try {
            const hospitals = await this.hospitalRepository.getVerifiedHospitals();
            return new ApiResponse(200, 'Verified hospitals fetched successfully', hospitals);
        } catch (error) {
            console.log("Error in getVerifiedHospitals Service : ",error);
            return new ApiError(500, 'Error while fetching verified hospitals');
        }
    }

    public async getBedsByHospital(hospitalId: number) {
        try {
            const beds = await this.hospitalRepository.getBedsByHospital(hospitalId);
            return new ApiResponse(200, 'Beds fetched successfully', beds);
        } catch (error) {
            console.log("Error in getBedsByHospital Service : ",error);
            return new ApiError(500, 'Error while fetching beds');
        }
    }

    public async getDepartmentsByHospital(hospitalId: number) {
        try {
            const departments = await this.hospitalRepository.getDepartmentsByHospital(hospitalId);
            return new ApiResponse(200, 'Departments fetched successfully', departments);
        } catch (error) {
            console.log("Error in getDepartmentsByHospital Service : ",error);
            return new ApiError(500, 'Error while fetching departments');
        }
    }

    public async getRatingsByHospital(hospitalId: number) {
        try {
            const ratings = await this.hospitalRepository.getRatingsByHospital(hospitalId);
            return new ApiResponse(200, 'Ratings fetched successfully', ratings);
        } catch (error) {
            console.log("Error in getRatingsByHospital Service : ",error);
            return new ApiError(500, 'Error while fetching ratings');
        }
    }

    public async addRating(hospitalId: number, rating: any) {
        try {
            const newRating = await this.hospitalRepository.addRating(hospitalId, rating);
            return new ApiResponse(200, 'Rating added successfully', newRating);
        } catch (error) {
            console.log("Error in addRating Service : ",error);
            return new ApiError(500, 'Error while adding rating');
        }
    }

    public async updateRating(hospitalId: number, ratingId: number, rating: any) {
        try {
            const updatedRating = await this.hospitalRepository.updateRating(hospitalId, ratingId, rating);
            return new ApiResponse(200, 'Rating updated successfully', updatedRating);
        } catch (error) {
            console.log("Error in updateRating Service : ",error);
            return new ApiError(500, 'Error while updating rating');
        }
    }

    public async deleteRating(hospitalId: number, ratingId: number) {
        try {
            const deletedRating = await this.hospitalRepository.deleteRating(hospitalId, ratingId);
            return new ApiResponse(200, 'Rating deleted successfully', deletedRating);
        } catch (error) {
            console.log("Error in deleteRating Service : ",error);
            return new ApiError(500, 'Error while deleting rating');
        }
    }

    public async getTimeSlots(hospitalId: number) {
        try {
            // get available time slots for a hospital
            const timeSlots = await this.hospitalRepository.getTimeSlots(hospitalId);
            return new ApiResponse(200, 'Time slots fetched successfully', timeSlots);
        } catch (error) {
            console.log("Error in getTimeSlots Service : ",error);
            return new ApiError(500, 'Error while fetching time slots');
        }
    }

    public async addTimeSlot(hospitalId: number, timeSlot: any) {
        try {
            // add a time slot for a hospital
            const newTimeSlot = await this.hospitalRepository.addTimeSlot(hospitalId, timeSlot);
            return new ApiResponse(200, 'Time slot added successfully', newTimeSlot);
        } catch (error) {
            console.log("Error in addTimeSlot Service : ",error);
            return new ApiError(500, 'Error while adding time slot');
        }
    }

    public async updateTimeSlot(hospitalId: number, timeSlotId: number, timeSlot: any) {
        try {
            // update a time slot for a hospital
            const updatedTimeSlot = await this.hospitalRepository.updateTimeSlot(hospitalId, timeSlotId, timeSlot);
            return new ApiResponse(200, 'Time slot updated successfully', updatedTimeSlot);
        } catch (error) {
            console.log("Error in updateTimeSlot Service : ",error);
            return new ApiError(500, 'Error while updating time slot');
        }
    }

    public async deleteTimeSlot(hospitalId: number, timeSlotId: number) {
        try {
            // delete a time slot for a hospital
            const deletedTimeSlot = await this.hospitalRepository.deleteTimeSlot(hospitalId, timeSlotId);
            return new ApiResponse(200, 'Time slot deleted successfully', deletedTimeSlot);
        } catch (error) {
            console.log("Error in deleteTimeSlot Service : ",error);
            return new ApiError(500, 'Error while deleting time slot');
        }
    }

    public async getAvailability(hospitalId: number, date: string) {
        try {
            // get slot availability for a hospital by date
            const availability = await this.hospitalRepository.getAvailability(hospitalId, date);
            return new ApiResponse(200, 'Availability fetched successfully', availability);
        } catch (error) {
            console.log("Error in getAvailability Service : ",error);
            return new ApiError(500, 'Error while fetching availability');
        }
    }

    public async getAvailableTimeSlots(hospitalId: number, date: string) {
        try {
            // get available time slots for a hospital by date
            const timeSlots = await this.hospitalRepository.getAvailableTimeSlots(hospitalId, date);
            return new ApiResponse(200, timeSlots,'Time slots fetched successfully');
        } catch (error) {
            console.log("Error in getAvailableTimeSlots Service : ",error);
            return new ApiError(500, 'Error while fetching time slots');
        }
    }
}

