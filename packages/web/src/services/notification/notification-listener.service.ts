export const notificationListener = () => {
  navigator.serviceWorker.addEventListener('message', message => {
    navigator.serviceWorker.ready.then(serviceWorker => {
      console.log(message);
      const { title, body } = message.data.notification;
      serviceWorker.showNotification(title, { body });
    });
  });
};
