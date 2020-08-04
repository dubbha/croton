import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import RequestWithUser from '../interfaces/request-with-user.interface';
import DataStoredInToken from '../interfaces/data-stored-in-token.interface';

import WrongAuthenticationToken from '../exceptions/wrong-authentication-token.exception';
import AuthenticationTokenMissing from '../exceptions/authentication-token-missing';

import DBService from '../db/db.service';

export default async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const headers = request.headers;
  if (headers && headers.authorization) {
    try {
      const verificationResponse = jwt.verify(
        headers.authorization,
        process.env.JWT_SECRET
      ) as DataStoredInToken;
      const { id } = verificationResponse;
      const user = await new DBService().getUserById(id);

      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationToken());
      }
    } catch (error) {
      next(new WrongAuthenticationToken());
    }
  } else {
    next(new AuthenticationTokenMissing());
  }
}
