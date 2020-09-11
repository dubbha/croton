import { NextFunction, Request, Response } from 'express';

import BaseController from '../base-classes/controller';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import RequestWithUser from '../interfaces/request-with-user.interface';
import ProvidersAuthService from '../providers-auth/providers-auth.service';
import UserWithToken from '../interfaces/tokenized.user.interface';

import UserManagementService from './user-management.service';
import EmailUpdateDto from './email-update.dto';
import UserUpdateDto from './user-update.dto';

export default class UserManagementController extends BaseController {
  private userManagementService = new UserManagementService();
  private providersAuthService = new ProvidersAuthService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(
      this.serverApi.userManagementEmailReset,
      authMiddleware,
      this.emailResetHandler
    );

    this.router.post(
      this.serverApi.userManagementEmailUpdate,
      validationMiddleware(EmailUpdateDto),
      this.emailUpdateHandler
    );

    this.router.post(
      this.serverApi.userManagementUserUpdate,
      authMiddleware,
      validationMiddleware(UserUpdateDto),
      this.userUpdateHandler
    );

    this.router.post(
      this.serverApi.userManagementAddFacebook,
      this.providersAuthService.verifyFacebookLogin,
      this.mergeUserProfilesHandler
    );

    this.router.post(
      this.serverApi.userManagementAddGoogle,
      this.providersAuthService.verifyGoogleLogin,
      this.mergeUserProfilesHandler
    );

    this.router.get(
      this.serverApi.userManagementShelfInvites,
      authMiddleware,
      this.userManagementShelfInvitesHandler
    );
  }

  private emailResetHandler = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.userManagementService.resetEmail(
        request.user.id,
        request.headers.origin
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  private emailUpdateHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const updatedUser = await this.userManagementService.updateEmail(
        request.body
      );
      response.send(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  private userUpdateHandler = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const updatedUser = await this.userManagementService.updateUser(
        request.body,
        request.user.id
      );
      response.send(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  private mergeUserProfilesHandler = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const mergedUser = await this.userManagementService.mergeUserWithSocial(
        request.user as UserWithToken,
        request.body.email
      );
      response.send(mergedUser);
    } catch (error) {
      next(error);
    }
  };

  private userManagementShelfInvitesHandler = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const shelfInvites = await this.userManagementService.getUserShelfInvites(
        request.user.email
      );
      response.send(shelfInvites);
    } catch (error) {
      next(error);
    }
  };
}
