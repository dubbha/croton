import admin from '../utils/firebase-config';
import NotificationSendException from '../exceptions/notification-send.exception';
import { createMobileActivationNotification } from '../utils/create-mobile-activation-notification';

const notificationOptions = {
  priority: 'high'
};

export default class NotificationService {
  private async sendNotification(registrationTokens: string | string[], message): Promise<void> {
    try {
      await admin.messaging().sendToDevice(registrationTokens, message, notificationOptions);
    } catch (error) {
      console.log(error);
      throw new NotificationSendException(error);
    }
  }

  public async sendTestNotification(registrationTokens: string[]) {
    const message_notification = {
      notification: {
        title: 'Test notification title',
        body: 'test notification message'
      }
    };
    await this.sendNotification(registrationTokens, message_notification);
  }

  public async sendNotificationWithOptions(
    registrationTokens: string | string[],
    body,
    title,
    options
  ) {
    const notification = {
      title,
      body,
      ...options
    };
    await this.sendNotification(registrationTokens, { notification });
  }

  public async sendMobileActivationMessage(
    mobileVerificationToken: string,
    registrationToken: string
  ) {
    await this.sendNotificationWithOptions(
      registrationToken,
      createMobileActivationNotification(mobileVerificationToken),
      'Croton mobile registration notification',
      {}
    )
  }
}
