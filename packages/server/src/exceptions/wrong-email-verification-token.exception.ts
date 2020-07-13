import HttpException from './http.exception';

export default class WrongEmailVerificationToken extends HttpException {
  constructor() {
    super(404, 'Wrong email verification token');
  }
}
