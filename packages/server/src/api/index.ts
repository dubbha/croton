const root = '/api';
const auth = '/auth';
const management = '/management';
const authLogin = `${auth}/login`;
const authLoginFacebook = `${auth}/facebook`;
const authRegister = `${auth}/register`;
const authConfirm = `${auth}/confirm`;
const authPasswordReset = `${auth}/password-reset`;
const authPasswordUpdate = `${auth}/password-update`;
const userManagementEmailReset = `${management}/email-reset`;
const userManagementEmailUpdate = `${management}/email-update`;
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
  userManagementEmailReset,
  userManagementEmailUpdate
};

export type Api = typeof api;
