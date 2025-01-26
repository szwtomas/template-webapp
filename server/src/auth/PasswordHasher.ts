import { hash, compare } from "bcrypt";

export class PasswordHasher {
    public async hashPassword(password: string) {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    }

    public async comparePassword(rawPassword: string, hashedPassword: string) {
        return compare(rawPassword, hashedPassword);
    }
}
