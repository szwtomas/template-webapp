import {UserDal} from "../user/UserDal";
import {PasswordHasher} from "./PasswordHasher";
import {User} from "../user/User";

export class SignUpService {
    private userDal: UserDal;
    private passwordHasher: PasswordHasher;

    constructor(userDal: UserDal, passwordHasher: PasswordHasher) {
        this.userDal = userDal;
        this.passwordHasher = passwordHasher;
    }

    public async signUp(email: string, rawPassword: string): Promise<User> {
        await this.throwOnUserAlreadyExists(email);
        const hashedPassword = await this.passwordHasher.hashPassword(rawPassword);
        return await this.userDal.createUser(email, hashedPassword);
    }

    private async throwOnUserAlreadyExists(email: string): Promise<void> {
        const existingUser = await this.userDal.getUserByEmail(email);
        if (existingUser !== undefined) {
            throw new Error("User already exists with email: " + email);
        }
    }
}