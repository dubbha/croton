import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/http.exception';

export default function validationMiddleware<T>(
  type,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length) {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      }
      );
  };
}
