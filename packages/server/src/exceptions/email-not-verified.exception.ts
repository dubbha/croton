import HttpException from './http.exception';

export default class EmailNotVerified extends HttpException {
  constructor() {
    super(400, 'Email not yet verified');
  }
}
