vi.mock('../utils/id', () => ({
    generateId: vi.fn(() => 'mock-jti-id'),
}));

import { vi, expect, describe, it, beforeEach } from 'vitest';
import { pool } from '../config/db';
import { hash, verifyHash } from '../utils/hash';
import { AuthService } from '../services/auth.service';
import { User, UserService } from '../services/user.service';
import { Gender, Role } from '../types/auth';
import app from '../app';
import request from 'supertest';
import { generateId } from '../utils/genrateId';

// Mock all external dependencies
vi.mock('../config/db.ts', () => ({
    pool: {
        query: vi.fn(),
    },
}));

vi.mock('../utils/hash.ts', () => ({
    hash: vi.fn(),
    verifyHash: vi.fn(),
}));

vi.mock('../utils/cookie', () => ({
    setCookie: vi.fn(),
    clearCookie: vi.fn(),
}));

vi.mock('../services/auth.service.ts', () => {
    return {
        AuthService: {
            generateAccessToken: vi.fn(),
            generateRefreshToken: vi.fn(),
        }
    };
});

vi.mock('../services/user.service.ts', () => {
    return {
        UserService: {
            register: vi.fn(),
            getUserByEmail: vi.fn(),
            getUsersByEmailOrMobile: vi.fn(),
            verifyPassword: vi.fn(),
            getUserRole: vi.fn(),
            createSession: vi.fn(),
            deleteSessions: vi.fn(),
            assignAccessToken: vi.fn(),
        }
    };
});

describe('auth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return 200 after login', async () => {
        // Test data
        const mockUserData = {
            id: '1',
            fname: 'John',
            mname: 'Doe',
            lname: 'Doe',
            email: 'john@example.com',
            password: 'Pass@1234',
            mobile: '1234567890',
            gender: Gender.MALE,
        };

        const loginData = {
            email: 'john@example.com',
            password: 'Pass@1234',
        };

        // Mock tokens
        const mockAccessToken = 'mock-access-token';
        const mockRefreshToken = 'mock-refresh-token';

        // Setup mocks
        vi.mocked(UserService.getUserByEmail).mockResolvedValue(mockUserData);
        vi.mocked(UserService.verifyPassword).mockResolvedValue(true);
        vi.mocked(UserService.getUserRole).mockResolvedValue(Role.CUSTOMER);
        vi.mocked(UserService.createSession).mockResolvedValue(undefined);

        vi.mocked(AuthService.generateAccessToken).mockReturnValue(mockAccessToken);
        vi.mocked(AuthService.generateRefreshToken).mockReturnValue(mockRefreshToken);

        // Make request
        const response = await request(app)
            .post('/auth/login')
            .send(loginData)
            .set('device-token', 'mock-device-token');

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            statuscode: 200,
            message: 'Login successful',
            data: {
                userId: mockUserData.id,
                accessToken: mockAccessToken,
                refreshToken: mockRefreshToken,
            },
        });
        

        // Verify service calls
        expect(UserService.getUserByEmail).toHaveBeenCalledWith(loginData.email);
        expect(UserService.verifyPassword).toHaveBeenCalledWith(mockUserData, loginData.password);
        expect(UserService.getUserRole).toHaveBeenCalledWith(mockUserData.id);

        // Verify token generation
        // const expectedPayload = {
        //     jti: 'mock-jti-id',
        //     userId: mockUserData.id,
        //     role: Role.CUSTOMER,
        // };
        // const token = AuthService.generateRefreshToken(expectedPayload);
        // expect(AuthService.generateAccessToken).toHaveBeenCalledWith(expectedPayload);
        // expect(AuthService.generateRefreshToken).toHaveBeenCalledWith(expectedPayload);

        // // Verify session creation
        // expect(UserService.createSession).toHaveBeenCalledWith({
        //     jti: 'mock-jti-id',
        //     userId: mockUserData.id,
        //     refreshToken: mockRefreshToken,
        //     deviceInfo: 'mock-device-token',
        // });
    });

    it('should return 404 after login with invalid credentials', async () => {
        const loginData = {
            email: 'john@example.com',
            password: 'Pass@1234',
        };

        vi.mocked(UserService.getUserByEmail).mockResolvedValue(null);

        const response = await request(app)
            .post('/auth/login')
            .send(loginData)
            .set('device-token', 'mock-device-token');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    })

    it('should return 401 after login with invalid credentials', async () => {
        const mockUserData = {
            id: '1',
            fname: 'John',
            mname: 'Doe',
            lname: 'Doe',
            email: 'john@example.com',
            password: 'Pass@1234',
            mobile: '1234567890',
            gender: Gender.MALE,
        };

        const loginData = {
            email: 'john@example.com',
            password: 'Pass@1234',
        };

        vi.mocked(UserService.getUserByEmail).mockResolvedValue(mockUserData);
        vi.mocked(UserService.verifyPassword).mockResolvedValue(false); 

        const response = await request(app)
            .post('/auth/login')
            .send(loginData)
            .set('device-token', 'mock-device-token');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid crendentials');
    })

    it('should return 500 after role not found in db due to internal server error', async () => {
        const mockUserData = {
            id: '1',
            fname: 'John',
            mname: 'Doe',
            lname: 'Doe',
            email: 'john@example.com',
            password: 'Pass@1234',
            mobile: '1234567890',
            gender: Gender.MALE,
        };

        const loginData = {
            email: 'john@example.com',
            password: 'Pass@1234',
        };

        vi.mocked(UserService.getUserByEmail).mockResolvedValue(mockUserData);
        vi.mocked(UserService.verifyPassword).mockResolvedValue(true); 
        vi.mocked(UserService.getUserRole).mockResolvedValue(null); 

        const response = await request(app)
            .post('/auth/login')
            .send(loginData)
            .set('device-token', 'mock-device-token');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal server error');
    })
});