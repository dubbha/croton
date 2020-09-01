import { Social } from '../constants/social';
import HttpException from './http.exception';

interface Payload {
  email: string;
  facebookId?: string;
  googleId?: string;
}

export default class UserWithThatEmailAlreadyRegisteredBySocial extends HttpException {
  constructor({ email, facebookId, googleId }: Payload) {
    const social = facebookId
      ? Social.FACEBOOK
      : googleId
        ? Social.GOOGLE
        : 'some social';
    super(
      409,
      `User with email '${email}' has been already registered via ${social}. Please consider logging in via it`
    );
  }
}
