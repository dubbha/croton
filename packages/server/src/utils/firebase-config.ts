import admin from 'firebase-admin';

const {
  // FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  // FIREBASE_AUTH_URI,
  // FIREBASE_TOKEN_URI,
  // FIREBASE_AUTH_PROVIDER_x509_CERT_URL,
  // FIREBASE_CLIENT_x509_CERT_URL,
  FIREBASE_DATABASE_URL,
} = process.env;

// const serviceAccount = {
//   type: 'service_account',
//   project_id: 'croton',
//   private_key_id: FIREBASE_PRIVATE_KEY_ID,
//   private_key: FIREBASE_PRIVATE_KEY,
//   client_email: FIREBASE_CLIENT_EMAIL,
//   client_id: FIREBASE_CLIENT_ID,
//   auth_uri: FIREBASE_AUTH_URI,
//   token_uri: FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_x509_CERT_URL,
//   client_x509_cert_url: FIREBASE_CLIENT_x509_CERT_URL,
// };

const serviceAccount = {
  projectId: FIREBASE_CLIENT_ID,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  privateKey: FIREBASE_PRIVATE_KEY,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL,
});

export default admin;

/**
 * GOOGLE_CLIENT_ID=373954817067-pn8ulb3hibr00v0rov63oip2mpa90beg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=sMHgEndiXGqqX89zSP3q8dDB

FIREBASE_PRIVATE_KEY_ID=1552c544764120065a778e2d2de6c15511a5540a
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2RHjKOw+mcdJ6\nGHmjMAJa/LCcEVIokWUpQwX3vKHJRlQpsg19U1wARBwtVpKkDRCusM5Vxk9OOEl4\n/J4p5P9ogTmHOJoIREWfsS2i/dnhv301jAAOh42UqJR/ciG0sMKkVCc5XaJbG298\nhPH6DUMD3WekDXZum2NH+EsNxe4empFiUA/2KtY2FacKF/+GaSfvDoG8qFl+ry8J\nlXY6lk/CF6TY3TR0COsYiFB3IpGQdCSvDpAj6+7Pzb+s8wlE6zGrlXMRPlypvnAY\n4vZHmFcji/BmxD3PwV4Q3P6HDNKkZ3gYmomsulosBHEpKyxeDYC1N51HjXHvNRso\n6yhpR+kFAgMBAAECggEABTw6FaGffV9TasSKs+GpuP19QNJXit5C6q3n5+SAEiUG\nFFeD/yz2iB8XXxms5xo6ooXmEKfRoynHOdApu9gob5Lso9dqnIuszfLbyyIhphQR\nujNt/1Isl8/wH1QC0gA/av3BeFVEl/uAVtzbtXFi6CNtz2lqlNqQ6LeMnQCUf8ZS\nK/cxjI38QCb2K/Hw6OXeAhooG/7vxNzBWLjzxpW94CK4YyHcdeFKF6EYZwHXN8FY\n6QzCCnm4MEn2LlN1+nnsGatxaQP4GTWakT83CZy0NR3QAZ8M0kGNVxvxs3j3I/zR\nDSji0K8XC1gmTdMHeoVTle7FFFyxEd6UO5Oby5yPcQKBgQDrNL2dUe6cOnKLvO9i\ndvriwb+aKxM8c7PPYeUahmYhLJHSHnWdiOvjW+qJQqkj+B52qVOZlYgOeH9eLYCJ\nc9aL9VBusYBt6oQdbcMScDsr1Vqsi2AWQlz0QJWrHPPUECrz8k9ZNTO6QEd8ydEN\nbcdGbdEewLKAAUDB7uiLgETm9QKBgQDGYZvOjVC7S75aM1xhJ047wIvQJTjN91x9\nxQvCOl4y+auapmzEdJUEE3JP3c0F+ecMM6yDORjRjObkd7XSKL5B1WJNSNTvL/aS\nJz0XH6tYgMTH3GF/wqbSmUlVvNnSDuvggUh78jfLr7FC757ZFjiLrqbgBH1Mfn9S\nasCMRCMP0QKBgQDfyT979p+Tr5yazfnp8pCEvZliwwc7Zk63y0njceqsN67Kf8ai\nS8s8eJDvZihuG75IYpUzNO3N7uIophx9K2T/pzmPCH3Mlux635tR6MyzyPzL3JRg\nuWWd0/FTbGml5HgpwOu0UgVUeaJK3e5023VV0li87NUpK4gEvR4u1K06HQKBgQCT\nkRwDI5+AEzG/iyEWq9RIIkxeQrHklDJa4+6BRkW4CXybB101LbuDUqvfuQ+/eEtk\nCjQzUI+joPpHzLyVXfVYp0/+SUULv1PdGA8bWlVs+ixmtwpXrQXG9ntUqawl0y+m\nysSOXnkerMxhDDnPJfZeAUbksLI76oTvW7VrIWwrYQKBgADD/KAg7O5hq2zktEEJ\njWT7nSq2T8dkcoki8B10aMzb0WnMzCg3iPdWo50voYkQwmC7EupZzONfSyfa/BLZ\nDtEfSyPtE0zbdabGdtG77WbPBulBrVqL6r5vUCOVNxzZrhgiCR/cTT5q4pjb4FpU\nOlj1d5698URzb97SJBbOGvFj\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=adminsdk-8usz3@croton.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=107545217408436999063
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_x509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_x509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8usz3%40croton.iam.gserviceaccount.com"
FIREBASE_DATABASE_URL=https://croton.firebaseio.com
 */
