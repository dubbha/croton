import HttpException from './http.exception';

export default class UserWithThatEmailAlreadyExists extends HttpException {
  constructor(email: string) {
    super(409, `User with email '${email}' already exists`);
  }
}
