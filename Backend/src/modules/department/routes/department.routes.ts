import { isAuthenticated } from "../../user/middlewares/user.middleware";
import { Router } from "express";
import { DepartmentController } from "../controllers/department.controller";

const router = Router();

const departmentController = new DepartmentController();

//Create a new department within a hospital
router.post("/register", isAuthenticated, departmentController.registerDepartment.bind(departmentController));

//get a list of all departments
router.get("/all", departmentController.getAllDepartments.bind(departmentController));

//Get details of a specific department by department ID
router.get("/:id", departmentController.getDepartmentById.bind(departmentController));

//Update department information
router.put("/:id", isAuthenticated, departmentController.updateDepartment.bind(departmentController));

//Delete a department
router.delete("/:id", isAuthenticated, departmentController.deleteDepartment.bind(departmentController));

//get a list of all departments within a hospital

export default router;