import { getRepository } from 'typeorm';

import EmailResetEntity from '../models/email-reset.entity';
import User from '../interfaces/user.interface';
import { createRandomString } from '../utils/create-random-string';
import EmailSendingService from '../services/email-sending.service';
import { createExpiresInHours } from '../utils/create-expires-in-hourse';
import WrongEmailResetToken from '../exceptions/wrong-email-reset-token.exception';
import EmailResetTokenExpired from '../exceptions/email-reset-token-expired.exception';
import { createTokenizedUser } from '../utils/create-tokenized-user';
import DBService from '../db/db.service';

import EmailUpdateDto from './email-update.dto';
import UserUpdateDto from './user-update.dto';
import UserWithToken from 'interfaces/tokenized.user.interface';

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
