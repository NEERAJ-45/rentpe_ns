import jwt from 'jsonwebtoken';
import config from '../config/env';
import { JwtPayload } from '../types/express/express.d';

export class AuthService {
  private static readonly jwtSecret: string = config.jwtSec;

  static generateAccessToken(payload: JwtPayload): string {
      return jwt.sign(payload, AuthService.jwtSecret, { algorithm: config.jwtAlgorithm, expiresIn: config.jwtAccessExp });
  }

  static generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, AuthService.jwtSecret, { algorithm: config.jwtAlgorithm, expiresIn: config.jwtRefreshExp });
  }

  verifyJwt(token: string): JwtPayload {
    return jwt.verify(token, this.jwtSecret) as JwtPayload;
  }
}