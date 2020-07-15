const root = '/api';
const auth = '/auth';
const authLogin = `${auth}/login`;
const authLoginFacebook = `${auth}/facebook`;
const authRegister = `${auth}/register`;
const authConfirm = `${auth}/confirm`;
const authPasswordReset = `${auth}/password-reset`;
const authPasswordUpdate = `${auth}/password-update`;
const healthCheck = '/health-check';

export const api = {
  root,
  auth,
  authLogin,
  authRegister,
  healthCheck,
  authLoginFacebook,
  authConfirm,
  authPasswordReset,
  authPasswordUpdate,
};

export type Api = typeof api;
