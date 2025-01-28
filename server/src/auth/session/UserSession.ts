export interface UserSession {
    token: string;
    userId: number;
    isActive: boolean;
    emittedAt: Date;
    expiresAt: Date;
}
