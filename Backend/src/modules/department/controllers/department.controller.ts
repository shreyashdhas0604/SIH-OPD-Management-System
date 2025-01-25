import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { DepartmentService } from "../services/department.service";

interface DepartmentParam {
    name: string;
    hospitalID: number;
    description: string | null;
}

export class DepartmentController {
    private departmentService: DepartmentService;

    constructor() {
        this.departmentService = new DepartmentService();
    }

   public async registerDepartment(req: any, res: any){
        try {
            const deptparam = req.body as DepartmentParam;
            const department = await this.departmentService.registerDepartment(req.body);
            if(department instanceof ApiError){
                return new ApiError(500,"Error in registering department");
            }
            return res.status(200).json(new ApiResponse(200,department));
        } catch (error) {
            console.log('Error in registerDepartment Controller : ', error);
            return new ApiError(500,"Error in registering department");
        }
    }

    public async getAllDepartments(req: any, res: any){
        try {
            const departments = await this.departmentService.getAllDepartments();
            if(departments instanceof ApiError){
                return new ApiError(500,"Error in getting departments");
            }
            return res.status(200).json(new ApiResponse(200,departments));
        } catch (error) {
            console.log('Error in getAllDepartments Controller : ', error);
            return new ApiError(500,"Error in getting departments");
        }
    }

    public async getDepartmentById(req: any, res: any){
        try {
            const departmentID = parseInt(req.params.id);
            const department = await this.departmentService.getDepartmentById(departmentID);
            if(department instanceof ApiError){
                return new ApiError(500,"Error in getting department");
            }
            return res.status(200).json(new ApiResponse(200,department));
        } catch (error) {
            console.log('Error in getDepartmentById Controller : ', error);
            return new ApiError(500,"Error in getting department");
        }
    }

    public async updateDepartment(req: any, res: any){
        try {
            const departmentID = parseInt(req.params.id);
            const deptparam = req.body as DepartmentParam;
            const department = await this.departmentService.updateDepartment(departmentID,deptparam);
            if(department instanceof ApiError){
                return new ApiError(500,"Error in updating department");
            }
            return res.status(200).json(new ApiResponse(200,department));
        } catch (error) {
            console.log('Error in updateDepartment Controller : ', error);
            return new ApiError(500,"Error in updating department");
        }
    }

    public async deleteDepartment(req: any, res: any){
        try {
            const departmentID = parseInt(req.params.id);
            const department = await this.departmentService.deleteDepartment(departmentID);
            if(department instanceof ApiError){
                return new ApiError(500,"Error in deleting department");
            }
            return res.status(200).json(new ApiResponse(200,department));
        } catch (error) {
            console.log('Error in deleteDepartment Controller : ', error);
            return new ApiError(500,"Error in deleting department");
        }
    }
}