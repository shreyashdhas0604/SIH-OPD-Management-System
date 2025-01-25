import { parse } from "path";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { DoctorRepository } from "../repositories/doctor.repository";


interface Doctor {
    userID: number;
    specialization: string;
    qualification: string;
    experience: number;
    hospitalID: number;
    departmentId: number;
    isAvailable: boolean;
    hospital: any;
    department: any;
    registrations: any;
    ratings: any;

}

export class DoctorService{
    private doctorRepository: DoctorRepository;

    constructor() {
        this.doctorRepository = new DoctorRepository();
    }

    public async createDoctor(reqDoctor: any) {
        try {
            const {userID, specialization, qualification, experience, hospitalID, departmentId} = reqDoctor;
            if (!userID || !specialization || !qualification || !experience || !hospitalID || !departmentId ) {
                return new ApiError(400, 'Please provide all the details');
            }
            reqDoctor.hospitalID = parseInt(hospitalID);
            reqDoctor.departmentId = parseInt(departmentId);
            reqDoctor.experience = parseInt(experience);
            const doctor = await this.doctorRepository.createDoctor(reqDoctor);

            return new ApiResponse(201, 'Doctor registered successfully', JSON.stringify(doctor));
        } catch (error) {
            console.log('Error in createDoctor Service : ', error);
            return new ApiError(500,'Error while registrating doctor');
        }
    }

    public async getDoctorsByDepartment(departmentId: number) {
        try {
            const doctors = await this.doctorRepository.getDoctorsByDepartment(departmentId);
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsByDepartment Service: ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctorsByHospital(hospitalId: number) {
        try {
            const doctors = await this.doctorRepository.getDoctorsByHospital(hospitalId);
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsByHospital Service : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctorsByAvailability(availability: boolean) {
        try {
            const doctors = await this.doctorRepository.getDoctorsByAvailability(availability);
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsByAvailability Service : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctor(id: number) {
        try {
            const doctor = await this.doctorRepository.getDoctor(id);
            if(!doctor) {
                return new ApiError(404, 'No doctor found');
            }
            return doctor;
        } catch (error) {
            console.log('Error in getDoctor Service : ', error);
            return new ApiError(500,'Error while fetching doctor');
        }
    }

    public async updateDoctor(id: number, reqDoctor: Doctor) {
        try {
            const doctor = await this.doctorRepository.updateDoctor(id, reqDoctor);
            if(!doctor) {
                return new ApiError(404, 'No doctor found');
            }
            return doctor;
        } catch (error) {
            console.log('Error in updateDoctor Service : ', error);
            return new ApiError(500,'Error while updating doctor');
        }
    }

    public async deleteDoctor(id: number) {
        try {
            const doctor = await this.doctorRepository.deleteDoctor(id);
            if(!doctor) {
                return new ApiError(404, 'No doctor found');
            }
            return doctor;
        } catch (error) {
            console.log('Error in deleteDoctor Service : ', error);
            return new ApiError(500,'Error while deleting doctor');
        }
    }

    public async getRatings(id: number) {
        try {
            const ratings = await this.doctorRepository.getRatings(id);
            if(!ratings) {
                return new ApiError(404, 'No ratings found');
            }
            return ratings;
        } catch (error) {
            console.log('Error in getRatings Service : ', error);
            return new ApiError(500,'Error while fetching ratings');
        }
    }

    public async addRating(id: number, reqRating: any) {
        try {
            const rating = await this.doctorRepository.addRating(id, reqRating);
            if(!rating) {
                return new ApiError(404, 'No rating found');
            }
            return rating;
        } catch (error) {
            console.log('Error in addRating Service : ', error);
            return new ApiError(500,'Error while adding rating');
        }
    }

    public async updateRating(id: number, reqRating: any) {
        try {
            const rating = await this.doctorRepository.updateRating(id, reqRating);
            if(!rating) {
                return new ApiError(404, 'No rating found');
            }
            return rating;
        } catch (error) {
            console.log('Error in updateRating Service : ', error);
            return new ApiError(500,'Error while updating rating');
        }
    }

    public async deleteRating(id: number, userId: number) {
        try {
            const rating = await this.doctorRepository.deleteRating(id,userId);
            if(!rating) {
                return new ApiError(404, 'No rating found');
            }
            return rating;
        } catch (error) {
            console.log('Error in deleteRating Service : ', error);
            return new ApiError(500,'Error while deleting rating');
        }
    }

    public async getAllDoctors() {
        try {
            const doctors = await this.doctorRepository.getAllDoctors();
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getAllDoctors Service : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctorsBySpeciality(speciality: string) {
        try {
            const doctors = await this.doctorRepository.getDoctorsBySpeciality(speciality);
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsBySpeciality Service : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getOPDRegistrations(doctorId: number) {
        try {
            const registrations = await this.doctorRepository.getOPDRegistrations(doctorId);
            if(!registrations) {
                return new ApiError(404, 'No registrations found');
            }
            return registrations;
        } catch (error) {
            console.log('Error in getOPDRegistrations Service : ', error);
            return new ApiError(500,'Error while fetching registrations');
        }
    }
}