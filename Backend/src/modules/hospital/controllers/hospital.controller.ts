import { HospitalService } from "../services/hospital.service";
import { HospitalRepository } from "../repositories/hospital.repository";
import cloudinaryService from "../../utils/cloudinaryService";
import { time } from "console";

interface Hospital {
    name: string;
    speciality: string;
    address: string;
    registrationNumber: string;
    contactNumber: string;
    timings: string;
    totalBeds: number;
    totalPersonsPerSlot: number;
    timeslots : string[];
    hospitalImageUrl: string[];
    establishedDate : Date;
    rating: number;
    isVerified : string;
    adminID: string;
}


export class HospitalController {
    private hospitalService: HospitalService;
    private hospitalRepository: HospitalRepository;

    constructor() {
        this.hospitalService = new HospitalService();
        this.hospitalRepository = new HospitalRepository();
    }
   
    public async createHospital(req: any, res: any) {
        try {
            const { name, address, registrationNumber, contactNumber, adminID } = req.body;
            const reqHospitalData = {
                name: req.body.name,
                speciality: req.body.speciality,
                address: req.body.address,
                registrationNumber: req.body.registrationNumber,
                contactNumber: req.body.contactNumber,
                timings: req.body.timings,
                totalBeds: parseInt(req.body.totalBeds),
                totalPersonsPerSlot: parseInt(req.body.totalPersonsPerSlot),
                timeslots: req.body.timeslots,
                hospitalImageUrl: req.body.hospitalImageUrl,
                establishedDate: req.body.establishedDate,
                rating:parseFloat( req.body.rating),
                isVerified: req.body.isVerified,
                adminID: parseInt(req.body.adminID),
                timeSlots: JSON.parse(req.body.opdTimeslots),
            }
    
            // Validation for required fields
            if (!name || !address || !registrationNumber || !contactNumber || !adminID) {
                return res.status(400).json({
                    message: 'Please provide all the details (name, address, registrationNumber, contactNumber, adminID)',
                });
            }
            // Handle image upload
            const imageFiles = req.files; // Assuming images are sent as an array in `req.files`
            const uploadedImageUrls: string[] = [];
    
            if (imageFiles && imageFiles.length > 0) {
                for (const file of imageFiles) {
                    try {
                        // Upload each image to Cloudinary
                        const uploadResult = await cloudinaryService.uploadImage(file.buffer, `${name}-${Date.now()}`);
                        const result = uploadResult as { secure_url: string };
                        uploadedImageUrls.push(result.secure_url);

                    } catch (uploadError) {
                        console.error(`Error uploading image: ${uploadError}`);
                        return res.status(500).json({
                            message: 'Error while uploading images',
                            error: uploadError  ,
                        });
                    }
                }
            }
            reqHospitalData.hospitalImageUrl = uploadedImageUrls; // Assign uploaded image URLs to the hospital data
            reqHospitalData.establishedDate = new Date(req.body.establishedDate);
    
            // Creating hospital
            const hospital = await this.hospitalRepository.createHospital(reqHospitalData);
            return res.status(201).json({
                message: 'Hospital registered successfully. It will be visible once verified.',
                hospital,
            });

        } catch (error) {
            console.error(error); // Optional: for debugging
            return res.status(500).json({
                message: 'Error while registering hospital',
                error: error,
            });
        }
    }

    public async getHospitals(req: any, res: any) {
        try {
            const hospitals = await this.hospitalService.getHospitals(req.query);
            return res.status(200).json(hospitals);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    } 

    public async getHospital(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const hospital = await this.hospitalRepository.getHospitalById(id);
            return res.status(200).json(hospital);
        } catch (error) {
            console.log("Error in getHospital Controller : ",error);
            return res.status(500).json({ error: error});
        }
    }
 
    public async updateHospital(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const hospital = await this.hospitalService.updateHospital(id, req.body);
            return res.status(200).json(hospital);
        } catch (error) {
            console.log("Error in updateHospital Controller : ",error); 
            return res.status(500).json({ error: error});
        }
    }

    public async deleteHospital(req: any, res: any) {
        try {
            const hospital = await this.hospitalService.deleteHospital(req.params.id);
            return res.status(200).json(hospital);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async verifyHospital(req: any, res: any) {
        try {
            const hospital = await this.hospitalService.verifyHospital(req.params.id);
            return res.status(200).json(hospital);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getDoctorsByHospitalandDepartment(req: any, res: any) {
        try {
            const doctors = await this.hospitalService.getDoctorsByHospitalandDepartment(req.params.hospitalId, req.params.departmentId);
            return res.status(200).json(doctors);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getDoctorsByHospital(req: any, res: any) {
        try {
            const doctors = await this.hospitalService.getDoctorsByHospital(req.params.hospitalId);
            return res.status(200).json(doctors);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getVerifiedHospitals(req: any, res: any) {
        try {
            const hospitals = await this.hospitalService.getVerifiedHospitals();
            return res.status(200).json(hospitals);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getBedsByHospital(req: any, res: any) {
        try {
            const beds = await this.hospitalService.getBedsByHospital(req.params.hospitalId);
            return res.status(200).json(beds);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getDepartmentsByHospital(req: any, res: any) {
        try {
            const departments = await this.hospitalService.getDepartmentsByHospital(parseInt(req.params.hospitalId));
            return res.status(200).json(departments);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getRatingsByHospital(req: any, res: any) {
        try {
            const ratings = await this.hospitalService.getRatingsByHospital(req.params.hospitalId);
            return res.status(200).json(ratings);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async addRating(req: any, res: any) {
        try {
            const rating = await this.hospitalService.addRating(req.params.hospitalId, req.body);
            return res.status(200).json(rating);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    } 

    public async updateRating(req: any, res: any) {
        try {
            const rating = await this.hospitalService.updateRating(req.params.hospitalId, req.params.ratingId, req.body);
            return res.status(200).json(rating);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async deleteRating(req: any, res: any) {
        try {
            const rating = await this.hospitalService.deleteRating(req.params.hospitalId, req.params.ratingId);
            return res.status(200).json(rating);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getTimeSlots(req: any, res: any) {
        try {
            const id = parseInt(req.params.hospitalId);
            const timeslots = await this.hospitalService.getTimeSlots(id);
            return res.status(200).json(timeslots);
        } catch (error) {
            console.log("Error in getTimeSlots Controller : ",error);
            return res.status(500).json({ error: error});
        }
    }

    public async addTimeSlot(req: any, res: any) {
        try {
            const timeslot = await this.hospitalService.addTimeSlot(parseInt(req.params.hospitalId), req.body);
            return res.status(200).json(timeslot);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async updateTimeSlot(req: any, res: any) {
        try {
            const timeslot = await this.hospitalService.updateTimeSlot(req.params.hospitalId, req.params.timeslotId, req.body);
            return res.status(200).json(timeslot);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async deleteTimeSlot(req: any, res: any) {
        try {
            const timeslot = await this.hospitalService.deleteTimeSlot(req.params.hospitalId, req.params.timeslotId);
            return res.status(200).json(timeslot);
        } catch (error) {
            return res.status(500).json({ error: error});
        }
    }

    public async getAvailability(req: any, res: any) {
        try {
            const hospitalId = parseInt(req.params.hospitalId, 10); // Convert hospitalId to an integer
            const date = req.params.date;
    
            if (!date) {
                return res.status(400).json({ error: "Date is required" });
            }
    
            const availability = await this.hospitalService.getAvailability(hospitalId, date);
            return res.status(200).json({ availability });
        } catch (error) {
            console.error("Error in getAvailability Controller: ", error);
            return res.status(500).json({ error: error || "Internal Server Error" });
        }
    }
    
    public async getAvailableTimeSlots(req: any, res: any) {
        try {
            const hospitalId = parseInt(req.params.hospitalId, 10); // Convert hospitalId to an integer
            const date = req.params.date;
    
            if (!date) {
                return res.status(400).json({ error: "Date is required" });
            }
    
            const availableTimeSlots = await this.hospitalService.getAvailableTimeSlots(hospitalId, date);
            return res.status(200).json({ availableTimeSlots });
        } catch (error) {
            console.error("Error in getAvailableTimeSlots Controller: ", error);
            return res.status(500).json({ error: error || "Internal Server Error" });
        }
    }
}
