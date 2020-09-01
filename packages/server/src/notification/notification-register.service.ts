import User from '../interfaces/user.interface';
import NotificationRegisterDto from './notification-register.dto';
import DBService from '../db/db.service';

export default class NotificationRegisterService {
  private dbService = new DBService();

  async registerNotificationToken({ registrationToken }: NotificationRegisterDto, user: User) {
    await this.dbService.saveRegisterToken(user.id, registrationToken);
  }
}
