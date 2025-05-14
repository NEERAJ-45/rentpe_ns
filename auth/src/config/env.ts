import dotenv from 'dotenv';
import { JwtAlgorithm, StringValue } from '../types/auth';
dotenv.config();

interface Config {
  port: number;
  jwtSec: string;
  nodeENV: string;
  poolUrl: string;
  clientUrl: string;
  jwtAccessExp: StringValue | number;
  jwtRefreshExp: StringValue | number;
  jwtAlgorithm: JwtAlgorithm | undefined;
  otpSecret: string;
}

const requiredEnvVars = [
  'PORT',
  'JWT_SEC',
  'NODE_ENV',
  'POOL_URL',
  'CLIENT_URL',
  'JWT_ACCESS_EXPIRY',
  'JWT_REFRESH_EXPIRY',
  'JWT_ALGORITHM',
  'OTP_SECRET',
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    `ERROR: The following required environment variables are missing: ${missingEnvVars.join(', ')}`
  );
  process.exit(1);
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  nodeENV: process.env.NODE_ENV as string,
  jwtSec: process.env.JWT_SEC as string,
  poolUrl: process.env.POOL_URL as string,
  clientUrl: process.env.CLIENT_URL as string,
  jwtAccessExp: process.env.JWT_ACCESS_EXPIRY as StringValue | number,
  jwtRefreshExp: process.env.JWT_REFRESH_EXPIRY as StringValue | number,
  jwtAlgorithm: process.env.JWT_ALGORITHM as JwtAlgorithm | undefined,
  otpSecret: process.env.OTP_SECRET as string,
};

export default config;