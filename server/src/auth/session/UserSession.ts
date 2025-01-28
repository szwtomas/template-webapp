export interface UserSession {
    token: string;
    userId: number;
    isActive: boolean;
    expiresAt: Date;
}
