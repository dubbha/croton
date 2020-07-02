import serverApi from './server';

const auth = `${serverApi.root}${serverApi.auth}`;
const authLogin = `${serverApi.root}${serverApi.authLogin}`;
const authLoginFacebook = `${authLogin}${serverApi.authLoginFacebook}`;
const authLoginGoogle = `${authLogin}${serverApi.authLoginGoogle}`;
const authRegister = `${serverApi.root}${serverApi.authRegister}`;
const healthCheck = `${serverApi.root}${serverApi.healthCheck}`;

export default {
  root: serverApi.root,
  auth,
  authLogin,
  authRegister,
  healthCheck,
  authLoginFacebook,
  authLoginGoogle,
};
