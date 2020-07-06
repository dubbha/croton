const root = '/api';
const auth = '/auth';
const authLogin = `${auth}/login`;
const authLoginFacebook = '/facebook';
const authLoginGoogle = '/google';
const authRegister = `${auth}/register`;
const authConfirm = `${auth}/confirm`;
const healthCheck = '/health-check';

export const api = {
  root,
  auth,
  authLogin,
  authRegister,
  healthCheck,
  authLoginFacebook,
  authLoginGoogle,
  authConfirm,
};

export type Api = typeof api;
