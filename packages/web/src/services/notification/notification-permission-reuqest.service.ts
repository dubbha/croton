import { messaging } from 'config';

export const notificationPermissionRequest = () => {
  return messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .catch(err => {
      console.log('Unable to get permission to notify.', err);
    });
};
