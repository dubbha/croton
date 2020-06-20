import {Router, Request, Response, NextFunction} from 'express';

import BaseControllerInterface from '../interfaces/base-controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import RegistrationDto from './registration.dto';
import LoginDto from './login.dto';
import AuthenticationService from './authentication.service';

export default class AuthenticationController
  implements BaseControllerInterface {
  public path = '/auth';
  public router = Router();
  private authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegistrationDto),
      this.registrationHandler
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto),
      this.loginHandler
    );
  }

  private registrationHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newUserWithToken = await this.authenticationService.register(
        request.body
      );
      response.send(newUserWithToken);
    } catch (error) {
      next(error);
    }
  };

  private loginHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userWithToken = await this.authenticationService.login(
        request.body
      );
      response.send(userWithToken);
    } catch (error) {
      next(error);
    }
  };
}
