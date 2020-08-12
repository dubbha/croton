import HttpException from './http.exception';

export default class WrongShelfInvitationToken extends HttpException {
  constructor() {
    super(404, 'Wrong shelf invitation token');
  }
}
