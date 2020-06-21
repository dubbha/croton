import {createServer, proxy} from 'aws-serverless-express';
import {APIGatewayProxyEvent, Context} from 'aws-lambda';

import runApp from './app/runApp';

const handler = (event: APIGatewayProxyEvent, context: Context) =>
  proxy(createServer(runApp), event, context);

export {handler};
