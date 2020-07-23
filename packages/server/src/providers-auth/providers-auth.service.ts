import { Request, Response, RequestHandler } from 'express';
import passport, { Profile } from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';

import UserEntity from '../models/user.entity';
import RegistrationDto from '../models/registration.dto';
import SocialProfileDto from '../models/social-profile.dto'

import WrongCredentials from '../exceptions/wrong-creditionals.exception';

import { UserStatuses } from '../constants/user-statuses';

import { createTokenizedUser } from '../utils/create-tokenized-user';

import DBService from '../db/db.service'

import { ProvidersIdDBFieldName, ProvidersServiceName } from './providers-auth.interfaces';

export default class ProvidersAuthService {
  private dbService = new DBService();
  public verifyFacebookLogin: RequestHandler;
  public verifyGoogleLogin: RequestHandler;


  constructor() {
    this.verifyFacebookLogin = passport.authenticate(ProvidersServiceName.FACEBOOK as string, { session: false });
    this.verifyGoogleLogin = passport.authenticate(ProvidersServiceName.GOOGLE as string, { session: false });

    this.initFacebookProviderLogin();
    this.initGoogleProviderLogin();
    return this
  }

  private async findUserByProviderId(id: string, providerIdKeyName: ProvidersIdDBFieldName): Promise<UserEntity> {
    return await this.dbService.getUserBySocialProvider(providerIdKeyName, id);
  }

  private async createUserWithSocialProfile(registrationDto: RegistrationDto, socialProfile: SocialProfileDto): Promise<UserEntity> {
    return await this.dbService.saveUserWithSocialAccount(registrationDto, socialProfile);
  }

  private formatProviderProfileToRegistrationDto(profile: Profile, accessToken: string): RegistrationDto {
    return {
      firstName: profile.name?.givenName || profile.displayName,
      lastName: profile.name?.familyName || profile.displayName,
      email: profile.emails[0].value,
      password: accessToken,
      status: UserStatuses.ACTIVE
    }
  }

  private formatProviderProfileToDto(profile: Profile, passportIdKeyName: ProvidersIdDBFieldName): SocialProfileDto {
    return {
      pictureUrl: profile?.photos[0].value,
      [passportIdKeyName]: profile.id,
    }
  }

  private async registerOrLoginUserByProviderProfile(
    accessToken: string,
    profile: Profile,
    passportIdKeyName: ProvidersIdDBFieldName
) {
      let user = await this.findUserByProviderId(profile.id, passportIdKeyName);
      if(!user) {
        const registrationDto = this.formatProviderProfileToRegistrationDto(profile, accessToken);
        const socialProfile = this.formatProviderProfileToDto(profile, passportIdKeyName)
        user = await this.createUserWithSocialProfile(registrationDto, socialProfile)
      }
      return createTokenizedUser(user)
    }


  private getHandleProviderLogin(providersIdDBFieldName: ProvidersIdDBFieldName) {
    return async function(
      accessToken: string,
      _: string,
      profile: Profile,
      done: any
      ) {
        try {
          const loggedInOrRegisteredUser = await this.registerOrLoginUserByProviderProfile(
            accessToken,
            profile,
            providersIdDBFieldName
            );
            return done(null, loggedInOrRegisteredUser)
          } catch (err) {
            done(err)
          }
        }.bind(this)
      }

  private initFacebookProviderLogin () {
    const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;

    passport.use(new FacebookTokenStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      fbGraphVersion: 'v3.0'
    },
    this.getHandleProviderLogin(ProvidersIdDBFieldName.FACEBOOK)
  ));
  }

  private initGoogleProviderLogin () {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

    passport.use(new GoogleTokenStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    },
    this.getHandleProviderLogin(ProvidersIdDBFieldName.GOOGLE)
  ));
  }

  public handleAuthResult(req: Request, res:Response) {
    if(req.user) {
      return res.send(req.user)
    }
    throw new WrongCredentials()
  }
}
