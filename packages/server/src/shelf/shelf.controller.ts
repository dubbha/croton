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

    this.router.post(
      this.serverApi.shelfAddShelf,
      authMiddleware,
      this.addShelfHandler
    );

    this.router.post(
      this.serverApi.shelfEditShelf,
      authMiddleware,
      shelfAdminMiddleware,
      this.editShelfHandler
    );

    this.router.post(
      this.serverApi.shelfDeleteShelf,
      authMiddleware,
      shelfAdminMiddleware,
      this.deleteShelfHandler
    );

    this.router.post(
      this.serverApi.shelfGetShelves,
      authMiddleware,
      this.getShelvesHandler
    );

    this.router.post(
      this.serverApi.shelfAddFlower,
      authMiddleware,
      shelfAdminMiddleware,
      this.addFlowerHandler
    );

    this.router.post(
      this.serverApi.shelfEditFlower,
      authMiddleware,
      shelfAdminMiddleware,
      this.editFlowerHandler
    );

    this.router.post(
      this.serverApi.shelfDeleteFlower,
      authMiddleware,
      shelfAdminMiddleware,
      this.deleteFlowerHandler
    );

    this.router.post(
      this.serverApi.shelfGetFlowers,
      authMiddleware,
      this.getFlowersHandler
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

  private addShelfHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.addShelf(
        request.body,
        request.headers.authorization,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private editShelfHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.editShelf(request.body);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private deleteShelfHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.deleteShelf(request.body.id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private getShelvesHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const shelves = await this.shelfService.getShelves(request.headers.authorization);
      response.status(200).send(shelves);
    } catch (error) {
      next(error);
    }
  }

  private addFlowerHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.addFlower(request.body);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private editFlowerHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.editFlower(request.body);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private deleteFlowerHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.shelfService.deleteFlower(request.body.id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private getFlowersHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const flowers = await this.shelfService.getFlowers(request.body.shelfId);
      response.status(200).send(flowers);
    } catch (error) {
      next(error);
    }
  }
}
