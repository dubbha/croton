import { hash, compare } from 'bcrypt';
import { getRepository } from 'typeorm';

import UserEntity from '../models/user.entity';
import RegistrationDto from './registration.dto';
import UserWithThatEmailAlreadyExists from '../exceptions/user-with-that-email-already-exists.exception';
import { createToken } from '../utils/create-token';
import UserWithToken from '../interfaces/user-with-token';
import LoginDto from './login.dto';
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

export default class AuthenticationService {
  private userRepository = getRepository(UserEntity);
  private emailVerificationRepository = getRepository(EmailVerificationEntity);
  private emailSendingService = new EmailSendingService();

  public async register(
    registrationData: RegistrationDto,
    host: string
  ): Promise<void> {
    if (await this.userRepository.findOne({ email: registrationData.email })) {
      throw new UserWithThatEmailAlreadyExists(registrationData.email);
    } else {
      const hashedPassword = await hash(registrationData.password, 10);
      const user = await this.userRepository.save({
        ...registrationData,
        status: UserStatuses.PENDING_VERIFICATION,
        password: hashedPassword,
      });

      await this.sendActivationMessage(user, host);
    }
  }

  public async login(loginData: LoginDto): Promise<UserWithToken> {
    const user = await this.userRepository.findOne({ email: loginData.email });

    this.validateUser(user);

    const isPasswordMatching = await compare(
        loginData.password,
        user.password
    );

    if (!isPasswordMatching) {
      throw new WrongCredentials();
    }

    return this.loginUser(user);
  }

  public async verify(emailVerificationToken: string) : Promise<UserWithToken> {
    const emailVerification = await this.emailVerificationRepository.findOne({ emailVerificationToken });

    if (!emailVerification) {
      throw new WrongEmailVerificationToken();
    }

    if (emailVerification.expiresIn < Date.now()) {
      throw new EmailVerificationTokenExpired();
    }

    const user = await this.userRepository.findOne({ id: emailVerification.userId });
    user.status = UserStatuses.ACTIVE;
    await this.userRepository.update(user.id, user);
    await this.emailVerificationRepository.delete(emailVerification.id);

    return this.loginUser(user);
  }

  private loginUser(user: User): UserWithToken {
    const tokenData = createToken(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: tokenData.token,
    };
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

  private async sendActivationMessage({ id, email, name }: User, host) {
    const {
      EMAIL_VERIFICATION_EXPIRATION_TIME
    } = process.env;
    const emailVerificationToken = createRandomString(64);
    const expiresInHours = 1000 * 60 * 60 * Number(EMAIL_VERIFICATION_EXPIRATION_TIME);
    await this.emailVerificationRepository.save({
      userId: id,
      emailVerificationToken,
      expiresIn: Date.now() + expiresInHours
    });

    await this.emailSendingService.sendActivationMessage(email, name, host, emailVerificationToken);
  }
}
