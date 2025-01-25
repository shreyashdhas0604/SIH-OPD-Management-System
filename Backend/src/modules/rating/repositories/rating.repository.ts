import e from "express";
import { ApiError } from "../../utils/ApiError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RatingRepository{
        
        public async registerRatingforHospital(ratingparam: any){
            try {
                const rating = await prisma.rating.create({
                    data:{
                        userID: ratingparam.userID,
                        hospitalID: ratingparam.hospitalID,
                        rating: ratingparam.rating
                    }
                });
                return rating;
            } catch (error) {
                console.log("Error in registerRatingforhospital repo : ",error)
                return new ApiError(500,"Error in registering rating");
            }
        }

        public async registerRatingforDoctor(ratingparam: any){
            try {
                const rating = await prisma.rating.create({
                    data:{
                        userID: ratingparam.userID,
                        doctorID: ratingparam.doctorID,
                        rating: ratingparam.rating,
                        hospitalID : null
                    }
                });
                return rating;
            } catch (error) {
                console.log("Error in registerRatingfordoctor repo : ",error)
                return new ApiError(500,"Error in registering rating");
            }
        }
    
        public async getRatingByHospitalID(hospitalID: number){
            try {
                const rating = await prisma.rating.findMany({
                    where:{
                        hospitalID: hospitalID
                    }
                });
                return rating;
            } catch (error) {
                console.log("Error in getRatingByHospitalID repo : ",error)
                return new ApiError(500,"Error in getting rating");
            }
        }

        public async getRatingByDoctorID(doctorID: number){
            try {
                const rating = await prisma.rating.findMany({
                    where:{
                        doctorID: doctorID
                    }
                });
                return rating;
            } catch (error) {
                console.log("Error in getRatingByDoctorID repo : ",error)
                return new ApiError(500,"Error in getting rating");
            }
        }

        public async getRatingByID(ratingID: number){
            try {
                const rating = await prisma.rating.findUnique({
                    where:{
                        id: ratingID
                    }
                });
                return rating;
            } catch (error) {
                console.log("Error in getRatingByID repo : ",error)
                return new ApiError(500,"Error in getting rating");
            }
        }
    
        public async getRatingByUserID(userID: number){
            try {
                const rating = await prisma.rating.findMany({
                    where:{
                        userID: userID
                    }
                });
                return rating;
            } catch (error) {
                console.log("Error in getRatingByUserID repo : ",error)
                return new ApiError(500,"Error in getting rating");
            }
        }
    
        public async updateRating(ratingID: number, ratingparam: any){
            try {
                if(ratingparam.hospitalID){
                const rating = await prisma.rating.update({
                    where:{
                        id: ratingID
                    },
                    data:{
                        userID: ratingparam.userID,
                        hospitalID: ratingparam.hospitalID,
                        rating: ratingparam.rating
                    }
                });
                return rating;
            }
            else if(ratingparam.doctorID){
                const rating = await prisma.rating.update({
                    where:{
                        id: ratingID
                    },
                    data:{
                        userID: ratingparam.userID,
                        doctorID: ratingparam.doctorID,
                        rating: ratingparam.rating
                    }
                });
                return rating;
            }
            } catch (error) {
                console.log("Error in updateRating repo : ",error)
                return new ApiError(500,"Error in updating rating");
            }
        }
    
        public async deleteRating(ratingID: number){
            try {
                const rating = await prisma.rating.delete({
                    where:{
                        id: ratingID
                    }
                });
                return rating;
            } catch (error) {
                console.log("Error in deleteRating repo : ",error)
                return new ApiError(500,"Error in deleting rating");
            }
        }
}