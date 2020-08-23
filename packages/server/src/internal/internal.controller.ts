import BaseController from '../base-classes/controller';
import RequestWithUser from '../interfaces/request-with-user.interface';
import { NextFunction, Response } from 'express';
import NotificationService from '../services/notification.service';

export default class InternalController extends BaseController {
  private notificationRegisterService = new NotificationService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(
      this.serverApi.internalNotification,
      this.internalNotificationHandler
    );
  }

  private internalNotificationHandler = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.notificationRegisterService.sendTestNotification(request.body.tokens);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
