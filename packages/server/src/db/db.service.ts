import { getRepository, Repository, IsNull } from 'typeorm';

import UserEntity from '../models/user.entity';
import EmailVerificationEntity from '../models/email-verification.entity';
import PasswordResetEntity from '../models/password-reset.entity';
import SocialProfileEntity from '../models/social-profile.entity';
import EmailResetEntity from '../models/email-reset.entity';
import SocialProfileDto from '../models/social-profile.dto';
import RegistrationDto from '../models/registration.dto';

import { ProvidersIdDBFieldName } from '../providers-auth/providers-auth.interfaces';

import {
  CreateEmailRelatedPayload,
  CreatePasswordResetPayload,
} from './interfaces';

export default class DBService {
  private userRepository: Repository<UserEntity>;
  private emailVerificationRepository: Repository<EmailVerificationEntity>;
  private passwordResetRepository: Repository<PasswordResetEntity>;
  private socialProfileRepository: Repository<SocialProfileEntity>;
  private emailResetRepository: Repository<EmailResetEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
    this.emailResetRepository = getRepository(EmailResetEntity);
    this.emailVerificationRepository = getRepository(EmailVerificationEntity);
    this.passwordResetRepository = getRepository(PasswordResetEntity);
    this.socialProfileRepository = getRepository(SocialProfileEntity);
  }

  public getUserById(id: string) {
    return this.userRepository.findOne({ id });
  }

  public getUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  public updateUser(user: UserEntity) {
    return this.userRepository.update(user.id, user);
  }

  public saveUser(user: RegistrationDto) {
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

  public getEmailVerificationByToken(emailVerificationToken: string) {
    return this.emailVerificationRepository.findOne({ emailVerificationToken });
  }

  public removeEmailVerification(emailVerification: EmailVerificationEntity) {
    return this.emailVerificationRepository.delete(emailVerification.id);
  }

  public createEmailVerification(config: CreateEmailRelatedPayload) {
    return this.emailVerificationRepository.save(config);
  }

  public getPasswordResetByToken(passwordResetToken: string) {
    return this.passwordResetRepository.findOne({ passwordResetToken });
  }

  public removePasswordReset(passwordVerification: PasswordResetEntity) {
    return this.passwordResetRepository.delete(passwordVerification.id);
  }

  public createPasswordReset(config: CreatePasswordResetPayload) {
    return this.passwordResetRepository.save(config);
  }

  public getEmailResetByToken(emailResetToken: string) {
    return this.emailResetRepository.findOne({ emailResetToken });
  }

  public createEmailReset(config: CreateEmailRelatedPayload) {
    return this.emailResetRepository.save(config);
  }

  public removeEmailReset({ id }: EmailResetEntity) {
    return this.emailResetRepository.delete(id);
  }
}
