const root = '/api';
const auth = '/auth';
const authLogin = `${auth}/login`;
const authLoginFacebook = `${auth}/facebook`;
const authLoginFacebookCallback = `${authLoginFacebook}/callback`;
const authLoginFacebookSuccess = `${authLoginFacebook}/success`;
const authLoginFacebookFailure = `${authLoginFacebook}/failure`;
const authRegister = `${auth}/register`;
const authConfirm = `${auth}/confirm`;
const authPasswordReset = `${auth}/password-reset`;
const authPasswordUpdate = `${auth}/password-update`;
const healthCheck = '/health-check';
const getFacebookCallbackURL = (host: string, port: string) =>
  `https://${host}:${port}${root}${authLoginFacebookCallback}`;
const getFacebookSuccessRedirect = (host: string, port: string) =>
  `http://${host}:${port}${root}${authLoginFacebookSuccess}`;
const getFacebookFailureRedirect = (host: string, port: string) =>
  `http://${host}:${port}${root}${authLoginFacebookFailure}`;

export const api = {
  root,
  auth,
  authLogin,
  authRegister,
  healthCheck,
  authLoginFacebook,
  authLoginFacebookCallback,
  getFacebookCallbackURL,
  getFacebookSuccessRedirect,
  getFacebookFailureRedirect,
  authLoginFacebookSuccess,
  authLoginFacebookFailure,
  authConfirm,
  authPasswordReset,
  authPasswordUpdate,
};

export type Api = typeof api;
