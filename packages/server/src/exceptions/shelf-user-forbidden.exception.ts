import HttpException from './http.exception';

export default class ShelfUserForbidden extends HttpException {
  constructor() {
    super(403, 'You are not related to current shelf');
  }
}
