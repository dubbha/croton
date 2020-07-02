import { Router } from 'express';

import serverApi from 'core/api/server';

import BaseControllerInterface from '../interfaces/base-controller.interface';

export default abstract class BaseController
  implements BaseControllerInterface {
  public router = Router();
  public serverApi = serverApi;

  constructor() {
    this.initializeRoutes();
  }

  abstract initializeRoutes(): void;
}
