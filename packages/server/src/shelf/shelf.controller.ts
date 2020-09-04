import { NextFunction, Request, Response } from 'express';

import BaseController from '../base-classes/controller';
import ShelfService from './shelf.service';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import shelfAdminMiddleware from '../middlewares/shelf-admin.middleware';
import ShelfUserInviteDto from './shelf-user-invite.dto';
import RequestWithShelfId from '../interfaces/request-with-shelf-id.interface'
import ShelfGetPendingInvitesDto from './shelf-get-pending-invites.dto';
import ShelfRevokeInviteDto from './shelf-revoke-invite.dto';
import { QueryParams } from '../constants/query-params';

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
      this.userInviteHandler
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

    this.router.get(
      this.serverApi.shelfGetUsers,
      authMiddleware,
      this.getUsersHandler
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

    this.router.post(
      this.serverApi.shelfGetFlower,
      authMiddleware,
      this.getFlowerHandler
    );

    this.router.post(
      this.serverApi.shelfAction,
      authMiddleware,
      this.actionHanlder
    );

    this.router.post(
      this.serverApi.shelfGetLastActions,
      authMiddleware,
      this.getLastActionsHandler
    );

    this.router.get(
      this.serverApi.shelfGetActions,
      authMiddleware,
      this.getActionsHanlder,
    );

    this.router.post(
      this.serverApi.shelfPendingInvites,
      authMiddleware,
      validationMiddleware(ShelfGetPendingInvitesDto),
      shelfAdminMiddleware,
      this.userPendingInvitesHandler
    );

    this.router.delete(
      this.serverApi.shelfRevokeInvite,
      authMiddleware,
      validationMiddleware(ShelfRevokeInviteDto),
      shelfAdminMiddleware,
      this.shelfRevokeInviteHandler
    );
  }

  private userInviteHandler = async (
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
      await this.shelfService.deleteUser(shelfId, userId);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private getUsersHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.shelfService.getShelfUsers(
        Number(request.query[QueryParams.SHELF_ID])
      );
      response.send(users);
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

  private getFlowerHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const flowers = await this.shelfService.getFlowerById(request.body.id);
      response.status(200).send(flowers);
    } catch (error) {
      next(error);
    }
  }

  private actionHanlder = async(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const flowers = await this.shelfService.addAction(
        request.body,
        request.headers.authorization,
      );
      response.status(200).send(flowers);
    } catch (error) {
      next(error);
    }
  }

  private getLastActionsHandler = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const lastActions = await this.shelfService.getLastActions(
        request.body.flowerId,
      );
      response.status(200).send(lastActions);
    } catch (error) {
      next(error);
    }
  }

  private getActionsHanlder = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const actions = await this.shelfService.getActions(
        parseInt(request.query.flowerId as string, 10),
      );
      response.status(200).send(actions);
    } catch (error) {
      next(error);
    }
  }

  private userPendingInvitesHandler = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const pendingInvites = await this.shelfService.getPendingInvites(
        request.body.shelfId
      );
      response.send(pendingInvites);
    } catch (error) {
      next(error);
    }
  }

  private shelfRevokeInviteHandler = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      await this.shelfService.revokeInvite(
        request.body.inviteId
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
