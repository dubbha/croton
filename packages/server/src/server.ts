import App from './app/app';
import createPostgresConnection from './utils/createPostgresConnection';

import AuthenticationController from './authentication/authentication.controller';
import HealthCheckController from './health-check/health-check.controller';

createPostgresConnection().then(() => {
  new App([
    new AuthenticationController(),
    new HealthCheckController(),
  ]).listen();
});
