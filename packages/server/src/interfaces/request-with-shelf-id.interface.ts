import { Request } from 'express';

export default interface RequestWithShelfId extends Request {
  shelfId: number;
}
