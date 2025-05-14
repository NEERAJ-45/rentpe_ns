import { Gender, Role } from '../types/auth';
import { UserSession } from '../types/auth';
import { ApiError } from '../utils/ApiHandler';
import { HTTP_STATUS } from '../utils/http_status';
import { AuthService } from './auth.service';
import { hash, verifyHash } from '../utils/hash';
import { pool } from '../config/db';
import { JwtPayload } from '../types/express/express.d';

export interface User {
    id: string;
    fname: string;
    mname?: string;
    lname: string;
    email: string;
    password: string;
    mobile?: string;
    gender: Gender;
}

export interface UserRegister {
    id: string;
    email: string;
    role: Role;
}

export interface UserRegisterDTO {
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    password: string;
    mobile?: string;
    gender: Gender;
}

export class UserService {
    static async register(userData: UserRegisterDTO): Promise<UserRegister | undefined> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { firstname, middlename, lastname, email, password, mobile, gender } = userData;
            const userExists = await UserService.getUsersByEmailOrMobile(email, Number(mobile));

            if (userExists && userExists.length > 0) {
                const emailExists = userExists.some(user => user.email === email);
                const mobileExists = userExists.some(user => user.mobile === String(mobile));
            
                if (emailExists && mobileExists) {
                    throw new ApiError(HTTP_STATUS.CONFLICT, 'Both email and mobile number are already in use');
                } else if (emailExists) {
                    throw new ApiError(HTTP_STATUS.CONFLICT, 'Email is already in use. Please use a different email');
                } else if (mobileExists) {
                    throw new ApiError(HTTP_STATUS.CONFLICT, 'Mobile number is already in use. Please use a different number');
                }
            }

            const hashedPassword = await hash(password);

            const userResult = await client.query<User>(
                `INSERT INTO users (fname, mname, lname, email, password, mobile, gender)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, email`,
                [
                    firstname,
                    middlename || null,
                    lastname,
                    email,
                    hashedPassword,
                    mobile || null,
                    gender,
                ]
            );

            const userRole = await client.query<{role: Role}>('INSERT INTO role (role, user_id) VALUES ($1, $2) RETURNING role', [
                Role.CUSTOMER,
                userResult.rows[0].id,
            ]);
            if (!userRole) {
                throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error');
            }

            const user: UserRegister = {
                id: userResult.rows[0].id,
                email: userResult.rows[0].email,
                role: Role.CUSTOMER,
            };

            await client.query('COMMIT');
            return user;
        } catch (error) {
            await client.query('ROLLBACK')
            throw error;
        } finally {
            client.release();
        }
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        const result = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }

    static async getUsersByEmailOrMobile(email: string, phone: number): Promise<User[] | null> { 
        const result = await pool.query<User>('SELECT * FROM users WHERE email = $1 OR mobile = $2', [email, phone]);
        return result.rows || null;
    }

    static async verifyPassword(user: User, password: string): Promise<boolean> {
        return verifyHash(user.password, password);
    }

    static async getUserRole(userId: string): Promise<Role | null> {
        const result = await pool.query<{ role: Role }>(
            'SELECT role FROM role WHERE user_id = $1',
            [userId]
        );
        return result.rows[0]?.role || null;
    }

    static async createSession(sessionData: UserSession): Promise<void> {
        await pool.query(
            'INSERT INTO sessions (user_id, jti, refresh_token, device_info) VALUES ($1, $2, $3, $4)',
            [sessionData.userId, sessionData.jti, sessionData.refreshToken, sessionData.deviceInfo || null]
        );
    }

    static async deleteSessions(jti: string): Promise<void> {
        await pool.query('DELETE FROM sessions WHERE jti = $1', [jti]);
    }

    static async assignAccessToken(user: JwtPayload): Promise<{ userId: string; accessToken: string }> {
        const sessionResult = await pool.query<{ user_id: string }>(
            'SELECT user_id FROM sessions WHERE jti = $1',
            [user.jti]
        );
    
        if (sessionResult.rows.length === 0) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
        }
    
        const { user_id: userId } = sessionResult.rows[0];
    
        const payload: JwtPayload = {
            jti: user.jti,
            userId,
            role: user.role,
        };
    
        const accessToken = AuthService.generateAccessToken(payload);
        return { userId, accessToken };
    }
    
}
