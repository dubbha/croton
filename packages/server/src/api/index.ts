const root = '/api';
const auth = '/auth';
const management = '/management';
const shelf = '/shelf';
const notification = '/notification';
const internal = '/internal';
const authLogin = `${auth}/login`;
const authLoginFacebook = `${auth}/facebook`;
const authLoginGoogle = `${auth}/google`;
const authRegister = `${auth}/register`;
const authMobileRegister = `${auth}/mobile-register`;
const authConfirm = `${auth}/confirm`;
const authMobileConfirm = `${auth}/mobile-confirm`;
const authPasswordReset = `${auth}/password-reset`;
const authPasswordUpdate = `${auth}/password-update`;
const userManagementEmailReset = `${management}/email-reset`;
const userManagementEmailUpdate = `${management}/email-update`;
const userManagementUserUpdate = `${management}/user-update`;
const userManagementMergeWithSocial = `${management}/merge-with-social`;
const userManagementAddFacebook = `${management}/add-facebook`;
const userManagementAddGoogle = `${management}/add-google`;
const userManagementShelfInvites = `${management}/user-invites`;
const shelfUserInvite = `${shelf}/user-invite`;
const shelfPendingInvites = `${shelf}/pending-invites`;
const shelfRevokeInvite = `${shelf}/revoke-invite`;
const shelfUserInviteAccept = `${shelf}/user-invite-accept`;
const shelfUserDelete = `${shelf}/user-delete`;
const shelfGetUsers = `${shelf}/get-users`;
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
const notificationRegister = `${notification}/register`;
const internalNotification = `${internal}/notification`;
const healthCheck = '/health-check';

export const api = {
  root,
  auth,
  authLogin,
  authRegister,
  authMobileRegister,
  authLoginFacebook,
  authLoginGoogle,
  authConfirm,
  authMobileConfirm,
  authPasswordReset,
  authPasswordUpdate,
  userManagementEmailReset,
  userManagementEmailUpdate,
  userManagementUserUpdate,
  userManagementMergeWithSocial,
  userManagementAddFacebook,
  userManagementAddGoogle,
  userManagementShelfInvites,
  shelfUserInvite,
  shelfPendingInvites,
  shelfRevokeInvite,
  shelfUserInviteAccept,
  shelfUserDelete,
  shelfGetUsers,
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
  notificationRegister,
  internalNotification,
};

export type Api = typeof api;
