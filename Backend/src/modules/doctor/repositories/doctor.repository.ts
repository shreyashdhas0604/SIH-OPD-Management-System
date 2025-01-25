import { PrismaClient } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";

const prisma = new PrismaClient();

export class DoctorRepository {
    

    public async createDoctor(reqDoctor: any) {
        try {
            const doctor = await prisma.doctor.create({
                data: reqDoctor
            });
            if (!doctor) {
                return new ApiError(400, 'Please provide all the details');
            }
            console.log('Doctor created : ', doctor);
            return doctor;
        } catch (error) {
            console.log('Error in createDoctor Repository : ', error);
            return new ApiError(500,'Error while registrating doctor');
        }
    }

    public async getDoctorsByDepartment(departmentId: number) {
        try {
            const doctors = await prisma.doctor.findMany({
                where: {
                    departmentId: departmentId
                }
            });
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsByDepartment Repository : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctorsByHospital(hospitalId: number) {
        try {
            const doctors = await prisma.doctor.findMany({
                where: {
                    hospitalID: hospitalId
                }
            });
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsByHospital Repository : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctorsByAvailability(availability: boolean) {
        try {
            const doctors = await prisma.doctor.findMany({
                where: {
                    isAvailable: availability
                }
            });
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsByAvailability Repository : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctor(id: number) {
        try {
            const doctor = await prisma.doctor.findUnique({
                where: {
                    id:id
                },
                include : {
                    user: true,
                    department: true,
                    hospital: true,
                    ratings: true,
                    registrations: true,
                }
            });
            if(!doctor) {
                return new ApiError(404, 'No doctor found');
            }
            return doctor;
        } catch (error) {
            console.log('Error in getDoctor Repository : ', error);
            return new ApiError(500,'Error while fetching doctor');
        }
    }

    public async updateDoctor(id: number, reqDoctor: any) {
        try {
            const doctor = await prisma.doctor.update({
                where: {
                    userID:id
                },
                data: reqDoctor
            });
            if(!doctor) {
                return new ApiError(404, 'No doctor found');
            }
            return doctor;
        } catch (error) {
            console.log('Error in updateDoctor Repository : ', error);
            return new ApiError(500,'Error while updating doctor');
        }
    }

    public async deleteDoctor(id: number) {
        try {
            const doctor = await prisma.doctor.delete({
                where: {
                    userID:id
                }
            });
            if(!doctor) {
                return new ApiError(404, 'No doctor found');
            }
            return doctor;
        } catch (error) {
            console.log('Error in deleteDoctor Repository : ', error);
            return new ApiError(500,'Error while deleting doctor');
        }
    }

   //fetch all ratings for a specific doctor from ratings array in doctor table
    public async getRatings(id: number) {
        try {
            const ratings = await prisma.doctor.findUnique({
                where: {
                    userID:id
                },
                select: {
                    ratings: true
                }
            });
            if(!ratings) {
                return new ApiError(404, 'No ratings found');
            }
            return ratings;
        } catch (error) {
            console.log('Error in getRatings Repository : ', error);
            return new ApiError(500,'Error while fetching ratings');
        }
    }

    public async addRating(id: number, reqRating: any) {
        try {
            const newRating = await prisma.rating.create({
                data: {
                    ...reqRating,
                    doctorId: id
                }
            });
            if(!newRating) {
                return new ApiError(400, 'Please provide all the details');
            }
            return newRating;
        } catch (error) {
            console.log('Error in addRating Repository : ', error);
            return new ApiError(500,'Error while adding rating');
        }
    }

    public async updateRating(id: number, reqRating: any) {
        try {
            const rating = await prisma.rating.update({
                where: {
                    id: id
                },
                data: reqRating
            });
            if(!rating) {
                return new ApiError(404, 'No rating found');
            }
            return rating;
        } catch (error) {
            console.log('Error in updateRating Repository : ', error);
            return new ApiError(500,'Error while updating rating');
        }
    }

    public async deleteRating(id: number,userId: number) {
        try {
            const rating = await prisma.rating.delete({
                where: {
                    id: id
                }
            });
            if(!rating) {
                return new ApiError(404, 'No rating found');
            }
            return rating;
        } catch (error) {
            console.log('Error in deleteRating Repository : ', error);
            return new ApiError(500,'Error while deleting rating');
        }
    }

    public async getAllDoctors() {
        try {
            const doctors = await prisma.doctor.findMany({
                include: {
                    user: true,
                    department: true,
                }
            });
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getAllDoctors Repository : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getDoctorsBySpeciality(speciality: string) {
        try {
            const doctors = await prisma.doctor.findMany({
                where: {
                    specialization: speciality
                }
            });
            if(!doctors) {
                return new ApiError(404, 'No doctors found');
            }
            return doctors;
        } catch (error) {
            console.log('Error in getDoctorsBySpeciality Repository : ', error);
            return new ApiError(500,'Error while fetching doctors');
        }
    }

    public async getOPDRegistrations(doctorId: number) {
        //fetch all registrations for a specific doctor from registrations array in doctor table
        try {
            const registrations = await prisma.doctor.findUnique({
                where: {
                    userID:doctorId
                },
                select: {
                    registrations: true
                }
            });
            if(!registrations) {
                return new ApiError(404, 'No registrations found');
            }
            return registrations;

        } catch (error) {
            console.log('Error in getOPDRegistrations Repository : ', error);
            return new ApiError(500,'Error while fetching registrations');
        }
    }
}