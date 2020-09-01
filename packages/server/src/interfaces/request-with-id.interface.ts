import { Request } from 'express';

export default interface RequestWithId extends Request {
  id: number;
}
