import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import { api } from '../api';

import BaseControllerInterface from '../interfaces/base-controller.interface';
import errorMiddleware from '../middlewares/error.middleware';
import ServerService from '../services/server.service';

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
    new ServerService().initServer(this.app);
  }

  private initializeMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(morgan('combined'));
    this.app.use(passport.initialize());
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: BaseControllerInterface[]): void {
    controllers.forEach((controller: BaseControllerInterface) => {
      this.app.use(api.root, controller.router);
    });
  }
}
