import { AdminRepository } from "../repositories/admin.repository";


export class AdminService {

    private adminRepository: AdminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }   // }
}