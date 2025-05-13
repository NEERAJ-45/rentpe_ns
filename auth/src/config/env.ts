import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  jwtSec: string;
  nodeENV: string;
  poolUrl: string;
  clientUrl: string;
}

const requiredEnvVars = [
  'PORT',
  'JWT_SEC',
  'NODE_ENV',
  'POOL_URL',
  'CLIENT_URL',
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
  clientUrl: process.env.CLIENT_URL as string
};

export default config;
