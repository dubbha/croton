import HttpException from './http.exception';

export default class WrongMobileVerificationToken extends HttpException {
  constructor() {
    super(404, 'Wrong mobile verification code');
  }
}
