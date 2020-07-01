import { Request, Response, NextFunction } from 'express';

import BaseController from '../base-classes/controller';
import validationMiddleware from '../middlewares/validation.middleware';
import RegistrationDto from './registration.dto';
import LoginDto from './login.dto';
import AuthenticationService from './authentication.service';
import EmailVerificationDto from './email-verification.dto';

export default class AuthenticationController extends BaseController {
  private authenticationService = new AuthenticationService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(
      this.serverApi.authLogin,
      validationMiddleware(LoginDto),
      this.loginHandler
    );
    this.router.post(
      this.serverApi.authRegister,
      validationMiddleware(RegistrationDto),
      this.registrationHandler
    );
    this.router.post(
      `${this.path}/confirm`,
      validationMiddleware(EmailVerificationDto),
      this.emailConfirmHandler
    );
  }

  private emailConfirmHandler = async (
      request: Request,
      response: Response,
      next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.authenticationService.verify(
          request.body.emailVerificationToken
      );
      response.send(user);
    } catch (error) {
      next(error);
    }
  };

  private registrationHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.authenticationService.register(
        request.body,
        request.get('host')
      );
      response.status(204).send();
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
