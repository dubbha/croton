import { Request, Response, NextFunction } from 'express';

import BaseController from '../base-classes/controller';
import validationMiddleware from '../middlewares/validation.middleware';
import RegistrationDto from '../models/registration.dto';
import LoginDto from '../models/login.dto';
import AuthenticationService from './authentication.service';
import EmailVerificationDto from './email-verification.dto';
import PasswordResetDto from './password-reset.dto';
import PasswordUpdateDto from './password-update.dto';

import ProvidersAuthService from '../providers-auth/providers-auth.service';

export default class AuthenticationController extends BaseController {
  private authenticationService = new AuthenticationService();
  private providersAuthService = new ProvidersAuthService(
    this.authenticationService.login,
    this.authenticationService.register
  );

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
      this.serverApi.authConfirm,
      validationMiddleware(EmailVerificationDto),
      this.emailConfirmHandler
    );

    this.router.post(
      this.serverApi.authPasswordReset,
      validationMiddleware(PasswordResetDto),
      this.passwordResetHandler
    );

    this.router.post(
      this.serverApi.authPasswordUpdate,
      validationMiddleware(PasswordUpdateDto),
      this.passwordUpdateHandler
    );

    this.router.get(
      this.serverApi.authLoginFacebook,
      this.providersAuthService.getAuthenticateFacebookProvider()
    );
    this.router.get(
      this.serverApi.authLoginFacebookCallback,
      this.providersAuthService.getHandleFacebookProviderCallback()
    );
    this.router.get(
      this.serverApi.authLoginFacebookSuccess,
      this.providersAuthService.handleFacebookLoginSuccess
    );
    this.router.get(
      this.serverApi.authLoginFacebookFailure,
      this.providersAuthService.handleFacebookLoginFailure
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
        request.headers.origin
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

  private passwordResetHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.authenticationService.resetPassword(
        request.body.email,
        request.headers.origin
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  private passwordUpdateHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.authenticationService.updatePassword(request.body);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
