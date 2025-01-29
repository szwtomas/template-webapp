import {UserSessionDal} from "./UserSessionDal";
import {UserSessionService} from "./UserSessionService";

jest.mock("./userSessionDal");

describe("UserSessionService", () => {
    let userSessionDalMock: jest.Mocked<UserSessionDal>;

    beforeEach(() => {
        userSessionDalMock = new UserSessionDal() as jest.Mocked<UserSessionDal>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("createSession", () => {
        it("should create sessions with different uuid each time", async () => {
            userSessionDalMock.createSession.mockImplementation(async (userId: number, token: string, expDate: Date) => {
                return {token, expiresAt: expDate, userId, isActive: true};
            });

            const sessionService = new UserSessionService(userSessionDalMock);
            const session1 = await sessionService.createSession(123);
            const session2 = await sessionService.createSession(123);
            const session3 = await sessionService.createSession(456);

            expect(userSessionDalMock.createSession).toBeCalledTimes(3);

            expect(session1.userId).toBe(123);
            expect(session2.userId).toBe(123);
            expect(session3.userId).toBe(456);

            expect(session1.isActive).toBe(true);
            expect(session2.isActive).toBe(true);
            expect(session3.isActive).toBe(true);

            expect(session1.token).not.toBe(session2.token);
            expect(session1.token).not.toBe(session3.token);
            expect(session2.token).not.toBe(session3.token);
        });
    });
});