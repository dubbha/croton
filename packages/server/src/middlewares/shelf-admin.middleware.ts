import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import RequestWithShelfId from '../interfaces/request-with-shelf-id.interface';
import ShelfAdministrationForbidden from '../exceptions/shelf-administration-forbidden.exception';
import DataStoredInToken from '../interfaces/data-stored-in-token.interface';

import DBService from '../db/db.service';

export default async function shelfAdminMiddleware(
  request: RequestWithShelfId,
  response: Response,
  next: NextFunction
) {
  try {
    const { body: { shelfId } } = request;

    const verificationResponse = jwt.verify(
      request.headers.authorization,
      process.env.JWT_SECRET
    ) as DataStoredInToken;
    const { id } = verificationResponse;

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
