import {relations} from "drizzle-orm";
import {users, userSessions} from "./schema";

export const usersRelations = relations(users, ({many}) => ({
    sessions: many(userSessions),
}));

export const userSessionsRelations = relations(userSessions, ({one}) => ({
    user: one(users, {
        fields: [userSessions.userId],
        references: [users.userId],
    }),
}));