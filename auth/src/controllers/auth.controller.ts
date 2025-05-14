import { Request, Response } from 'express';
import { ApiResponse, ApiError } from '../utils/ApiHandler';
import { HTTP_STATUS } from '../utils/http_status';
import asyncHandler from '../utils/asynHandler';
import { UserRegisterDTO, UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { clearCookie, setCookie } from '../utils/cookies';
import { generateId } from '../utils/genrateId';
import { JwtPayload } from '../types/express/express.d';

interface UserLogin {
    email: string;
    password: string;
}

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as UserLogin;
    const deviceToken = req.headers['device-token'] as string | undefined;

    const user = await UserService.getUserByEmail(email);
    if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');

    const isValid = await UserService.verifyPassword(user, password);
    if (!isValid) throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid crendentials');

    const role = await UserService.getUserRole(user.id);
    if (!role) throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');

    const jti = generateId();
    const payload: JwtPayload = { jti, userId: user.id, role };
    const accessToken = AuthService.generateAccessToken(payload);
    const refreshToken = AuthService.generateRefreshToken(payload);

    await UserService.createSession({
        jti,
        userId: user.id,
        refreshToken,
        deviceInfo: deviceToken,
    });

    setCookie(res, 'accessToken', accessToken, 15 * 60 * 1000);
    setCookie(res, 'refreshToken', refreshToken, 7 * 24 * 60 * 60 * 1000);

    res
        .status(HTTP_STATUS.OK)
        .json(
            new ApiResponse(
                HTTP_STATUS.OK,
                { userId: user.id, accessToken, refreshToken },
                'Login successful'
            )
        );
});

export const register = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body as UserRegisterDTO;
    const newUser = await UserService.register(userData);

    if (!newUser) {
        throw new ApiError(HTTP_STATUS.CONFLICT, 'User already exists');
    }

    res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            { userId: newUser?.id },
            'User registered successfully'
        )
    );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    const jti = (user as JwtPayload)?.userId;

    await UserService.deleteSessions(jti);

    clearCookie(res, 'accessToken');

    clearCookie(res, 'refreshToken');

    res.status(HTTP_STATUS.OK).json(
        new ApiResponse(HTTP_STATUS.OK, null, 'Logged out successfully')
    );
});

export const newAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;

    const { userId, accessToken } = await UserService.assignAccessToken(user);

    setCookie(res, 'accessToken', accessToken, 15 * 60 * 1000);

    res.status(HTTP_STATUS.OK).json(
        new ApiResponse(HTTP_STATUS.OK, userId, 'Access Token sent successfully')
    );
});
