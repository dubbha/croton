import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';

import BaseControllerInterface from '../interfaces/base-controller.interface';
import errorMiddleware from '../middlewares/error.middleware';

const binaryMimeTypes = [
  'application/octet-stream',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];

export default class App {
  private app: express.Application;

  constructor(controllers: BaseControllerInterface[]) {
    this.app = express();

    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    return this;
  }

  public listen(): void {
    const { PORT = 3000 } = process.env;
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }

  public generateLambdaHandler(event: APIGatewayProxyEvent, context: Context) {
    const app = this.app;
    return proxy(createServer(app, null, binaryMimeTypes), event, context);
  }

  private initializeMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(morgan('combined'));
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: BaseControllerInterface[]): void {
    controllers.forEach((controller: BaseControllerInterface) => {
      this.app.use('/api', controller.router);
    });
  }
}
