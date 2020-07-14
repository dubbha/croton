import HttpException from './http.exception';

export default class WrongEmailResetToken extends HttpException {
  constructor() {
    super(404, 'Wrong email reset token');
  }
}
