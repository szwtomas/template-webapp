import {UserDal} from "../user/UserDal";
import {PasswordHasher} from "./PasswordHasher";
import {AuthenticationService} from "./AuthenticationService";
import {SignUpService} from "./SignUpService";
import {InvalidPasswordError} from "./InvalidPasswordError";
import {UserDoesNotExistError} from "./UserDoesNotExistError";

jest.mock("../user/UserDal");

describe("AuthenticationService", () => {
    let authenticationService: AuthenticationService;
    let signUpService: SignUpService;
    let userDalMock: jest.Mocked<UserDal>;
    let passwordHasher: PasswordHasher;

    beforeEach(() => {
        userDalMock = new UserDal() as jest.Mocked<UserDal>;
        passwordHasher = new PasswordHasher();
        authenticationService = new AuthenticationService(userDalMock, passwordHasher);
        signUpService = new SignUpService(userDalMock, passwordHasher);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("authenticate", () => {
        it("should authenticate if password is correct", async () => {
            const email = "test@mail.com";
            const password = "12345678";
            userDalMock.getUserByEmail.mockResolvedValueOnce(undefined);
            userDalMock.createUser.mockImplementation(async (email: string, password: string) => {
                return {id: 15, email, password};
            });
            const createdUser = await signUpService.signUp(email, password);
            userDalMock.getUserByEmail.mockResolvedValueOnce(createdUser);
            const authenticated = await authenticationService.authenticate(email, password);
            expect(authenticated.email).toEqual(email);
            expect(authenticated.id).toEqual(createdUser.id);
        });

        it("should throw an exception if password is not correct", async () => {
            const email = "test@mail.com";
            const password = "12345678";
            userDalMock.getUserByEmail.mockResolvedValueOnce(undefined);
            userDalMock.createUser.mockImplementation(async (email: string, password: string) => {
                return {id: 15, email, password};
            });
            const createdUser = await signUpService.signUp(email, password);
            userDalMock.getUserByEmail.mockResolvedValueOnce(createdUser);

            await expect(authenticationService.authenticate(email, "bad-password")).rejects.toThrow(InvalidPasswordError);
        });

        it("should throw if user does not exist", async () => {
            const email = "test@mail.com";
            const password = "12345678";
            userDalMock.getUserByEmail.mockResolvedValueOnce(undefined);
            await expect(authenticationService.authenticate(email, password)).rejects.toThrow(UserDoesNotExistError);
        });
    });
});