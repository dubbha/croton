import jwt from 'jsonwebtoken';
import DataStoredInToken from '../interfaces/data-stored-in-token.interface';

export function verifyToken(token: string): DataStoredInToken {
  return jwt.verify(
    token,
    process.env.JWT_SECRET
  ) as DataStoredInToken;
}
