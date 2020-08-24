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
const userManagementAddFacebook = `${management}/add-facebook`;
const userManagementAddGoogle = `${management}/add-google`;
const shelfUserInvite = `${shelf}/user-invite`;
const shelfUserInviteAccept = `${shelf}/user-invite-accept`;
const shelfUserDelete = `${shelf}/user-delete`;
const shelfAddShelf = `${shelf}/add-shelf`;
const shelfEditShelf = `${shelf}/edit-shelf`;
const shelfDeleteShelf = `${shelf}/delete-shelf`;
const shelfGetShelves = `${shelf}/get-shelves`;
const shelfAddFlower = `${shelf}/add-flower`;
const shelfEditFlower = `${shelf}/edit-flower`;
const shelfDeleteFlower = `${shelf}/delete-flower`;
const shelfGetFlowers = `${shelf}/get-flowers`;
const shelfGetFlower = `${shelf}/get-flower`;
const shelfAction = `${shelf}/action`;
const shelfGetLastActions = `${shelf}/get-last-actions`;
const healthCheck = '/health-check';

export const api = {
  root,
  auth,
  authLogin,
  authRegister,
  authLoginFacebook,
  authLoginGoogle,
  authConfirm,
  authPasswordReset,
  authPasswordUpdate,
  userManagementEmailReset,
  userManagementEmailUpdate,
  userManagementUserUpdate,
  userManagementMergeWithSocial,
  userManagementAddFacebook,
  userManagementAddGoogle,
  shelfUserInvite,
  shelfUserInviteAccept,
  shelfUserDelete,
  shelfAddShelf,
  shelfEditShelf,
  shelfDeleteShelf,
  shelfGetShelves,
  shelfAddFlower,
  shelfEditFlower,
  shelfDeleteFlower,
  shelfGetFlowers,
  shelfGetFlower,
  shelfAction,
  shelfGetLastActions,
  healthCheck,
};

export type Api = typeof api;
