import {cleanEnv, port, str, num} from 'envalid';

export function validateEnv(): void {
  cleanEnv(process.env, {
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    POSTGRES_USER: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    JWT_SECRET: str(),
    SESSION_DURATION: num(),
    PORT: port(),
  });
}
