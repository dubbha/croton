importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js'
);
firebase.initializeApp({
  apiKey: 'AIzaSyBKbZArotbVWIqGfiZCuVXkMLkE8l-Vi3k',
  authDomain: 'croton.firebaseapp.com',
  databaseURL: 'https://croton.firebaseio.com',
  projectId: 'croton',
  storageBucket: 'croton.appspot.com',
  messagingSenderId: '480421853647',
  appId: '1:480421853647:web:ca6ddd696de4a3c555faba',
  measurementId: 'G-6MG7YRG3RD',
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      windowClients.forEach((windowClient) => {
        windowClient.postMessage(payload);
      });
    });
  return promiseChain;
});

messaging.onMessage((payload) => {
  // Customize notification here
  const notificationTitle = 'Notification title';
  const notificationOptions = {
    body: payload.data.alert,
    icon: '',
  };

  const notification = new Notification(notificationTitle, notificationOptions);

  notification.onclick = function(event) {
    notification.close();
    //handle click event onClick on Web Push Notification
  };
});
