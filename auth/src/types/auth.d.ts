export interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: string | object;
        }
    }
}