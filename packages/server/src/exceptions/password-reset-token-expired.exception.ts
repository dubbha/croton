import HttpException from './http.exception';

export default class PasswordResetTokenExpired extends HttpException {
  constructor() {
    super(400, 'Password reset token expired');
  }
}
