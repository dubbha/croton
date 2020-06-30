import { Router, Request, Response, NextFunction } from 'express';

import BaseControllerInterface from '../interfaces/base-controller.interface';
import HealthCheckService from './health-check.service';

export default class HealthCheckController implements BaseControllerInterface {
  public path = '/health-check';
  public router = Router();
  private healthCheckService = new HealthCheckService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.healthCheckHandler);
  }

  private healthCheckHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.healthCheckService.check();
      response.send(result);
    } catch (error) {
      next(error);
    }
  };
}
