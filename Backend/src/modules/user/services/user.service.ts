import { UserRepository } from "../repositories/user.repository";


export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
        console.log("UserService Created !!");
    }

    public async register(user: any): Promise<any> {
        try {

            let userObj = await this.userRepository.getUserByEmail(user.email);

            if(userObj) {
                throw new Error("User Already Exists");
                return userObj;
            }

            userObj = await this.userRepository.register(user);
            
            if(!userObj) {
                throw new Error("Failed to Create User");
                return;
            }

            return userObj;

        } catch (error: any) {
            throw new Error("Failed To Create User : " + error.message);
        }
    }

}