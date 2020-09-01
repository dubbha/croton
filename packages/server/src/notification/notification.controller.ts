import BaseController from '../base-classes/controller';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import RequestWithUser from '../interfaces/request-with-user.interface';
import { NextFunction, Response } from 'express';
import NotificationRegisterDto from './notification-register.dto';
import NotificationRegisterService from './notification-register.service';

export default class NotificationController extends BaseController {
  private notificationRegisterService = new NotificationRegisterService();

  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(
      this.serverApi.notificationRegister,
      validationMiddleware(NotificationRegisterDto),
      authMiddleware,
      this.notificationRegisterHandler
    );
  }

  private notificationRegisterHandler = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.notificationRegisterService.registerNotificationToken(
        request.body,
        request.user
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
