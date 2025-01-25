import { ApiError } from "../../utils/ApiError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AddutilityRepository{
    //Get statistics for all hospitals (e.g., average ratings, number of doctors, bed availability).
    public async getUtilityforHospital(){
        try {
            const utility = await prisma.hospital.findMany({
                select: {
                    name: true,
                    id : true,
                    address: true,
                    registrationNumber: true,
                    contactNumber: true,
                    establishedDate: true,
                    ratings: true,
                    beds: true,
                    doctors: true,
                    departments: true,
                    admin : {
                        select: {
                            username: true,
                            email: true,
                            contactNumber: true
                        }
                    },
                    isVerified: true
                }
            });
            const result = utility.map((hospital) => {
                let totalRating = 0;
                hospital.ratings.forEach((rating) => {
                    totalRating += rating.rating;
                });
                let totalDoctors = hospital.doctors.length;
                let totalBeds = hospital.beds.length;
                return {
                    ...hospital,
                    avgRating: totalRating/hospital.ratings.length,
                    totalDoctors: totalDoctors,
                    totalBeds: totalBeds,
                    
                }
            });
            return result;
        } catch (error) {
            console.log("Error in getUtilityforHospital repository : ",error);
            return new ApiError(500,"Error in getting utility");
        }
    }

    // Get statistics for all doctors (e.g., average ratings, patient count).
    public async getUtilityforDoctor(){
        try {
            const utility = await prisma.doctor.findMany({
                select: {
                    id: true,
                    user : {
                        select: {
                            username: true,
                            email: true,
                            contactNumber: true
                        }
                    },
                    specialization: true,
                    qualification: true,
                    isAvailable: true,
                    department:{
                        select: {
                            name: true
                        }
                    },
                    experience: true,
                    ratings: true,
                    registrations : {
                        select:{
                            patient : {
                                select : {
                                    username: true,
                                }
                            }
                        }
                    },
                    hospital: {
                        select: {
                            name: true,
                            address: true,
                            contactNumber: true,
                            admin: {
                                select: {
                                    username: true,
                                    email: true,
                                    contactNumber: true
                                }
                            }
                        }
                    }
                }
            });
            const result = utility.map((doctor) => {
                let totalRating = 0;
                doctor.ratings.forEach((rating) => {
                    totalRating += rating.rating;
                });
                let totalPatients = doctor.registrations.length;
                return {
                    ...doctor,
                    avgRating: totalRating/doctor.ratings.length,
                    totalPatients: totalPatients
                }
            });
            return result;
        } catch (error) {
            console.log("Error in getUtilityforDoctor repository : ",error);
            return new ApiError(500,"Error in getting utility");
        }
    }

    // Perform a global search across doctors, hospitals, departments, and beds based on query parameters.
    public async search(query: any){
        try {
            const utility = await prisma.$queryRaw`SELECT * FROM hospital WHERE name LIKE ${query.name}`;
            return utility;
        } catch (error) {
            console.log("Error in search repository : ",error);
            return new ApiError(500,"Error in getting utility");
        }
    }

}
