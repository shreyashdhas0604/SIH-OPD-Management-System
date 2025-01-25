import { parse } from "path";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { DoctorService } from "../services/doctor.service";

export class DoctorController {
    private doctorService: DoctorService;

    constructor() {
        this.doctorService = new DoctorService();
    }

    public async createDoctor(req: any, res: any) {
        try {
            const reqDoctor = req.body;
            const doctor = await this.doctorService.createDoctor(reqDoctor);
            return res.status(201).json(doctor);
        } catch (error) {
            console.log('Error in createDocter controller : ', error);
            return new ApiError(500,'Error while registrating doctor');
        }
    }

    public async getDoctorsByDepartment(req: any, res: any) {
        try {
            const doctors = await this.doctorService.getDoctorsByDepartment(req.params.departmentId);
            return res.status(200).json(doctors);
        } catch (error) {
            console.log('Error in getDoctorsByDepartment controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async getDoctorsByHospital(req: any, res: any) {
        try {
            const doctors = await this.doctorService.getDoctorsByHospital(req.params.hospitalId);
            return res.status(200).json(doctors);
        } catch (error) {
            console.log('Error in getDoctorsByHospital controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async getDoctorsByAvailability(req: any, res: any) {
        try {
            const doctors = await this.doctorService.getDoctorsByAvailability(req.params.availability);
            return res.status(200).json(doctors);
        } catch (error) {
            console.log('Error in getDoctorsByAvailability controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async getDoctor(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const doctor = await this.doctorService.getDoctor(id);
            return res.status(200).json(doctor);
        } catch (error) {
            console.log('Error in getDocter controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async updateDoctor(req: any, res: any) {
        try {
            const doctor = await this.doctorService.updateDoctor(req.params.id, req.body);
            return res.status(200).json(doctor);
        } catch (error) {
            console.log('Error in updateDocter controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async deleteDoctor(req: any, res: any) {
        try {
            const doctor = await this.doctorService.deleteDoctor(req.params.id);
            return res.status(200).json(doctor);
        } catch (error) {
            console.log('Error in deleteDocter controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async getRatings(req: any, res: any) {
        try {
            const ratings = await this.doctorService.getRatings(req.params.id);
            return res.status(200).json(ratings);
        } catch (error) {
            console.log('Error in getRatings controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async addRating(req: any, res: any) {
        try {
            const rating = await this.doctorService.addRating(req.params.id, req.body);
            return res.status(200).json(rating);
        } catch (error) {
            console.log('Error in addRating controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async updateRating(req: any, res: any) {
        try {
            const rating = await this.doctorService.updateRating(req.params.id, req.body);
            return res.status(200).json(rating);
        } catch (error) {
            console.log('Error in updateRating controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async deleteRating(req: any, res: any) {
        try {
            const rating = await this.doctorService.deleteRating(req.params.id,req.user?.id);
            if(!rating) {
                return new ApiError(404, 'No rating found');
            }
            return res.status(200).json(rating);
        } catch (error) {
            console.log('Error in deleteRating controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async getAllDoctors(req: any, res: any) {
        try {
            const doctors = await this.doctorService.getAllDoctors();
            return res.status(200).json(doctors);
        } catch (error) {
            console.log('Error in getAllDoctors controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async getDoctorsBySpeciality(req: any, res: any) {
        try {
            const doctors = await this.doctorService.getDoctorsBySpeciality(req.params.speciality);
            return res.status(200).json(doctors);
        } catch (error) {
            console.log('Error in getDoctorsBySpeciality controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

    public async getOPDRegistrations(req: any, res: any) {
        try {
            const opdRegistrations = await this.doctorService.getOPDRegistrations(req.params.doctorId);
            return res.status(200).json(opdRegistrations);
        } catch (error) {
            console.log('Error in getOPDRegistrations controller : ', error);
            return res.status(500).json({ error: error});
        }
    }

}