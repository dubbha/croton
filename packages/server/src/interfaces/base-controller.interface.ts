import { Router } from 'express';
import { Api } from 'core/api/interfaces';

export default interface BaseController {
  router: Router;
  serverApi: Api;
  initializeRoutes(): void;
}
