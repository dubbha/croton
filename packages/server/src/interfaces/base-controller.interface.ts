import { Router } from 'express';
import { Api } from '../api';

export default interface BaseController {
  router: Router;
  serverApi: Api;
  initializeRoutes(): void;
}
