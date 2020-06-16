import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import BaseControllerInterface from './interfaces/base-controller.interface';
import errorMiddleware from './middlewares/error.middleware';

export default class App {
  private app: express.Application;

  constructor(controllers: BaseControllerInterface[]) {
    this.app = express();

    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen(): void {
    const { PORT } = process.env;
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
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
