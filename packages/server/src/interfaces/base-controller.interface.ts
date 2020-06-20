import {Router} from 'express';

export default interface BaseController {
  path: string;
  router: Router;
}
