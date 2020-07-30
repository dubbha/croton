import { Router } from 'express';

import { api } from '../api';

import BaseControllerInterface from '../interfaces/base-controller.interface';

export default abstract class BaseController implements BaseControllerInterface {
  public router = Router();
  public serverApi = api;
  abstract initializeRoutes(): void;
}
