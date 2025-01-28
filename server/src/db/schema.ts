import {boolean, integer, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    userId: serial("user_id").primaryKey(),
    password: varchar("password", {length: 255}).notNull(),
    email: varchar("email", {length: 255}).notNull().unique()
});

export const userSessions = pgTable("user_session", {
    sessionToken: varchar("user_session", {length: 63}).primaryKey(),
    userId: integer("user_id").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    expiresAt: timestamp("expires_at").notNull(),
});
