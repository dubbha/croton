import HttpException from './http.exception';

export default class WrongPasswordResetToken extends HttpException {
  constructor() {
    super(404, 'Wrong password reset token');
  }
}
