import HttpException from './http.exception';

export default class UserIsSuspended extends HttpException {
  constructor() {
    super(400, 'User is suspended');
  }
}
