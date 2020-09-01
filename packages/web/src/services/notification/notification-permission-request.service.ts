import { messaging } from '../../config';

export const notificationPermissionRequest = () => {
  if (!messaging) {
    return null;
  }
  return messaging
    .requestPermission()
    .then(() => {
      if (!messaging) {
        return null;
      }
      return messaging.getToken();
    })
    .catch(err => {
      console.log('Unable to get permission to notify.', err);
    });
};
