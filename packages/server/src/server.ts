import 'dotenv/config';
import 'reflect-metadata';
import {createConnection} from 'typeorm';

import {validateEnv} from './utils/validate-env';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import config from './ormconfig';
import HealthCheckController from './health-check/health-check.controller';

validateEnv();

(async () => {
    try {
        await createConnection(config);
        console.log('Connected to DB!');
    } catch (error) {
        console.log('Error while connecting to the DB:', error);
        return error;
    }
    const app = new App(
        [
            new AuthenticationController(),
            new HealthCheckController()
        ]
    );

    app.listen();
})();
