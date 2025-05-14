import { totp } from 'otplib';
import config from '../config/env';
import { HashAlgorithms } from '@otplib/core';

// Define OTP payload types
interface EmailOtpPayload {
    email: string;
    type: 'email-verification' | 'password-reset';
}

interface MobileOtpPayload {
    mobile: string;
    type: 'mobile-verification' | 'login';
}

export type OtpPayload = EmailOtpPayload | MobileOtpPayload;

export class OtpService {
    private readonly otpSecret: string;

    constructor() {
        this.otpSecret = config.otpSecret;
        this.setupOtpConfig();
    }
    
    private setupOtpConfig(): void {
        totp.options = {
            digits: 6,
            step: 300, // 5-minute validity
            algorithm: HashAlgorithms.SHA256,
        };
    }

    generateOtp(payload: OtpPayload): string {
        const secret = `${this.otpSecret}-${payload.type}-${
            'email' in payload ? payload.email : payload.mobile
        }`;
        return totp.generate(secret);
    }

    verifyOtp(token: string, payload: OtpPayload): boolean {
        const secret = `${this.otpSecret}-${payload.type}-${
            'email' in payload ? payload.email : payload.mobile
        }`;
        return totp.check(token, secret);
    }
}