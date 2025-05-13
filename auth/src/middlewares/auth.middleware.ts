import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';
import { registerSchema, loginSchema } from '../utils/validationSchemas';
import { ApiError } from '../utils/ApiHandler';
import { HTTP_STATUS } from '../utils/http_status';
import { JwtPayload } from '../types/auth';

export const registerValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerSchema.safeParse(req.body);
    if (error) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, error.errors[0].message);
    }
    next();
};

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.safeParse(req.body);
    if (error) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, error.errors[0].message);
    }
    next();
};

export const refreshTokenValidator = (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Refresh token is required');
    }
    next();
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'No token provided'));
    }

    const token = authHeader?.split(' ')[1];

    if (!token) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Token is required');
    }
    try {
        const decoded = jwt.verify(token, config.jwtSec) as JwtPayload;
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }
};
