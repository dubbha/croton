import { NextFunction, Request, Response } from 'express';

import BaseController from '../base-classes/controller';
import UserManagementService from './user-management.service';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import EmailUpdateDto from './email-update.dto';
import RequestWithUser from '../interfaces/request-with-user.interface';
import UserUpdateDto from './user-update.dto';

export default class UserManagementController extends BaseController {
  private userManagementService = new UserManagementService();

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
      const updatedUser = await this.userManagementService.updateEmail(request.body);
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
        request.user.id,
      );
      response.send(updatedUser);
    } catch (error) {
      next(error);
    }
  };
}
