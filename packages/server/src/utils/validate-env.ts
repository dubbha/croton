import { cleanEnv, num, port, str } from 'envalid';

export function validateEnv(): void {
  cleanEnv(process.env, {
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    POSTGRES_USER: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    PORT: port(),
    JWT_SECRET: str(),
    SESSION_DURATION: num(),
    EMAIL_VERIFICATION_EXPIRATION_TIME: num(),
    PASSWORD_RESET_EXPIRATION_TIME: num(),
    EMAIL_HOST: str(),
    EMAIL_PORT: num(),
    EMAIL_USER: str(),
    EMAIL_PASS: str(),
    HTTPS_PORT: port(),
    APP_HOST: str(),
    HOME: str(),
    FACEBOOK_APP_ID: str(),
    FACEBOOK_APP_SECRET: str(),
  });
}
