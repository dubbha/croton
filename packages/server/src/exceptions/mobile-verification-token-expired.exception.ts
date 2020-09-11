import HttpException from './http.exception';

export default class MobileVerificationTokenExpired extends HttpException {
  constructor() {
    super(400, 'Mobile verification code expired');
  }
}
