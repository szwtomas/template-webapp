import {db} from "../db";
import {users} from "../db/schema";
import {eq} from "drizzle-orm";
import {User} from "./User";

export class UserDal {
    public async getUserByEmail(email: string): Promise<User | undefined> {
        const result = await db.select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (result.length === 0) {
            return undefined;
        }
        const user = result[0];
        return {
            id: user.userId,
            email: user.email,
        };
    }

    public async createUser(email: string, password: string): Promise<User> {
        const result = await db.insert(users).values({ email, password }).returning();
        const newUser = result[0];
        return {
            id: newUser.userId,
            email: newUser.email,
        };
    }
}