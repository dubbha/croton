import { NextFunction, Request, Response } from 'express';

import BaseController from '../base-classes/controller';
import ShelfService from './shelf.service';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import shelfAdminMiddleware from '../middlewares/shelf-admin.middleware';
import ShelfUserInviteDto from './shelf-user-invite.dto';
import RequestWithShelfId from '../interfaces/request-with-shelf-id.interface'

export default class ShelfController extends BaseController {
  private shelfService = new ShelfService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(
      this.serverApi.shelfUserInvite,
      authMiddleware,
      shelfAdminMiddleware,
      validationMiddleware(ShelfUserInviteDto),
      this.userInviteHanlder
    );

    this.router.post(
      this.serverApi.shelfUserInviteAccept,
      this.userInviteAcceptHandler
    );

    this.router.post(
      this.serverApi.shelfUserDelete,
      authMiddleware,
      shelfAdminMiddleware,
      this.userDeleteHandler
    );
  }

  private userInviteHanlder = async (
    request: RequestWithShelfId,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.inviteUser(
        request.body,
        request.headers.origin,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private userInviteAcceptHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.acceptInvitation(
        request.body.shelfInvitationToken,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private userDeleteHandler = async (
    request: RequestWithShelfId,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { shelfId, userId } = request.body;
      await this.shelfService.deleteUser(shelfId, userId)
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
