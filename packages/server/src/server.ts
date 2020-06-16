import 'dotenv/config';

import {validateEnv} from './utils/validate-env';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';

validateEnv();

const app = new App(
    [
        new AuthenticationController()
    ]
);

app.listen();
