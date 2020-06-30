import App from './app/app';

import AuthenticationController from './authentication/authentication.controller';
import HealthCheckController from './health-check/health-check.controller';

new App([new AuthenticationController(), new HealthCheckController()]).listen();
