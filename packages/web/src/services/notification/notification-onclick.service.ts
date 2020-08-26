import { messaging } from 'config';

export const waitForNotificationClicked = () =>
  new Promise((resolve, reject) => {
    try {
      if (!messaging) {
        return;
      }
      messaging.onMessage(payload => {
        const { body, title } = payload.notification;
        const notification = new Notification(title, { body });

        notification.onclick = event => {
          console.log('The event on clicking', event);
          notification.close();
          resolve(payload);
        };
      });
    } catch (err) {
      reject(err);
    }
  });
