import { ApiError } from "../../utils/ApiError";
import {DepartmentRepository} from "../repositories/department.repository";

export class DepartmentService{
    private departmentRepository: DepartmentRepository;

    constructor() {
        this.departmentRepository = new DepartmentRepository();
    }

    public async registerDepartment(departmentparam: any){
        try {
            const department = await this.departmentRepository.register(departmentparam);
            if(department instanceof ApiError){
                return department;
            }
            return department;
        } catch (error) {
            console.log('Error in registerDepartment Service : ', error);
            return new ApiError(500,"Error in registering department");
        }
    }

    public async getAllDepartments(){
        try {
            const departments = await this.departmentRepository.getAll();
            if(departments instanceof ApiError){
                return departments;
            }
            return departments;
        } catch (error) {
            console.log('Error in getAllDepartments Service : ', error);
            return new ApiError(500,"Error in getting departments");
        }
    }

    public async getDepartmentById(departmentID: number){
        try {
            const department = await this.departmentRepository.getDepartmentById(departmentID);
            if(department instanceof ApiError){
                return department;
            }
            return department;
        } catch (error) {
            console.log('Error in getDepartmentById Service : ', error);
            return new ApiError(500,"Error in getting department");
        }
    }

    public async updateDepartment(departmentID: number, departmentparam: any){
        try {
            const department = await this.departmentRepository.updateDepartment(departmentID,departmentparam);
            if(department instanceof ApiError){
                return department;
            }
            return department;
        } catch (error) {
            console.log('Error in updateDepartment Service : ', error);
            return new ApiError(500,"Error in updating department");
        }
    }

    public async deleteDepartment(departmentID: number){
        try {
            const department = await this.departmentRepository.deleteDepartment(departmentID);
            if(department instanceof ApiError){
                return department;
            }
            return department;
        } catch (error) {
            console.log('Error in deleteDepartment Service : ', error);
            return new ApiError(500,"Error in deleting department");
        }
    }
}