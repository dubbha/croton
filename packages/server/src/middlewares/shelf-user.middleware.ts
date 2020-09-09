import { NextFunction, Response } from 'express';

import RequestWithShelfId from '../interfaces/request-with-shelf-id.interface';
import RequestWithId from '../interfaces/request-with-id.interface';

import DBService from '../db/db.service';

import { verifyToken } from '../utils/verify-token';
import ShelfUserForbidden from '../exceptions/shelf-user-forbidden.exception';

export default async function shelfUserMiddleware(
  request: RequestWithShelfId | RequestWithId,
  response: Response,
  next: NextFunction
) {
  try {
    const { body: { flowerId } } = request;
    const { id } = verifyToken(request.headers.authorization);

    const dbService = new DBService();
    const flower = await dbService.getFlowerById(flowerId);
    const userRelatedToShelf = await new DBService().getUserToShelf(id, flower.shelf.id);

    if (userRelatedToShelf) {
      next()
    } else {
      next(new ShelfUserForbidden());
    }
  } catch (error) {
    next(new ShelfUserForbidden());
  }
}
