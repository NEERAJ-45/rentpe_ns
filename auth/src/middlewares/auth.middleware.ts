import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema } from '../utils/validationSchemas';
import { ApiError } from '../utils/ApiHandler';
import { HTTP_STATUS } from '../utils/http_status';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();
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
    try {
        const decoded = authService.verifyJwt(refreshToken);
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'No token provided'));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Token is required');
    }
    try {
        const decoded = authService.verifyJwt(token);
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }
};