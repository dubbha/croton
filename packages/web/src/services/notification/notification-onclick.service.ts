import { messaging } from '../../config';

export const waitForNotificationClicked = () =>
  new Promise((resolve, reject) => {
    try {
      if (!messaging) {
        return;
      }
      messaging.onMessage(payload => {
        const notificationTitle = payload.title;
        const notificationOptions = {
          body: payload.data,
          tag: payload.tag,
        };

        const notification = new Notification(
          notificationTitle,
          notificationOptions
        );

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
