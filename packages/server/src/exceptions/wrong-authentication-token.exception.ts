import HttpException from './http.exception';

export default class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}
