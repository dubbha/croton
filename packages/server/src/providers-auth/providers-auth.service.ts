import { Request, Response, RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import passport, { Profile } from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import GoogleTokenStrategy from 'passport-google-token'

import UserEntity from '../models/user.entity';
import SocialRegistrationDto from '../models/social-registration.dto';
import WrongCredentials from '../exceptions/wrong-creditionals.exception';
import { UserStatuses } from '../constants/user-statuses';
import { createTokenizedUser } from '../utils/create-tokenized-user';

import { ProvidersIdDBFieldName, ProvidersServiceName } from './providers-auth.interfaces'

export default class ProvidersAuthService {
  private userRepository = getRepository(UserEntity);
  public verifyFacebookLogin: RequestHandler
  public verifyGoogleLogin: RequestHandler


  constructor() {
    this.verifyFacebookLogin = passport.authenticate(ProvidersServiceName.FACEBOOK as string, { session: false })
    this.verifyGoogleLogin = passport.authenticate(ProvidersServiceName.GOOGLE as string, { session: false })

    this.initFacebookProviderLogin()
    this.initGoogleProviderLogin()
    return this
  }

  private async findUserByProviderId(id: string, providerIdKeyName: ProvidersIdDBFieldName): Promise<UserEntity> {
    return this.userRepository.findOne({ [providerIdKeyName]: id });
  }

  private async createUserBySocialRegistrationDto(socialRegistrationDto: SocialRegistrationDto): Promise<UserEntity> {
    return this.userRepository.create(socialRegistrationDto);
  }

  private formatProviderProfileToSocialRegistrationDto(profile: Profile, accessToken: string, passportIdKeyName: ProvidersIdDBFieldName): SocialRegistrationDto {
    return {
      firstName: profile.name?.givenName || profile.displayName,
      lastName: profile.name?.familyName || profile.displayName,
      email: profile.emails[0].value,
      password: accessToken,
      [passportIdKeyName]: profile.id,
      status: UserStatuses.ACTIVE
    }
  }

  private async registerOrLoginUserByProviderProfile(
    accessToken: string,
    profile: Profile,
    passportIdKeyName: ProvidersIdDBFieldName
) {
      let user = await this.findUserByProviderId(profile.id, passportIdKeyName)
      if(!user) {
        const socialRegistrationDto = this.formatProviderProfileToSocialRegistrationDto(profile, accessToken, passportIdKeyName)
        user = await this.createUserBySocialRegistrationDto(socialRegistrationDto)
      }
      return createTokenizedUser(user)
    }

  private getHandleProviderLogin(providersIdDBFieldName: ProvidersIdDBFieldName) {return async function(
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
        )
        return done(null, loggedInOrRegisteredUser)
      } catch (err) {
        done(err)
      }
  }}

  private initFacebookProviderLogin () {
    const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env

    passport.use(new FacebookTokenStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      fbGraphVersion: 'v3.0'
    },
    this.getHandleProviderLogin(ProvidersIdDBFieldName.FACEBOOK).bind(this)
  ));
  }

  private initGoogleProviderLogin () {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

    passport.use(new GoogleTokenStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      fbGraphVersion: 'v3.0'
    },
    this.getHandleProviderLogin(ProvidersIdDBFieldName.GOOGLE).bind(this)
  ));
  }

  public handleAuthResult(req: Request, res:Response) {
    if(req.user) {
      return res.send(req.user)
    }
    throw new WrongCredentials()
  }
}
