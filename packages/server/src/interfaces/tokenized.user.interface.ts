import BaseUser from './user.interface';

export default interface UserWithToken extends BaseUser {
  token: string;
  socialProfile?: {
    pictureUrl: string;
    facebookId?: string;
    googleId?: string;
  };
}
