import BaseUser from './user.interface';

export default interface User extends BaseUser {
  password: string;
  status: string;
  facebookId?: string;
}
