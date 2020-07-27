import User from '../interfaces/user.interface';
import UserWithToken from '../interfaces/tokenized.user.interface';

import { createRandomString } from '../utils/create-random-string';
import { createExpiresInHours } from '../utils/create-expires-in-hourse';
import { createTokenizedUser } from '../utils/create-tokenized-user';

import WrongEmailResetToken from '../exceptions/wrong-email-reset-token.exception';
import EmailResetTokenExpired from '../exceptions/email-reset-token-expired.exception';
import UserWithThatEmailAlreadyExists from '../exceptions/user-with-that-email-already-exists.exception';

import EmailSendingService from '../services/email-sending.service';
import DBService from '../db/db.service';

import EmailUpdateDto from './email-update.dto';
import UserUpdateDto from './user-update.dto';

export default class UserManagementService {
  private emailSendingService = new EmailSendingService();
  private dbService = new DBService();

  async resetEmail(id: string, host: string): Promise<void> {
    const user = await this.dbService.getUserById(id);

    if (user) {
      await this.sendEmailResetMessage(user, host);
    }
  }

  async sendEmailResetMessage({ id, email, firstName }: User, host: string) {
    const { EMAIL_RESET_EXPIRATION_TIME } = process.env;
    const emailResetToken = createRandomString(64);
    const expiresInHours = createExpiresInHours(
      Number(EMAIL_RESET_EXPIRATION_TIME)
    );
    await this.dbService.createEmailVerification({
      userId: id,
      emailResetToken,
      expiresIn: Date.now() + expiresInHours,
    });

    await this.emailSendingService.sendEmailResetMessage(
      email,
      firstName,
      host,
      emailResetToken
    );
  }

  async updateEmail({ emailResetToken, email }: EmailUpdateDto): Promise<User> {
    const emailVerification = await this.dbService.getEmailVerificationByToken(
      emailResetToken
    );

    if (!emailVerification) {
      throw new WrongEmailResetToken();
    }

    if (emailVerification.expiresIn < Date.now()) {
      throw new EmailResetTokenExpired();
    }

    if (await this.dbService.getUserByEmail(email)) {
      throw new UserWithThatEmailAlreadyExists(email);
    }

    const user = await this.dbService.getUserById(emailVerification.userId);
    user.email = email;

    await this.dbService.removeEmailVerification(emailVerification);
    await this.dbService.updateUser(user);

    return createTokenizedUser(user);
  }

  async updateUser(
    { lastName, firstName }: UserUpdateDto,
    id: string
  ): Promise<User> {
    const user = await this.dbService.getUserById(id);
    const updatedUser = {
      ...user,
      lastName,
      firstName,
    };
    await this.dbService.updateUser(updatedUser);

    return createTokenizedUser(updatedUser);
  }

  async mergeUserWithSocialByEmail(email: string): Promise<UserWithToken> {
    const mergedUser = await this.dbService.mergeUsersByEmail(email);

    return createTokenizedUser(mergedUser);
  }
}
