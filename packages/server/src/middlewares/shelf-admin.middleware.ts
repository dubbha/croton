import { NextFunction, Response } from 'express';

import RequestWithShelfId from '../interfaces/request-with-shelf-id.interface';
import RequestWithId from '../interfaces/request-with-id.interface';
import ShelfAdministrationForbidden from '../exceptions/shelf-administration-forbidden.exception';

import DBService from '../db/db.service';

import { verifyToken } from '../utils/verify-token';

export default async function shelfAdminMiddleware(
  request: RequestWithShelfId | RequestWithId,
  response: Response,
  next: NextFunction
) {
  try {
    const { body } = request;
    const shelfId = body.shelfId || body.id;

    const { id } = verifyToken(request.headers.authorization);

    const userToShelf = await new DBService().getUserToShelf(id, shelfId);

    if (userToShelf && userToShelf.isAdmin) {
      next()
    } else {
      next(new ShelfAdministrationForbidden());
    }
  } catch (error) {
    next(new ShelfAdministrationForbidden());
  }
}
