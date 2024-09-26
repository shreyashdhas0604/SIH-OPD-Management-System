import { UserRepository } from "../repositories/user.repository";


export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }


}