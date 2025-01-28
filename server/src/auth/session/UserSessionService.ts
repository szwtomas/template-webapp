import {UserSession} from "./UserSession";
import {randomUUID} from "crypto";
import {UserSessionDal} from "./UserSessionDal";

export class UserSessionService {
    private readonly SESSION_DURATION_DAYS: number = 15;
    private userSessionDal: UserSessionDal;

    constructor(userSessionDal: UserSessionDal) {
        this.userSessionDal = userSessionDal;
    }

    public async createSession(userId: number): Promise<UserSession> {
        const sessionToken: string = randomUUID();
        const expireDate = this.getExpireDate(this.SESSION_DURATION_DAYS);
        return this.userSessionDal.createSession(userId, sessionToken, expireDate);
    }

    private getExpireDate(daysUntilExpire: number): Date {
        const today = new Date();
        today.setDate(today.getDate() + daysUntilExpire);
        return today;
    }
}