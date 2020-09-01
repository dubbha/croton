import App from './app/app';
import createPostgresConnection from './utils/createPostgresConnection';

import AuthenticationController from './authentication/authentication.controller';
import HealthCheckController from './health-check/health-check.controller';
import UserManagementController from './user-management/user-management.controller';
import ShelfController from './shelf/shelf.controller';
import NotificationController from './notification/notification.controller';
import InternalController from './internal/internal.controller';

createPostgresConnection().then(() => {
  new App([
    new AuthenticationController(),
    new HealthCheckController(),
    new UserManagementController(),
    new ShelfController(),
    new NotificationController(),
    new InternalController(),
  ]).listen();
});
