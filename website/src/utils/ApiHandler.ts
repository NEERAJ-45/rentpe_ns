import { ZodIssue } from 'zod';

export class ApiError extends Error {
    readonly statuscode: number;
    readonly error: string | string[] | ZodIssue[];
    readonly stack?: string;
    readonly success: boolean;
    readonly status: string;
    readonly data: any;
    readonly duration?: number;

    constructor(
        statuscode: number,
        message: string = 'Something went wrong',
        error: string | string[] | ZodIssue[] = 'Unknown error',
        data: any = null,
        duration: number = 0
    ) {
        super(message);
        this.statuscode = statuscode;
        this.success = false;
        this.status = statuscode >= 400 && statuscode < 500 ? 'fail' : 'error';
        this.error = error;
        this.data = data;
        this.duration = duration ?? 0;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            statusCode: this.statuscode,
            message: this.message,
            error: this.error,
            status: this.status,
            data: this.data,
            duration: this.duration,
        };
    }
}

export class ApiResponse<T> {
    message: string;
    statusCode: number;
    data: T;
    success: boolean;

    constructor(statusCode: number, data: T, message: string = '') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}
