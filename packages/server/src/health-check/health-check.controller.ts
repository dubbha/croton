import { Request, Response, NextFunction } from 'express';

import BaseController from '../base-classes/controller';
import HealthCheckService from './health-check.service';

export default class HealthCheckController extends BaseController {
  private healthCheckService = new HealthCheckService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.serverApi.healthCheck, this.healthCheckHandler);
  }

  private healthCheckHandler = async (
    _: Request,
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
