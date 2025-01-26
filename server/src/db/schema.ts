import {pgTable, serial, varchar} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    userId: serial("user_id").primaryKey(),
    password: varchar("password", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique()
});
