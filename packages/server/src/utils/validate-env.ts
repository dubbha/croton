import {cleanEnv, port, str, num} from 'envalid';

export function validateEnv(): void {
    cleanEnv(process.env, {
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        JWT_SECRET: str(),
        SESSION_DURATION: num(),
        PORT: port()
    });
}
