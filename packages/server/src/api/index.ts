const root = '/api';
const auth = '/auth';
const management = '/management';
const shelf = '/shelf';
const authLogin = `${auth}/login`;
const authLoginFacebook = `${auth}/facebook`;
const authLoginGoogle = `${auth}/google`;
const authRegister = `${auth}/register`;
const authConfirm = `${auth}/confirm`;
const authPasswordReset = `${auth}/password-reset`;
const authPasswordUpdate = `${auth}/password-update`;
const userManagementEmailReset = `${management}/email-reset`;
const userManagementEmailUpdate = `${management}/email-update`;
const userManagementUserUpdate = `${management}/user-update`;
const userManagementMergeWithSocial = `${management}/merge-with-social`;
const shelfUserInvite = `${shelf}/user-invite`;
const shelfUserInviteAccept = `${shelf}/user-invite-accept`;
const shelfUserDelete = `${shelf}/user-delete`;
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
  authPasswordReset,
  authPasswordUpdate,
  userManagementEmailReset,
  userManagementEmailUpdate,
  userManagementUserUpdate,
  userManagementMergeWithSocial,
  shelfUserInvite,
  shelfUserInviteAccept,
  shelfUserDelete,
};

export type Api = typeof api;
