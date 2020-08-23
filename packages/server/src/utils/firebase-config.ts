import admin from 'firebase-admin';
import serviceAccount from '../croton-firebase.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

export default admin;
