import HttpException from './http.exception';

export default class WrongCredentials extends HttpException {
  constructor() {
    super(401, 'Wrong credentials provided');
  }
}
