import {NextFunction, Request, Response} from 'express';
import HttpException from '../exceptions/http.exception';

export default function errorMiddleware(
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong ¯\\_(ツ)_/¯';

    response.status(status).send({status, message});
}
