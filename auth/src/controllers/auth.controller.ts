import { Request, Response } from 'express';
import { ApiResponse, ApiError } from '../utils/ApiHandler';
import { HTTP_STATUS } from '../utils/http_status';
import asyncHandler from '../utils/asynHandler';
import { pool } from '../config/db';
import jwt from 'jsonwebtoken';
import config from '../config/env';
import { hash, verifyHash } from '../utils/hash';
import { JwtPayload } from '../types/auth';
import { setCookie, clearCookie } from '../utils/cookies';
import { User, Role, Gender, UserService } from '../services/user.service';

type UserRow = {
    id: string | number;
    password: string;
};

interface UserLogin {
    email: string;
    password: string;
}

interface UserRegister {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    password: string;
    mobile: string;
    gender: Gender;
}

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as UserLogin;

    const user = await pool.query<UserRow>('select id, password from "users" where email = $1', [
        email,
    ]);
    
    if (user.rows.length === 0) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }
    const { id: userId, password: userpass } = user.rows[0];

    const roleQuery = await pool.query('select role from role where user_id = $1', [userId]);

    const role: string = roleQuery.rows[0].role;
    if (!role) {
        throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');
    }

    const isValid = await verifyHash(userpass, password);
    if (!isValid) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid password');
    }

    const jwtSecret: string = config.jwtSec + 'SIGNUP';

    const accessToken = jwt.sign({ userId, role }, jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId, role }, jwtSecret, { expiresIn: '7d' });

    setCookie(res, 'accessToken', accessToken, 15 * 60 * 1000);

    setCookie(res, 'refreshToken', refreshToken, 7 * 24 * 60 * 60 * 1000);

    const deviceToken = req.headers['device-token'] as string | undefined;

    await pool.query(
        'insert into sessions(user_id, refresh_token, device_info) values($1, $2, $3)',
        [userId, refreshToken, deviceToken]
    );

    res.send(
        new ApiResponse(
            HTTP_STATUS.OK,
            { userId: userId, access_token: accessToken, refresh_token: refreshToken },
            'Login Successfully'
        )
    );
});

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { firstname, middlename, lastname, email, password, mobile, gender } =
        req.body as UserRegister;

    const user = new User(
        firstname,
        middlename,
        lastname,
        email,
        password,
        mobile,
        gender,
        Role.CUSTOMER
    );

    try {
        const userId = await UserService.insertUser(user);
        res.send(new ApiResponse(HTTP_STATUS.CREATED, { userId }, 'User registered successfully'));
    } catch (error: any) {
        if (error.message === 'User already exists') {
            throw new ApiError(HTTP_STATUS.CONFLICT, error.message);
        }
        throw error;
    }
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body as { refreshToken: string };
    if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Refresh token is required');
    }

    const user = await pool.query<{ userId: string | number }>(
        'select user_id from sessions where refresh_token = $1',
        [refreshToken]
    );

    if (user.rows.length === 0) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
    }
    const { userId } = user.rows[0];

    const role = pool.query<{ role: string }>('select role from role where user_id = $1', [userId]);

    const jwtSecret: string = config.jwtSec + 'SIGNUP';

    const accessToken = jwt.sign({ userId, role }, jwtSecret, { expiresIn: '15m' });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
    });
    res.send(new ApiResponse(HTTP_STATUS.OK, userId, 'Access Token sent successfully'));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    const userId = (user as JwtPayload)?.userId;

    if (!userId) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid user');
    }

    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
        await pool.query('DELETE FROM sessions WHERE user_id = $1 AND refresh_token = $2', [
            userId,
            refreshToken,
        ]);
    } else {
        await pool.query('DELETE FROM sessions WHERE user_id = $1', [userId]);
    }

    clearCookie(res, 'accessToken');

    clearCookie(res, 'refreshToken');

    return res.status(200).send(new ApiResponse(HTTP_STATUS.OK, null, 'Logged out successfully'));
});
