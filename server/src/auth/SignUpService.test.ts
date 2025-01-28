import {SignUpService} from "./SignUpService";
import {UserDal} from "../user/UserDal";
import {PasswordHasher} from "./PasswordHasher";
import {User} from "../user/User";
import {UserAlreadyExistsError} from "./UserAlreadyExistsError";

jest.mock("../user/UserDal");
jest.mock("./PasswordHasher");

describe("SignUpService", () => {
    let signUpService: SignUpService;
    let userDalMock: jest.Mocked<UserDal>;
    let passwordHasherMock: jest.Mocked<PasswordHasher>;

    beforeEach(() => {
        userDalMock = new UserDal() as jest.Mocked<UserDal>;
        passwordHasherMock = new PasswordHasher() as jest.Mocked<PasswordHasher>;
        signUpService = new SignUpService(userDalMock, passwordHasherMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("signUp", () => {
        it("Should hash the password and create the user", async () => {
            const email = "test@example.com";
            const rawPassword = "password123";
            const hashedPassword = "hashedPassword";
            const newUser: User = {id: 1, email, password: hashedPassword};

            passwordHasherMock.hashPassword.mockResolvedValue(hashedPassword);
            userDalMock.createUser.mockResolvedValue(newUser);
            userDalMock.getUserByEmail.mockResolvedValue(undefined);

            const result: User = await signUpService.signUp(email, rawPassword);

            expect(userDalMock.getUserByEmail).toHaveBeenCalledWith(email);
            expect(passwordHasherMock.hashPassword).toHaveBeenCalledWith(rawPassword);
            expect(userDalMock.createUser).toHaveBeenCalledWith(email, hashedPassword);
            expect(result).toEqual(newUser);
        });

        it("should throw if user already exists", async () => {
            const email = "test@example.com";
            const rawPassword = "my-password";
            userDalMock.getUserByEmail.mockResolvedValue({email: "test@example.com", password: "password123", id: 23});
            await expect(signUpService.signUp(email, rawPassword)).rejects.toThrow(UserAlreadyExistsError);
        });
    });
});