import UserEntity from '../models/user.entity';
import UserWithToken from '../interfaces/tokenized.user.interface';

import { createToken } from './create-token';

export function createTokenizedUser(user: UserEntity): UserWithToken {
  const tokenData = createToken(user);
  const { id, firstName, lastName, email } = user;
  return {
    id,
    firstName,
    lastName,
    email,
    token: tokenData.token,
  };
}
