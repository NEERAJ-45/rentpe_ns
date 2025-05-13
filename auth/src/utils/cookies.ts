import { Response } from 'express';
export const setCookie = (res: Response, name: string, value: string, maxAge: number) => {
    res.cookie(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge,
    });
};

export const clearCookie = (res: Response, name: string) => {
    res.clearCookie(name, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
};