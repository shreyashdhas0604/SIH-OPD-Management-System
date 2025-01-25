import { PrismaClient, PaymentStatus } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";
import { sendVirtualOpdEmail } from "../../utils/emailUtil";
import { producer } from "../../ApacheKafkaService/kafkaClient";

const prisma = new PrismaClient();

interface OPDRegistrationInput {
    patientId: number;
    doctorId: number;
    bedId?: number;
    diagnosis?: string;
    prescription?: string;
    symptoms?: string;
    date?: Date;
    departmentId: number;
    hospitalId: number;
    paymentStatus?: PaymentStatus;
    followUp?: boolean;
    followUpDate?: Date;
    followUpReason?: string;
    followUpPrescription?: string;
    followUpDiagnosis?: string;
    patient : any;
    department : any;
    hospital : any;
}

export class OPDRepository {
    public async register(opd: any) {
        try {
            const opdVisit = await prisma.oPDRegistration.create({
                data: {
                    patientID: opd.patientID,
                    doctorID: opd.doctorID,
                    bedID: opd.bedID || null,
                    departmentID: opd.departmentID || null,
                    hospitalID : opd.hospitalID,
                    name: opd.name || null,
                    date: new Date(opd.date).toISOString() || new Date(),
                    paymentStatus: opd.paymentStatus || PaymentStatus.Pending,
                    symptoms: opd.symptoms || null,
                    diagnosis: opd.diagnosis || null,
                    prescription: opd.prescription || null,
                    followUp : opd.followup || false,
                    followUpDate: opd.followUpDate || null,
                    followUpReason: opd.followUpReason || null,
                    followUpPrescription: opd.followUpPrescription || null,
                    followUpDiagnosis: opd.followUpDiagnosis || null,
                    allergies : opd.allergies || null,
                    bloodGroup : opd.bloodGroup || null,
                    weight : opd.weight || 0,
                    OPDTime : opd.OPDTime,
                    isVirtualOPD : opd.isVirtualOPD || false,
                    VirtualOPDDate : opd.VirtualOPDDate || null,
                    VirtualOPDTime : opd.VirtualOPDTime || null,
                    VirtualOPDLink : opd.VirtualOPDLink || null,
                    VirtualOPDRoomName : opd.VirtualOPDRoomName || null,
                },
            });

            await producer.send({
                topic : "OPDRegistered",
                messages : [
                    {
                        value : JSON.stringify({opdID : opdVisit.id,...opdVisit})
                    }
                ]
            })

            return opdVisit;
        } catch (error: any) {
            console.error("Error in registerOPD repository : ", error.message);
            throw new ApiError(500, error.message || "Error registering OPD visit");
        }
    }
    

    public async getOpdVisitById(id: number) {
        try {
            return await prisma.oPDRegistration.findUniqueOrThrow({
                where: { id },
            });
        } catch (error) {
            console.error("Error in getOpdVisitById repository : ", error);
            throw new ApiError(404, `OPD visit with ID ${id} not found`);
        }
    }

    public async updateOpdVisit(id: number, opd: any) {
        try {
            return await prisma.oPDRegistration.update({
                where: { id },
                data: {
                    ...opd,
                    date: opd.date || new Date(),
                },
            });
        } catch (error) {
            console.error("Error in updateOpdVisit repository : ", error);
            throw new ApiError(500, "Error updating OPD visit");
        }
    }

    public async deleteOpdVisit(id: number) {
        try {
            return await prisma.oPDRegistration.delete({
                where: { id },
            });
        } catch (error) {
            console.error("Error in deleteOpdVisit repository : ", error);
            throw new ApiError(404, `OPD visit with ID ${id} not found`);
        }
    }

    public async getAllOpdVisits() {
        try {
            return await prisma.oPDRegistration.findMany();
        } catch (error) {
            console.error("Error in getAllOpdVisits repository : ", error);
            throw new ApiError(500, "Error retrieving all OPD visits");
        }
    }

    public async getPatientOpds(patientId: number) {
        try {
            return await prisma.oPDRegistration.findMany({
                where: { patientID: patientId },
            });
        } catch (error) {
            console.error("Error in getPatientOpds repository : ", error);
            throw new ApiError(500, "Error retrieving OPD visits for the patient");
        }
    }

    public async getDoctorOpds(doctorId: number) {
        try {
            return await prisma.oPDRegistration.findMany({
                where: { doctorID: doctorId },
            });
        } catch (error) {
            console.error("Error in getDoctorOpds repository : ", error);
            throw new ApiError(500, "Error retrieving OPD visits for the doctor");
        }
    }

    public async updatePaymentStatus(id: number, status: PaymentStatus) {
        try {
            return await prisma.oPDRegistration.update({
                where: { id },
                data: { paymentStatus: status },
            });
        } catch (error) {
            console.error("Error in updatePaymentStatus repository : ", error);
            throw new ApiError(500, "Error updating payment status");
        }
    }

    public async getOpdsByDate(from: Date, to: Date) {
        try {
            return await prisma.oPDRegistration.findMany({
                where: {
                    date: {
                        gte: from,
                        lte: to,
                    },
                },
            });
        } catch (error) {
            console.error("Error in getOpdsByDate repository : ", error);
            throw new ApiError(500, "Error retrieving OPD visits by date");
        }
    }

    //pending implementation
    public async registerFollowUp(opd: OPDRegistrationInput) {
        try {
        } catch (error) {
            console.error("Error in registerFollowUp repository : ", error);
            throw new ApiError(500, "Error registering follow-up OPD visit");
        }
    }

    public async getDepartmentOpds(departmentId: number) {
        try {
            return await prisma.oPDRegistration.findMany({
                where: { departmentID: departmentId },
            });
        } catch (error) {
            console.error("Error in getDepartmentOpds repository : ", error);
            throw new ApiError(500, "Error retrieving OPD visits for the department");
        }
    }

    public async getOpdsByPaymentStatus(status: PaymentStatus) {
        try {
            return await prisma.oPDRegistration.findMany({
                where: { paymentStatus: status },
            });
        } catch (error) {
            console.error("Error in getOpdsByPaymentStatus repository : ", error);
            throw new ApiError(500, "Error retrieving OPD visits by payment status");
        }
    }

    public async scheduleMeet(meet: any) {
        try {
            const meetingUrl = `http://localhost:${meet.port}/join-vopd`;
            const virtualMeet = await prisma.oPDRegistration.create({
                data: {
                    patientID: meet.patientID,
                    doctorID: meet.doctorID,
                    bedID: meet.bedID || null,
                    departmentID: meet.departmentID || null,
                    hospitalID : meet.hospitalID,
                    name: meet.name || null,
                    date: new Date(meet.date).toISOString() || new Date(),
                    paymentStatus: meet.paymentStatus || PaymentStatus.Pending,
                    symptoms: meet.symptoms || null,
                    diagnosis: meet.diagnosis || null,
                    prescription: meet.prescription || null,
                    followUp : meet.followup || false,
                    followUpDate: meet.followUpDate || null,
                    followUpReason: meet.followUpReason || null,
                    followUpPrescription: meet.followUpPrescription || null,
                    followUpDiagnosis: meet.followUpDiagnosis || null,
                    allergies : meet.allergies || null,
                    bloodGroup : meet.bloodGroup || null,
                    weight : meet.weight || 0,
                    OPDTime : meet.OPDTime,
                    isVirtualOPD : meet.isVirtualOPD || false,
                    VirtualOPDDate : new Date(meet.date).toISOString() || null,
                    VirtualOPDTime : meet.OPDTime || null,
                    VirtualOPDLink : meetingUrl || null,
                    VirtualOPDRoomName : meet.VirtualOPDRoomName || null,
                },
            });

            const patientDetails = await prisma.oPDRegistration.findUnique({

                where : {
                    id : virtualMeet.id
                },
                include : {
                    patient : true
                }
            });

            const doctorDetails = await prisma.doctor.findUnique({
                where : {
                    id : meet.doctorID
                },
                include : {
                    user : true
                }
            });

            //send email to patient with meeting link
            const patientEmailBody = `Hello ${meet.name},\n\nYour virtual OPD meet with Dr. ${doctorDetails?.user?.username} is scheduled on ${meet.date} at ${meet.OPDTime}. Please click on the link below to join the meeting.\n\n${meetingUrl} and enter the room name as ${meet.VirtualOPDRoomName}`;

            //send email to doctor with meeting link
            const doctorEmailBody = `Hello Dr. ${doctorDetails?.user?.username},\n\nYour virtual OPD meet with patient ${meet.name} is scheduled on ${meet.date} at ${meet.OPDTime}. Please click on the link below to join the meeting.\n\n${meetingUrl} and enter the room name as ${meet.VirtualOPDRoomName}`;

            //send email to patient
            const patientEmail = patientDetails?.patient?.email;
            if (patientEmail) {
                await sendVirtualOpdEmail(patientEmail, patientEmailBody);
            } else {
                console.error("Patient email is undefined");
            }

            //send email to doctor
            const doctorEmail = doctorDetails?.user?.email;
            if (doctorEmail) {
                await sendVirtualOpdEmail(doctorEmail, doctorEmailBody);
            } else {
                console.error("Doctor email is undefined");
            }

            return virtualMeet;
        } catch (error) {
            console.error("Error in scheduleMeet repository : ", error);
            throw new ApiError(500, "Error scheduling virtual OPD meet");
        }
    }
}
