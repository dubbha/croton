import HttpException from './http.exception';

export default class EmailResetTokenExpired extends HttpException {
  constructor() {
    super(400, 'Email reset token expired');
  }
}
