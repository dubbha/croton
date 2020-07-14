import { Request } from 'express';

import User from './user.interface';

export default interface RequestWithUser extends Request {
  user: User;
}