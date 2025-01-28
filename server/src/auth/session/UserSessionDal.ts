import {UserSession} from "./UserSession";
import {db} from "../../db";
import {userSessions} from "../../db/schema";

export class UserSessionDal {
    public async createSession(userId: number, sessionToken: string, expiresAt: Date): Promise<UserSession> {
        await db.insert(userSessions).values({
            userId,
            sessionToken,
            expiresAt,
            isActive: true
        }).returning();

        return {userId, isActive: true, expiresAt, token: sessionToken,};
    }
}