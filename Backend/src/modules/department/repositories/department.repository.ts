import { ApiError } from "../../utils/ApiError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DepartmentRepository{
    
    public async register(departmentparam: any){
        try {
            const department = await prisma.department.create({
                data:{
                    name: departmentparam.name,
                    hospitalID: departmentparam.hospitalID,
                    description: departmentparam.description
                }
            });
            return department;
        } catch (error) {
            console.log('Error in registerDepartment Repository : ', error);
            return new ApiError(500,"Error in registering department");
        }
    }

    public async getAll(){
        try {
            const departments = await prisma.department.findMany();
            return departments;
        } catch (error) {
            console.log('Error in getAllDepartments Repository : ', error);
            return new ApiError(500,"Error in getting departments");
        }
    }

    public async getDepartmentById(departmentID: number){
        try {
            const department = await prisma.department.findUnique({
                where:{
                    id: departmentID
                }
            });
            return department;
        } catch (error) {
            console.log('Error in getDepartmentById Repository : ', error);
            return new ApiError(500,"Error in getting department");
        }
    }

    public async updateDepartment(departmentID: number, departmentparam: any){
        try {
            const department = await prisma.department.update({
                where:{
                    id: departmentID
                },
                data:{
                    name: departmentparam.name,
                    hospitalID: departmentparam.hospitalID,
                    description: departmentparam.description
                }
            });
            return department;
        } catch (error) {
            console.log('Error in updateDepartment Repository : ', error);
            return new ApiError(500,"Error in updating department");
        }
    }

    public async deleteDepartment(departmentID: number){
        try {
            const department = await prisma.department.delete({
                where:{
                    id: departmentID
                }
            });
            return department;
        } catch (error) {
            console.log('Error in deleteDepartment Repository : ', error);
            return new ApiError(500,"Error in deleting department");
        }
    }
}
