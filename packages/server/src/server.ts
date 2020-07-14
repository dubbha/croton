import App from './app/app';
import createPostgresConnection from './utils/createPostgresConnection';

import AuthenticationController from './authentication/authentication.controller';
import HealthCheckController from './health-check/health-check.controller';
import UserManagementController from './user-management/user-management.controller';

createPostgresConnection().then(() => {
  new App([
    new AuthenticationController(),
    new HealthCheckController(),
    new UserManagementController(),
  ]).listen();
});
