import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import App from './app/app';
import createPostgresConnection from './utils/createPostgresConnection';

import AuthenticationController from './authentication/authentication.controller';
import HealthCheckController from './health-check/health-check.controller';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  await createPostgresConnection();
  return new App([
    new AuthenticationController(),
    new HealthCheckController(),
  ]).generateLambdaHandler(event, context);
};
