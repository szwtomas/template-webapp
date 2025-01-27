import {PasswordHasher} from "./PasswordHasher";

describe("Password hasher", () => {
    describe("hash and compare", () => {
        it("should return true if password is a match", async () => {
            const unit = new PasswordHasher();
            const hashedPassword = await unit.hashPassword("abcdefg123");
            const isMatch = await unit.comparePassword("abcdefg123", hashedPassword);
            expect(isMatch).toBe(true);
        });

        it("should return false if password is not a match", async () => {
            const unit = new PasswordHasher();
            const hashedPassword = await unit.hashPassword("abcdefg123");
            const isMatch = await unit.comparePassword("another password", hashedPassword);
            expect(isMatch).toBe(false);
        });
    });
});