import { getRepository, Repository, IsNull } from 'typeorm';

import UserEntity from '../models/user.entity';
import EmailVerificationEntity from '../models/email-verification.entity';
import PasswordResetEntity from '../models/password-reset.entity';
import SocialProfileEntity from '../models/social-profile.entity';
import SocialProfileDto from '../models/social-profile.dto';
import RegistrationDto from '../models/registration.dto';
import { ProvidersIdDBFieldName } from 'providers-auth/providers-auth.interfaces';

interface CreateUserAuthEntityPayload {
  userId: string;
  expiresIn: number;
}

interface CreateEmailVerificationPayload extends CreateUserAuthEntityPayload {
  emailVerificationToken?: string;
  emailResetToken?: string;
}

interface CreatePasswordResetPayload extends CreateUserAuthEntityPayload {
  passwordResetToken: string;
}

export default class DBService {
  private userRepository: Repository<UserEntity>;
  private emailVerificationRepository: Repository<EmailVerificationEntity>;
  private passwordResetRepository: Repository<PasswordResetEntity>;
  private socialProfileRepository: Repository<SocialProfileEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
    this.emailVerificationRepository = getRepository(EmailVerificationEntity);
    this.passwordResetRepository = getRepository(PasswordResetEntity);
    this.socialProfileRepository = getRepository(SocialProfileEntity);
  }

  public async getUserById(id: string) {
    return this.userRepository.findOne({ id });
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  public async updateUser(user: UserEntity) {
    return this.userRepository.update(user.id, user);
  }

  public async saveUser(user: RegistrationDto) {
    return this.userRepository.save(user);
  }

  public async saveUserWithSocialAccount(
    userDetails: RegistrationDto,
    socialDetails: SocialProfileDto | SocialProfileEntity
  ) {
    const socialProfile = await this.socialProfileRepository.save(
      socialDetails
    );
    return this.userRepository.save({ ...userDetails, socialProfile });
  }

  public async getUserBySocialProvider(
    providerIdKeyName: ProvidersIdDBFieldName,
    id: string
  ) {
    const socialProfile = await this.socialProfileRepository.findOne({
      [providerIdKeyName]: id,
    });
    if (socialProfile) {
      const user = await this.userRepository.findOne({
        where: { socialProfile },
      });
      return { ...user, socialProfile };
    }
  }

  public async mergeUsersByEmail(email: string) {
    const manuallyCreatedUser = await this.userRepository.findOne({
      where: { email, socialProfile: IsNull() },
    });
    const userWithSocialAccount = await this.userRepository.findOne({
      relations: ['socialProfile'],
      where: { email },
    });
    const mergedUser = {
      ...manuallyCreatedUser,
      socialProfile: userWithSocialAccount.socialProfile,
    };
    await this.userRepository.delete(userWithSocialAccount);
    await this.userRepository.update(manuallyCreatedUser.id, mergedUser);
    return mergedUser;
  }

  public async getEmailVerificationByToken(emailVerificationToken: string) {
    return this.emailVerificationRepository.findOne({ emailVerificationToken });
  }

  public async removeEmailVerification(
    emailVerification: EmailVerificationEntity
  ) {
    await this.emailVerificationRepository.delete(emailVerification.id);
  }

  public async createEmailVerification(config: CreateEmailVerificationPayload) {
    return this.emailVerificationRepository.save(config);
  }

  public async getPasswordResetByToken(passwordResetToken: string) {
    return this.passwordResetRepository.findOne({ passwordResetToken });
  }

  public async removePasswordReset(passwordVerification: PasswordResetEntity) {
    return this.passwordResetRepository.delete(passwordVerification.id);
  }

  public async createPasswordReset(config: CreatePasswordResetPayload) {
    return this.passwordResetRepository.save(config);
  }
}
