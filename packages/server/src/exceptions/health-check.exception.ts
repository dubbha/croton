import HttpException from './http.exception';

export default class HealthCheckException extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}
