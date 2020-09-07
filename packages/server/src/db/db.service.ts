import { getRepository, Repository } from 'typeorm';

import UserEntity from '../models/user.entity';
import EmailVerificationEntity from '../models/email-verification.entity';
import PasswordResetEntity from '../models/password-reset.entity';
import SocialProfileEntity from '../models/social-profile.entity';
import EmailResetEntity from '../models/email-reset.entity';
import ShelfEntity from '../models/shelf.entity';
import FlowerEntity from '../models/flower.entity';
import ImageEntity from '../models/image.entity';
import ShelfInvitationEntity from '../models/shelf-invitation.entity';
import UserToShelfEntity from '../models/user-to-shelf.entity';
import ActionEntity from '../models/action.entity';
import NotificationEntity from '../models/notification.entity';

import SocialProfileDto from '../models/social-profile.dto';
import RegistrationDto from '../models/registration.dto';

import { Actions } from '../constants/actions';

import { ProvidersIdDBFieldName } from '../providers-auth/providers-auth.interfaces';
import UserWithToken from '../interfaces/tokenized.user.interface';

import {
  CreateEmailRelatedPayload, CreateMobileRelatedPayload,
  CreatePasswordResetPayload,
  ShelfInvitationPayload,
} from './interfaces';
import NotificationToken from '../models/notification-token.entity';
import MobileVerificationEntity from '../models/mobile-verification.entity';

export default class DBService {
  private userRepository: Repository<UserEntity>;
  private emailVerificationRepository: Repository<EmailVerificationEntity>;
  private mobileVerificationRepository: Repository<MobileVerificationEntity>;
  private passwordResetRepository: Repository<PasswordResetEntity>;
  private socialProfileRepository: Repository<SocialProfileEntity>;
  private emailResetRepository: Repository<EmailResetEntity>;
  private shelfRepository: Repository<ShelfEntity>;
  private flowerRepository: Repository<FlowerEntity>;
  private imageRepository: Repository<ImageEntity>;
  private shelfInvitationRepository: Repository<ShelfInvitationEntity>;
  private userToShelfRepository: Repository<UserToShelfEntity>;
  private actionRepository: Repository<ActionEntity>;
  private notificationRepository: Repository<NotificationEntity>;
  private notificationTokenRepository: Repository<NotificationToken>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
    this.emailResetRepository = getRepository(EmailResetEntity);
    this.emailVerificationRepository = getRepository(EmailVerificationEntity);
    this.mobileVerificationRepository = getRepository(MobileVerificationEntity);
    this.passwordResetRepository = getRepository(PasswordResetEntity);
    this.socialProfileRepository = getRepository(SocialProfileEntity);
    this.shelfRepository = getRepository(ShelfEntity);
    this.flowerRepository = getRepository(FlowerEntity);
    this.imageRepository = getRepository(ImageEntity);
    this.shelfInvitationRepository = getRepository(ShelfInvitationEntity);
    this.userToShelfRepository = getRepository(UserToShelfEntity);
    this.actionRepository = getRepository(ActionEntity);
    this.notificationRepository = getRepository(NotificationEntity);
    this.notificationTokenRepository = getRepository(NotificationToken);
  }

  public getUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  public getUserByEmail(email: string) {
    return this.userRepository.findOne(
      { email },
      { relations: ['socialProfile'] }
    );
  }

  public updateUser(user: UserEntity) {
    return this.userRepository.update(user.id, user);
  }

  public saveUser(user: RegistrationDto) {
    return this.userRepository.save(user);
  }

  public async saveUserWithSocialAccount(
    userDetails: RegistrationDto | UserEntity,
    socialDetails: SocialProfileDto | SocialProfileEntity
  ) {
    const socialProfile = await this.socialProfileRepository.save(
      socialDetails
    );
    return await this.userRepository.save({
      ...userDetails,
      socialProfile,
    });
  }

  public async getUserBySocialProvider(
    providerIdKeyName: ProvidersIdDBFieldName,
    id: string
  ) {
    const socialProfile = await this.socialProfileRepository.findOne({
      [providerIdKeyName]: id,
    });
    if (socialProfile && socialProfile.user) {
      const { user } = socialProfile;
      return { ...user, socialProfile };
    }
  }

  public async updateUserWithSocialAccount(
    userWithToken: UserWithToken,
    email: string
  ) {
    const userCreatedWithSocial = await this.getUserByEmail(
      userWithToken.email
    );
    if (userCreatedWithSocial) {
      await this.userRepository.remove(userCreatedWithSocial);
    }
    const { facebookId, googleId, pictureUrl } = userWithToken.socialProfile;
    const user = await this.getUserByEmail(email);
    return await this.saveUserWithSocialAccount(user, {
      facebookId,
      googleId,
      pictureUrl,
      user,
    });
  }

  public getEmailVerificationByToken(emailVerificationToken: string) {
    return this.emailVerificationRepository.findOne({ emailVerificationToken });
  }

  public getMobileVerificationByToken(mobileVerificationToken: string) {
    return this.mobileVerificationRepository.findOne({ mobileVerificationToken });
  }

  public removeEmailVerification(emailVerification: EmailVerificationEntity) {
    return this.emailVerificationRepository.delete(emailVerification.id);
  }

  public removeMobileVerification(mobileVerification: MobileVerificationEntity) {
    return this.mobileVerificationRepository.delete(mobileVerification.id);
  }

  public createEmailVerification(config: CreateEmailRelatedPayload) {
    return this.emailVerificationRepository.save(config);
  }

  public createMobileVerification(config: CreateMobileRelatedPayload) {
    return this.mobileVerificationRepository.save(config);
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

  getShelfInvitationByToken(shelfInvitationToken: string) {
    return this.shelfInvitationRepository.findOne(
      { shelfInvitationToken },
      { relations: ['shelf'] }
    );
  }

  async saveShelfInvitation(config: ShelfInvitationPayload) {
    const shelfInvitation = this.shelfInvitationRepository.create(config);
    shelfInvitation.shelf = await this.shelfRepository.findOne(config.shelfId);
    return this.shelfInvitationRepository.save(shelfInvitation);
  }

  deleteShelfInvitation(id: number) {
    return this.shelfInvitationRepository.delete(id);
  }

  getShelfInvitationsByUserEmail(userEmail: string) {
    return this.shelfInvitationRepository.find({ where: { userEmail }, relations: ['shelf'] });
  }

  async getShelfInvitationsByShelfId(id: number) {
    const shelf = await this.getShelfById(id);
    return this.shelfInvitationRepository.find({ shelf });
  }

  getUserToShelf(userId: number, shelfId: number) {
    return this.userToShelfRepository.findOne({ where: { userId, shelfId } });
  }

  async saveUserToShelf(userId: number, shelfId: number, isAdmin = false) {
    const user = await this.userRepository.findOne(userId);
    const shelf = await this.shelfRepository.findOne(shelfId);

    const userShelvesCount = await this.userToShelfRepository.count({
      where: { userId },
    });

    return this.userToShelfRepository.save({
      user,
      shelf,
      isAdmin,
      order: userShelvesCount,
    });
  }

  async deleteUserToShelf(userId: number, shelfId: number) {
    const user = await this.userRepository.findOne(userId);
    const shelf = await this.shelfRepository.findOne(shelfId);

    return this.userToShelfRepository.delete({ user, shelf });
  }

  async getUsersToShelf(shelfId: number) {
    const shelf = await this.shelfRepository.findOne(shelfId);
    return this.userToShelfRepository.find({ where: { shelf }, relations: ['user'] });
  }

  getShelfById(id: number) {
    return this.shelfRepository.findOne(id, { relations: ['flowers'] });
  }

  async getShelvesByUserId(userId: number) {
    const userToShelves = await this.userToShelfRepository.find({
      where: { userId },
      relations: ['shelf'],
    });
    return userToShelves.map(u2s => u2s.shelf);
  }

  saveShelf(
    name: string,
    location: string,
    description: string,
    pictureUrl: string
  ) {
    return this.shelfRepository.save({
      name,
      location,
      description,
      pictureUrl,
    });
  }

  updateShelf(
    id: number,
    name: string,
    location: string,
    description: string,
    pictureUrl: string
  ) {
    return this.shelfRepository.update(id, {
      name,
      location,
      description,
      pictureUrl,
    });
  }

  deleteShelf(id: number) {
    return this.shelfRepository.delete(id);
  }

  getFlowers() {
    return this.flowerRepository.find({ relations: ['shelf'] });
  }

  getFlowerById(id: number) {
    return this.flowerRepository.findOne(id, { relations: ['shelf', 'images'] });
  }

  async getFlowersByShelfId(shelfId: number) {
    const shelf = await this.shelfRepository.findOne({ id: shelfId });
    return this.flowerRepository.find({ where: { shelf } });
  }

  async countFlowersByShelfId(shelfId: number) {
    const shelf = await this.shelfRepository.findOne({ id: shelfId });
    return this.flowerRepository.count({ where: { shelf } });
  }

  async saveFlower(
    shelfId: number,
    name: string,
    description: string,
    order: number,
    rrules: { [key in Actions]: string },
    pictureUrls: string[]
  ) {
    const shelf = await this.shelfRepository.findOne({ id: shelfId });
    return this.flowerRepository.save({
      shelf,
      name,
      description,
      order,
      rrules,
      pictureUrls,
    });
  }

  async updateFlower(
    id: number,
    shelfId: number,
    name: string,
    description: string,
    order: number,
    rrules: { [key in Actions]: string }
  ) {
    const shelf = await this.shelfRepository.findOne(shelfId);
    return this.flowerRepository.update(
      id,
      { shelf, name, description, order, rrules },
    );
  }

  deleteFlower(id: number) {
    return this.flowerRepository.delete(id);
  }

  async addImagesToFlower(flowerId: number, images: string[]) {
    const flower = await this.getFlowerById(flowerId);
    await Promise.all(images.map(async (image) => {
      return await this.imageRepository.save({
        image,
        flower
      });
    }));
  }

  async deleteImagesFromFlower(images: number[]) {
    await Promise.all(images.map(async (id) => {
      await this.imageRepository.delete({
        id
      });
    }));
  }

  async getUsersByFlowerId(id: number) {
    const { shelf: { id: shelfId } } = await this.flowerRepository.findOne(id, { relations: ['shelf'] });
    const userToShelves = await this.userToShelfRepository.find({ where: { shelfId }, relations: ['user'] });
    return userToShelves.map(u2s => u2s.user);
  }

  async saveAction(userId: number, flowerId: number, action: Actions, timestamp: number) {
    const user = await this.userRepository.findOne(userId);
    const flower = await this.flowerRepository.findOne(flowerId);
    return this.actionRepository.save({ user, flower, action, timestamp });
  }

  async getLastAction(flowerId: number, action: Actions): Promise<ActionEntity> {
    const flower = await this.flowerRepository.findOne(flowerId);
    return this.actionRepository.findOne({
      where: {
        flower,
        action,
      },
      order: {
        timestamp: 'DESC'
      },
      relations: ['user'],
    })
  }

  async getActionsByFlowerId(flowerId: number): Promise<Partial<ActionEntity>[]> {
    const flower = await this.flowerRepository.findOne(flowerId);
    return (
      await this.actionRepository.find({
        where: {
          flower,
        },
        order: {
          timestamp: 'ASC',
        },
        relations: ['user'],
        select: ['timestamp', 'action', 'user']
      })
    ).map(({ timestamp, action, user: { firstName, lastName } }) =>
      ({ timestamp, action, firstName, lastName }));
  }

  async getLastNotification(flowerId: number, action: Actions) {
    const flower = await this.flowerRepository.findOne(flowerId);
    return this.notificationRepository.findOne({
      where: {
        flower,
        action,
      },
      order: {
        timestamp: 'DESC'
      },
    })
  }

  async saveNotification(flowerId: number, action: Actions, timestamp: number) {
    const flower = await this.flowerRepository.findOne(flowerId);
    return this.notificationRepository.save({ flower, action, timestamp });
  }

  updateNotification(id: number, timestamp: number) {
    return this.notificationRepository.update(id, { timestamp });
  }

  async findDuplicatedRegisterToken(user, registrationToken) {
    const list = await this.findRegisterTokens(user);
    return list.find((registerToken) => registerToken.registrationToken === registrationToken);
  }

  findRegisterTokens(user): Promise<NotificationToken[]> {
    return this.notificationTokenRepository.find({ user });
  }

  updateRegisterToken(registerToken: NotificationToken) {
    return this.notificationTokenRepository.update(
      registerToken.notificationTokenId,
      registerToken
    );
  }

  async saveRegisterToken(userId: number, registrationToken: string) {
    const user = await this.getUserById(userId);
    const duplicateToken = await this.findDuplicatedRegisterToken(user, registrationToken);
    if (duplicateToken) {
      duplicateToken.registrationTokenLastUpdate = Date.now();
      await this.updateRegisterToken(duplicateToken);
    } else {
      await this.notificationTokenRepository.save({
        registrationToken,
        registrationTokenLastUpdate: Date.now(),
        user
      });
    }
  }
}
