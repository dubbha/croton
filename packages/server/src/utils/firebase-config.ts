import admin from 'firebase-admin';
import fs from 'fs';

const { HOME } = process.env;
const fileName = 'croton-firebase-credential.json';

fs.readFile(`${HOME}/${fileName}`, (loadError, data) => {
  if (loadError) {
    console.log(
      `You got following error while loading the ${fileName} file`,
      loadError,
      'You probably need to create a correspondent file in the HOME dir'
    );
    return;
  }
  try {
    const firebaseAdminCredentialCert = JSON.parse(data.toString('utf-8'));
    console.log(firebaseAdminCredentialCert);
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminCredentialCert as any),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  } catch (parseError) {
    console.log(
      `You got following error while parsing the ${fileName} file`,
      parseError
    );
  }
});

export default admin;
