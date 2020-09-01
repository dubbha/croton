import HttpException from './http.exception';

export default class ShelfAdministrationForbidden extends HttpException {
  constructor() {
    super(403, 'Shelf administration forbidden');
  }
}
