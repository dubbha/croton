import { Router, Request, Response, NextFunction } from 'express';

import BaseControllerInterface from '../interfaces/base-controller.interface';
import BaseController from '../base-classes/controller';
import HealthCheckService from './health-check.service';

export default class HealthCheckController extends BaseController
  implements BaseControllerInterface {
  private healthCheckService = new HealthCheckService();

  constructor() {
    super();
  }

  initializeRoutes(): void {
    this.router.get(this.serverApi.healthCheck, this.healthCheckHandler);
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
