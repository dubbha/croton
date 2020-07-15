import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';

import UserEntity from '../models/user.entity';
import RegistrationDto from '../models/registration.dto';
import UserWithThatEmailAlreadyExists from '../exceptions/user-with-that-email-already-exists.exception';
import { createTokenizedUser } from '../utils/create-tokenized-user';
import UserWithToken from '../interfaces/tokenized.user.interface';
import LoginDto from '../models/login.dto';
import WrongCredentials from '../exceptions/wrong-creditionals.exception';
import User from '../interfaces/user.interface';
import { UserStatuses } from '../constants/user-statuses';
import { createRandomString } from '../utils/create-random-string';
import EmailVerificationEntity from '../models/email-verification.entity';
import WrongEmailVerificationToken from '../exceptions/wrong-email-verification-token.exception';
import EmailVerificationTokenExpired from '../exceptions/email-verification-token-expired.exception';
import EmailNotVerified from '../exceptions/email-not-verified.exception';
import UserIsSuspended from '../exceptions/user-is-suspended.exception';
import EmailSendingService from '../services/email-sending.service';
import PasswordResetEntity from '../models/password-reset.entity';
import PasswordUpdateDto from './password-update.dto';
import WrongPasswordResetToken from '../exceptions/wrong-password-reset-token.exception';
import PasswordResetTokenExpired from '../exceptions/password-reset-token-expired.exception';
import { createNewPassword } from '../utils/create-new-password';

export default class AuthenticationService {
  private userRepository = getRepository(UserEntity);
  private emailVerificationRepository = getRepository(EmailVerificationEntity);
  private passwordResetRepository = getRepository(PasswordResetEntity);
  private emailSendingService = new EmailSendingService();

  public async register(
    registrationData: RegistrationDto,
    host: string
  ): Promise<void> {
    if (await this.userRepository.findOne({ email: registrationData.email })) {
      throw new UserWithThatEmailAlreadyExists(registrationData.email);
    } else {
      const hashedPassword = await createNewPassword(registrationData.password);
      const user = await this.userRepository.save({
        ...registrationData,
        status: UserStatuses.PENDING_VERIFICATION,
        password: hashedPassword,
      });

      await this.sendActivationMessage(user, host);
    }
  }

  public async resetPassword(email: string, host: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (user) {
      await this.sendPasswordResetMessage(user, host);
    }
  }

  public async updatePassword(
    passwordUpdateData: PasswordUpdateDto
  ): Promise<void> {
    const passwordVerification = await this.passwordResetRepository.findOne({
      passwordResetToken: passwordUpdateData.passwordResetToken,
    });

    if (!passwordVerification) {
      throw new WrongPasswordResetToken();
    }

    if (passwordVerification.expiresIn < Date.now()) {
      throw new PasswordResetTokenExpired();
    }

    const user = await this.userRepository.findOne({
      id: passwordVerification.userId,
    });
    user.password = await createNewPassword(passwordUpdateData.password);

    await this.userRepository.update(user.id, user);
    await this.passwordResetRepository.delete(passwordVerification.id);
  }

  public async login(loginData: LoginDto): Promise<UserWithToken> {
    const user = await this.userRepository.findOne({ email: loginData.email });

    this.validateUser(user);

    const isPasswordMatching = await compare(loginData.password, user.password);

    if (!isPasswordMatching) {
      throw new WrongCredentials();
    }

    return createTokenizedUser(user);
  }

  public async verify(emailVerificationToken: string): Promise<UserWithToken> {
    const emailVerification = await this.emailVerificationRepository.findOne({
      emailVerificationToken,
    });

    if (!emailVerification) {
      throw new WrongEmailVerificationToken();
    }

    if (emailVerification.expiresIn < Date.now()) {
      throw new EmailVerificationTokenExpired();
    }

    const user = await this.userRepository.findOne({
      id: emailVerification.userId,
    });
    user.status = UserStatuses.ACTIVE;
    await this.userRepository.update(user.id, user);
    await this.emailVerificationRepository.delete(emailVerification.id);

    return createTokenizedUser(user);
  }

  private validateUser(user: User): void {
    if (!user) {
      throw new WrongCredentials();
    }

    if (user.status === UserStatuses.PENDING_VERIFICATION) {
      throw new EmailNotVerified();
    }

    if (user.status === UserStatuses.SUSPENDED) {
      throw new UserIsSuspended();
    }
  }

  private async sendPasswordResetMessage(
    { id, email, firstName: name }: User,
    host: string
  ) {
    const { PASSWORD_RESET_EXPIRATION_TIME } = process.env;
    const passwordResetToken = createRandomString(64);
    const expiresInHours =
      1000 * 60 * 60 * Number(PASSWORD_RESET_EXPIRATION_TIME);
    await this.passwordResetRepository.save({
      userId: id,
      passwordResetToken,
      expiresIn: Date.now() + expiresInHours,
    });

    await this.emailSendingService.sendPasswordResetMessage(
      email,
      name,
      host,
      passwordResetToken
    );
  }

  private async sendActivationMessage(
    { id, email, firstName: name }: User,
    host
  ): Promise<void> {
    const { EMAIL_VERIFICATION_EXPIRATION_TIME } = process.env;
    const emailVerificationToken = createRandomString(64);
    const expiresInHours =
      1000 * 60 * 60 * Number(EMAIL_VERIFICATION_EXPIRATION_TIME);
    await this.emailVerificationRepository.save({
      userId: id,
      emailVerificationToken,
      expiresIn: Date.now() + expiresInHours,
    });

    await this.emailSendingService.sendActivationMessage(
      email,
      name,
      host,
      emailVerificationToken
    );
  }
}
