import UserEntity from '../models/user.entity';
import UserWithToken from '../interfaces/tokenized.user.interface';

import { createToken } from './create-token';

export function createTokenizedUser(user: UserEntity): UserWithToken {
  const { token } = createToken(user);
  const { id, firstName, lastName, email, socialProfile } = user;
  const userWithToken = {
    id,
    firstName,
    lastName,
    email,
    token,
  };
  if (!socialProfile) {
    return userWithToken;
  }
  return { ...userWithToken, socialProfile };
}
