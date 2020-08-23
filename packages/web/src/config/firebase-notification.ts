import * as firebase from 'firebase/app';
import 'firebase/messaging';

const initializedFirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBKbZArotbVWIqGfiZCuVXkMLkE8l-Vi3k',
  authDomain: 'croton.firebaseapp.com',
  databaseURL: 'https://croton.firebaseio.com',
  projectId: 'croton',
  storageBucket: 'croton.appspot.com',
  messagingSenderId: '480421853647',
  appId: '1:480421853647:web:ca6ddd696de4a3c555faba',
  measurementId: 'G-6MG7YRG3RD'
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  'BJf6pLUPJm5CCtZkm0oOd3iJ4Un2Tb0gtY_ZsFeDsP0E4BQ06MLz780vg-7qOCWLooovhw21G7xQ1osZt2RamAc'
);

export { messaging };
