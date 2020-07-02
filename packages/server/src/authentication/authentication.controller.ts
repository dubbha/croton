import { Request, Response, NextFunction } from 'express';

import BaseController from '../base-classes/controller';
import validationMiddleware from '../middlewares/validation.middleware';
import RegistrationDto from './registration.dto';
import LoginDto from './login.dto';
import AuthenticationService from './authentication.service';

export default class AuthenticationController extends BaseController {
  private authenticationService = new AuthenticationService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(
      this.serverApi.authLogin,
      validationMiddleware(RegistrationDto),
      this.registrationHandler
    );
    this.router.post(
      this.serverApi.authRegister,
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
