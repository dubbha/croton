import { compare } from 'bcrypt';

import { createRandomString } from '../utils/create-random-string';
import { createTokenizedUser } from '../utils/create-tokenized-user';
import { createNewPassword } from '../utils/create-new-password';
import { createExpiresInHours } from '../utils/create-expires-in-hours';

import User from '../interfaces/db.user.interface';
import UserWithToken from '../interfaces/tokenized.user.interface';

import RegistrationDto from '../models/registration.dto';
import LoginDto from '../models/login.dto';

import UserWithThatEmailAlreadyExists from '../exceptions/user-with-that-email-already-exists.exception';
import WrongCredentials from '../exceptions/wrong-creditionals.exception';
import WrongEmailVerificationToken from '../exceptions/wrong-email-verification-token.exception';
import EmailVerificationTokenExpired from '../exceptions/email-verification-token-expired.exception';
import EmailNotVerified from '../exceptions/email-not-verified.exception';
import UserIsSuspended from '../exceptions/user-is-suspended.exception';
import WrongPasswordResetToken from '../exceptions/wrong-password-reset-token.exception';
import PasswordResetTokenExpired from '../exceptions/password-reset-token-expired.exception';
import UserWithThatEmailAlreadyRegisteredBySocial from '../exceptions/user-with-that-email-already-registered-by-social';

import { UserStatuses } from '../constants/user-statuses';

import EmailSendingService from '../services/email-sending.service';
import DBService from '../db/db.service';

import PasswordUpdateDto from './password-update.dto';
import MobileRegistrationDto from './mobile-registration.dto';
import NotificationService from '../services/notification.service';
import WrongMobileVerificationToken from '../exceptions/wrong-mobile-verification-token.exception';
import MobileVerificationTokenExpired from '../exceptions/mobile-verification-token-expired.exception';

export default class AuthenticationService {
  private emailSendingService = new EmailSendingService();
  private notificationService = new NotificationService();
  private dbService = new DBService();

  public async register(
    registrationData: RegistrationDto,
    host: string
  ): Promise<void> {
    const { email } = registrationData;
    const existingUser = await this.dbService.getUserByEmail(email);
    if (!existingUser) {
      const hashedPassword = await createNewPassword(registrationData.password);
      const user = await this.dbService.saveUser({
        ...registrationData,
        status: UserStatuses.PENDING_VERIFICATION,
        password: hashedPassword,
      });
      await this.sendActivationMessage(user, host);
      return;
    }
    if (existingUser.socialProfile) {
      throw new UserWithThatEmailAlreadyRegisteredBySocial({
        email,
        googleId: existingUser.socialProfile.googleId,
        facebookId: existingUser.socialProfile.facebookId,
      });
    }
    throw new UserWithThatEmailAlreadyExists(existingUser.email);
  }

  public async mobileRegister(
    mobileRegistrationData: MobileRegistrationDto
  ): Promise<void> {
    const { email, token } = mobileRegistrationData;
    const existingUser = await this.dbService.getUserByEmail(email);
    if (!existingUser) {
      const hashedPassword = await createNewPassword(mobileRegistrationData.password);
      const user = await this.dbService.saveUser({
        ...mobileRegistrationData,
        status: UserStatuses.PENDING_VERIFICATION,
        password: hashedPassword,
      });
      await this.sendMobileActivationMessage(user, token);
      return;
    }
    if (existingUser.socialProfile) {
      throw new UserWithThatEmailAlreadyRegisteredBySocial({
        email,
        googleId: existingUser.socialProfile.googleId,
        facebookId: existingUser.socialProfile.facebookId,
      });
    }
    throw new UserWithThatEmailAlreadyExists(existingUser.email);
  }

  public async resetPassword(email: string, host: string): Promise<void> {
    const user = await this.dbService.getUserByEmail(email);

    if (user) {
      await this.sendPasswordResetMessage(user, host);
    }
  }

  public async updatePassword(
    passwordUpdateData: PasswordUpdateDto
  ): Promise<void> {
    const passwordVerification = await this.dbService.getPasswordResetByToken(
      passwordUpdateData.passwordResetToken
    );

    if (!passwordVerification) {
      throw new WrongPasswordResetToken();
    }

    if (passwordVerification.expiresIn < Date.now()) {
      throw new PasswordResetTokenExpired();
    }

    const user = await this.dbService.getUserById(passwordVerification.userId);
    user.password = await createNewPassword(passwordUpdateData.password);

    await this.dbService.updateUser(user);
    await this.dbService.removePasswordReset(passwordVerification);
  }

  public async login(loginData: LoginDto): Promise<UserWithToken> {
    const user = await this.dbService.getUserByEmail(loginData.email);
    this.validateUser(user);
    const isPasswordMatching = await compare(loginData.password, user.password);
    if (!isPasswordMatching) {
      throw new WrongCredentials();
    }

    return createTokenizedUser(user);
  }

  public async verify(emailVerificationToken: string): Promise<UserWithToken> {
    const emailVerification = await this.dbService.getEmailVerificationByToken(
      emailVerificationToken
    );

    if (!emailVerification) {
      throw new WrongEmailVerificationToken();
    }

    if (emailVerification.expiresIn < Date.now()) {
      throw new EmailVerificationTokenExpired();
    }

    const user = await this.dbService.getUserById(emailVerification.userId);
    user.status = UserStatuses.ACTIVE;
    await this.dbService.updateUser(user);
    await this.dbService.removeEmailVerification(emailVerification);

    return createTokenizedUser(user);
  }

  public async mobileRegistrationConfirm(mobileVerificationToken: string): Promise<UserWithToken> {
    const mobileVerification = await this.dbService.getMobileVerificationByToken(
      mobileVerificationToken
    );

    if (!mobileVerification) {
      throw new WrongMobileVerificationToken();
    }

    if (mobileVerification.expiresIn < Date.now()) {
      throw new MobileVerificationTokenExpired();
    }

    const user = await this.dbService.getUserById(mobileVerification.userId);
    user.status = UserStatuses.ACTIVE;
    await this.dbService.updateUser(user);
    await this.dbService.removeMobileVerification(mobileVerification);

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
    { id, email, firstName }: User,
    host: string
  ) {
    const { PASSWORD_RESET_EXPIRATION_TIME } = process.env;
    const passwordResetToken = createRandomString(64);
    const expiresInHours = createExpiresInHours(
      Number(PASSWORD_RESET_EXPIRATION_TIME)
    );
    await this.dbService.createPasswordReset({
      userId: id,
      passwordResetToken,
      expiresIn: Date.now() + expiresInHours,
    });

    await this.emailSendingService.sendPasswordResetMessage(
      email,
      firstName,
      host,
      passwordResetToken
    );
  }

  private async sendActivationMessage(
    { id, email, firstName }: User,
    host: string
  ): Promise<void> {
    const { EMAIL_VERIFICATION_EXPIRATION_TIME } = process.env;
    const emailVerificationToken = createRandomString(64);
    const expiresInHours = createExpiresInHours(
      Number(EMAIL_VERIFICATION_EXPIRATION_TIME)
    );
    await this.dbService.createEmailVerification({
      userId: id,
      emailVerificationToken,
      expiresIn: Date.now() + expiresInHours,
    });

    await this.emailSendingService.sendActivationMessage(
      email,
      firstName,
      host,
      emailVerificationToken
    );
  }

  private async sendMobileActivationMessage(
    { id }: User,
    registrationToken: string
  ): Promise<void> {
    const mobileVerificationToken = createRandomString(2);
    const expiresInHours = createExpiresInHours(
      Number(process.env.MOBILE_VERIFICATION_EXPIRATION_TIME)
    );
    await this.dbService.createMobileVerification({
      userId: id,
      mobileVerificationToken,
      expiresIn: Date.now() + expiresInHours,
    });

    await this.notificationService.sendMobileActivationMessage(
      mobileVerificationToken,
      registrationToken
    );
  }
}
