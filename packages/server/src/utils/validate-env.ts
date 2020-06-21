import {cleanEnv, port, str} from 'envalid';

export function validateEnv(): void {
  cleanEnv(process.env, {
    POSTGRES_PASSWORD: str({devDefault: 'qwerty12345'}),
    POSTGRES_DB: str({devDefault: 'localDB'}),
    POSTGRES_USER: str({devDefault: 'testUser'}),
    POSTGRES_HOST: str({devDefault: '127.0.0.1'}),
    POSTGRES_PORT: port({devDefault: 5432}),
    PORT: port({devDefault: 3000}),
  });
}
