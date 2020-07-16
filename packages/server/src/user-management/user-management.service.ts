import { getRepository } from 'typeorm';

import UserEntity from '../models/user.entity';
import EmailResetEntity from '../models/email-reset.entity';
import User from '../interfaces/user.interface';
import { createRandomString } from '../utils/create-random-string';
import EmailSendingService from '../services/email-sending.service';
import { createExpiresInHours } from '../utils/create-expires-in-hourse';
import EmailUpdateDto from './email-update.dto';
import WrongEmailResetToken from '../exceptions/wrong-email-reset-token.exception';
import EmailResetTokenExpired from '../exceptions/email-reset-token-expired.exception';
import { createTokenizedUser } from '../utils/create-tokenized-user';

export default class UserManagementService {
  private userRepository = getRepository(UserEntity);
  private emailResetRepository = getRepository(EmailResetEntity);
  private emailSendingService = new EmailSendingService();

  async resetEmail(id: string, host: string): Promise<void> {
    const user = await this.userRepository.findOne({ id });

    if (user) {
      await this.sendEmailResetMessage(user, host);
    }
  }

  async sendEmailResetMessage(
    { id, email, firstName }: User,
    host: string
  ) {
    const { EMAIL_RESET_EXPIRATION_TIME } = process.env;
    const emailResetToken = createRandomString(64);
    const expiresInHours = createExpiresInHours(Number(EMAIL_RESET_EXPIRATION_TIME));
    await this.emailResetRepository.save({
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
    const emailVerification = await this.emailResetRepository.findOne({
      emailResetToken
    });

    if (!emailVerification) {
      throw new WrongEmailResetToken();
    }

    if (emailVerification.expiresIn < Date.now()) {
      throw new EmailResetTokenExpired();
    }

    const user = await this.userRepository.findOne({
      id: emailVerification.userId,
    });
    user.email = email;

    await this.emailResetRepository.delete(emailVerification.id);
    await this.userRepository.update(user.id, user);

    return createTokenizedUser(user);
  }
}
