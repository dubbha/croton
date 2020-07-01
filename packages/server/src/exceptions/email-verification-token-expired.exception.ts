import HttpException from './http.exception';

export default class EmailVerificationTokenExpired extends HttpException {
  constructor() {
    super(400, 'Email verification token expired');
  }
}
