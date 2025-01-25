import { ApiError } from "../../utils/ApiError";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export class HospitalRepository {

    constructor() {
    }

    public async createHospital(hospital: any): Promise<any> {
        try {
            const newHospital = await prisma.hospital.create(
                {data: hospital}
            );
            return newHospital;
        } catch (error) {
            console.log("Error in createHospital Repository : ",error);
            throw new ApiError(500,`Error while registrating hospital : ${error}`);
        }
    }

    public async getHospitals(query: any): Promise<any> {
        try {
            const hospitals = await prisma.hospital.findMany(query);
            return hospitals;
        } catch (error) {
            console.log("Error in getHospitals Repository : ",error);
            throw new ApiError(500,`Error while fetching hospitals : ${error}`);
        }
    }

    public async getHospitalById(id: number): Promise<any> {
        try {
            const hospital = await prisma.hospital.findUnique({
                where: { id : id }
            });
            if(!hospital) {
                throw new ApiError(404,`Hospital not found`);
            }
            return hospital;
        } catch (error) {
            console.log("Error in getHospitalById Repository : ",error);
            throw new ApiError(500,`Error while fetching hospital : ${error}`);
        }
    }
 
    public async updateHospital(id: number, hospital: any): Promise<any> {
        try {
            const updatedHospital = await prisma.hospital.update({
                where: { id },
                data: hospital
            });
            return updatedHospital;
        } catch (error) {
            console.log("Error in updateHospital Repository : ",error);
            throw new ApiError(500,`Error while updating hospital : ${error}`);
        }
    }

    public async deleteHospital(id: number): Promise<any> {
        try {
            const deletedHospital = await prisma.hospital.delete({
                where: { id }
            });
            return deletedHospital;
        } catch (error) {
            console.log("Error in deleteHospital Repository : ",error);
            throw new ApiError(500,`Error while deleting hospital : ${error}`);
        }
    }

    public async verifyHospital(id: number): Promise<any> {
        try {
            const verifiedHospital = await prisma.hospital.update({
                where: { id },
                data: {isVerified : "approved"}
            });
            return verifiedHospital;
        } catch (error) {
            console.log("Error in verifyHospital Repository : ",error);
            throw new ApiError(500,`Error while verifying hospital : ${error}`);
        }
    }

    //fetching doctors by hospital id and department id
    public async getDoctorsByHospitalandDepartment(hospitalId: number, departmentId: number): Promise<any> {
        try {
            const doctors = await prisma.doctor.findMany({
                where: {
                    hospitalID: hospitalId,
                    departmentId: departmentId
                }
            });
            return doctors;
        } catch (error) {
            console.log("Error in getDoctorsByHospitalandDepartment Repository : ",error);
            throw new ApiError(500,`Error while fetching doctors : ${error}`);
        }
    }

    //fetching all doctors of a hospital from the array of doctors in hospital table
    public async getDoctorsByHospital(hospitalId: number): Promise<any> {
        try {
            const hospital = await prisma.hospital.findUnique({
                where: { id: hospitalId },
                include: {
                    doctors: true
                }
            });
            if(!hospital) {
                throw new ApiError(404,`Hospital not found`);
            }
            return hospital?.doctors;
        } catch (error) {
            console.log("Error in getDoctorsByHospital Repository : ",error);
            throw new ApiError(500,`Error while fetching doctors : ${error}`);
        }
    }

    public async getVerifiedHospitals(): Promise<any> {
        try {
            const hospitals = await prisma.hospital.findMany({
                where: { isVerified: "approved" }
            });
            return hospitals;
        } catch (error) {
            console.log("Error in getVerifiedHospitals Repository : ",error);
            throw new ApiError(500,`Error while fetching verified hospitals : ${error}`);
        }
    }
    
   //fetching the beds array from hospital table
   public async getBedsByHospital(hospitalId: number): Promise<any> {
        try {
            const hospital = await prisma.hospital.findUnique({
                where: { id: hospitalId },
                include: {
                    beds: true
                }
            });
            if(!hospital) {
                throw new ApiError(404,`Hospital not found`);
            }
            return hospital?.beds;
        } catch (error) {
            console.log("Error in getBedsByHospital Repository : ",error);
        throw new ApiError(500,`Error while fetching beds : ${error}`);
        }
    }

    //fetching the departments array from hospital table
    public async getDepartmentsByHospital(hospitalId: number): Promise<any> {
        try {
            const hospital = await prisma.hospital.findUnique({
                where: { id: hospitalId },
                include: {
                    departments: true
                }
            });
            if(!hospital) {
                throw new ApiError(404,`Hospital not found`);
            }
            return hospital?.departments;
        } catch (error) {
            console.log("Error in getDepartmentsByHospital Repository : ",error);
            throw new ApiError(500,`Error while fetching departments : ${error}`);
        }
    }

    //fetching the ratings array from hospital table
    public async getRatingsByHospital(hospitalId: number): Promise<any> {
        try {
            const hospital = await prisma.hospital.findUnique({
                where: { id: hospitalId },
                include: {
                    ratings: true
                }
            });
            if(!hospital) {
                throw new ApiError(404,`Hospital not found`);
            }
            return hospital?.ratings;
        } catch (error) {
            console.log("Error in getRatingsByHospital Repository : ",error);
            throw new ApiError(500,`Error while fetching ratings : ${error}`);
        }
    }

    //adding a rating to a hospital
    public async addRating(hospitalId: number, rating: any): Promise<any> {
        try {
            const newRating = await prisma.rating.create({
                data: {
                    hospitalId,
                    ...rating
                }
            });
            return newRating;
        } catch (error) {
            console.log("Error in addRating Repository : ",error);
            throw new ApiError(500,`Error while adding rating : ${error}`);
        }
    }

    //updating a specific rating of a hospital
    public async updateRating(hospitalId: number, ratingId: number, rating: any): Promise<any> {
        try {
            const updatedRating = await prisma.rating.update({
                where: { id: ratingId },
                data: rating
            });
            if(!updatedRating) {
                throw new ApiError(404,`Rating not found`);
            }
            return updatedRating;
        } catch (error) {
            console.log("Error in updateRating Repository : ",error);
            throw new ApiError(500,`Error while updating rating : ${error}`);
        }
    }

    public async deleteRating(hospitalId: number, ratingId: number): Promise<any> {
        try {
            const deletedRating = await prisma.rating.delete({
                where: { id: ratingId }
            });
            if(!deletedRating) {
                throw new ApiError(404,`Rating not found`);
            }
            return deletedRating;
        } catch (error) {
            console.log("Error in deleteRating Repository : ",error);
            throw new ApiError(500,`Error while deleting rating : ${error}`);
        }
    }

    //fetching available time slots for a hospital
    public async getTimeSlots(hospitalId: number): Promise<any> {
        try {
            const timeslots = await prisma.timeslot.findMany({
                where: {
                    hospitalID: hospitalId,
                    availableCount: { gt: 0 }
                }
            });
            return timeslots;
        } catch (error) {
            console.log("Error in getTimeSlots Repository : ",error);
            throw new ApiError(500,`Error while fetching time slots : ${error}`);
        }
    }

    //adding a time slot for a hospital
    public async addTimeSlot(hospitalId: number, timeSlot: any): Promise<any> {
        try {
            // uniqueIdentifier = date + time + hospitalId
            const { date, time,availableCount,uniqueIdentifier } = timeSlot;
            const slotdate = new Date(date).toISOString();

            const updateOrCreateTimeslot = await prisma.timeslot.upsert({
                where: { uniqueIdentifier : uniqueIdentifier },
                update: {
                    availableCount : availableCount
                },
                create: {
                    hospitalID: hospitalId,
                    date : slotdate,
                    time,
                    availableCount : availableCount,
                    uniqueIdentifier : uniqueIdentifier
                }
            });
            return updateOrCreateTimeslot;
        } catch (error) {
            console.log("Error in addTimeSlot Repository : ",error);
            throw new ApiError(500,`Error while adding time slot : ${error}`);
        }
    }

    //updating a time slot for a hospital
    public async updateTimeSlot(hospitalId: number, timeSlotId: number, timeSlot: any): Promise<any> {
        try {
            // change it to create if not found
            const updatedTimeSlot = await prisma.timeslot.update({
                where: { id: timeSlotId },
                data: timeSlot
            });
            if(!updatedTimeSlot) {
                throw new ApiError(404,`Time slot not found`);
            }
            if (!updatedTimeSlot) {
                const newTimeSlot = await prisma.timeslot.create({
                    data: {
                        hospitalID: hospitalId,
                        ...timeSlot
                    }
                });
                return newTimeSlot;
            }
            return updatedTimeSlot;
        } catch (error) {
            console.log("Error in updateTimeSlot Repository : ",error);
            throw new ApiError(500,`Error while updating time slot : ${error}`);
        }
    }

    //deleting a time slot for a hospital
    public async deleteTimeSlot(hospitalId: number, timeSlotId: number): Promise<any> {
        try {
            const deletedTimeSlot = await prisma.timeslot.delete({
                where: { id: timeSlotId }
            });
            if(!deletedTimeSlot) {
                throw new ApiError(404,`Time slot not found`);
            }
            return deletedTimeSlot;
        } catch (error) {
            console.log("Error in deleteTimeSlot Repository : ",error);
            throw new ApiError(500,`Error while deleting time slot : ${error}`);
        }
    }

    //fetching time slots for a hospital by date
    public async getAvailability(hospitalId: number, date: string): Promise<any> {
        try {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(startDate.getDate() + 1); // Set the end of the day
    
            const availability = await prisma.timeslot.findMany({
                where: {
                    hospitalID: hospitalId,
                    date: {
                        gte: startDate, // Greater than or equal to the start of the day
                        lt: endDate,    // Less than the start of the next day
                    },
                },
            });
            console.log("Date : ",date);
            console.log("Availability in repository : ",availability);
            return availability;
        } catch (error) {
            console.error("Error in getAvailability Repository: ", error);
            throw new ApiError(500, `Error while fetching availability: ${error}`);
        }
    }

    //fetching available time slots for a hospital by date
    public async getAvailableTimeSlots(hospitalID: number, selectedDate: string) {
        // Parse the date into a Date object
        try {
            const date = new Date(selectedDate);
      
        // Fetch the hospital details (to get time slots and totalPersonsPerSlot)
        const hospital = await prisma.hospital.findUnique({
          where: { id: hospitalID },
          select: { timeSlots: true, totalPersonsPerSlot: true },
        });
      
        if (!hospital) {
          throw new Error('Hospital not found');
        }
      
        // Fetch all existing timeslots for the selected date
        const existingTimeslots = await prisma.timeslot.findMany({
          where: {
            hospitalID: hospitalID,
            date: date,
          },
        });

        console.log("Existing timeslots in repository : ",existingTimeslots);
      
        // Create a map of existing timeslots for quick lookup
        const timeslotMap = new Map(
          existingTimeslots.map((slot) => [slot.time, slot.availableCount])
        );

        console.log("timeslot map : ",timeslotMap);
      
        // Combine the hospital's predefined slots with existing availability
        const availableSlots = hospital.timeSlots.map((time) => ({
          time,
          availableCount: timeslotMap.get(time) ?? hospital.totalPersonsPerSlot,
        }));

        console.log("Available slots in repository : ",availableSlots);
      
        return availableSlots;
        } catch (error) {
            console.error("Error in getAvailableTimeSlots Repository: ", error);
            throw new ApiError(500, `Error while fetching time slots`);
            
        }
      }
}