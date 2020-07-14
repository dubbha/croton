import UserEntity from '../models/user.entity';
import UserWithToken from '../interfaces/tokenized.user.interface';
import { createToken } from './create-token';

export function loginUser(user: UserEntity): UserWithToken {
  const tokenData = createToken(user);

  return {
    id: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    status: user.status,
    token: tokenData.token
  };
}