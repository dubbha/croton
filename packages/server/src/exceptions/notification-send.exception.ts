import HttpException from './http.exception';

export default class NotificationSendException extends HttpException {
  constructor(error: any) {
    super(500, `Notification not send ${error}`);
  }
}
