import {User} from "../user/User";
import {PasswordHasher} from "./PasswordHasher";
import {UserDal} from "../user/UserDal";
import {UserDoesNotExistError} from "./UserDoesNotExistError";
import {InvalidPasswordError} from "./InvalidPasswordError";

export class AuthenticationService {
    private userDal: UserDal;
    private passwordHasher: PasswordHasher;

    constructor(userDal: UserDal, passwordHasher: PasswordHasher) {
        this.passwordHasher = passwordHasher;
        this.userDal = userDal;
    }

    public async authenticate(email: string, password: string): Promise<User> {
        const user = await this.userDal.getUserByEmail(email);
        if (!user) {
            throw new UserDoesNotExistError();
        }

        const passwordMatches = await this.passwordHasher.comparePassword(password, user.password);
        if (!passwordMatches) {
            throw new InvalidPasswordError();
        }

        return user;
    }
}