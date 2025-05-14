import express from 'express';

export type JwtPayload = {
    jti: string;
    userId: string;
    role: Role;
    iat?: number;
    exp?: number;
};

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}