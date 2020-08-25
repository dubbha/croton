import { SocialProfileProvider } from '../../constants/social-profile-provider';

const getSignInErrorMessage = (socialName: SocialProfileProvider): string =>
  `Sorry, something went wrong with logging you in via ${socialName}`;

const getAddSocialErrorMessage = (socialName: SocialProfileProvider): string =>
  `Sorry, something went wrong with adding your ${socialName} account`;

const getMergeSocialErrorMessageFromTemplate = (socialName: string): string =>
  `Sorry, something went wrong with adding ${socialName} to your account`;

export const SIGNIN_WITH_GOOGLE_ERROR_MESSAGE = getSignInErrorMessage(
  SocialProfileProvider.GOOGLE,
);

export const SIGNIN_WITH_FACEBOOK_ERROR_MESSAGE = getSignInErrorMessage(
  SocialProfileProvider.FACEBOOK,
);

export const ADD_GOOGLE_PROFILE_ERROR_MESSAGE = getMergeSocialErrorMessageFromTemplate(
  SocialProfileProvider.GOOGLE,
);

export const ADD_FACEBOOK_PROFILE_ERROR_MESSAGE = getMergeSocialErrorMessageFromTemplate(
  SocialProfileProvider.FACEBOOK,
);

export const GOOGLE_SIGNIN_BUTTON_TEXT = `Login with ${
  SocialProfileProvider.GOOGLE
}`;
export const FACEBOOK_SIGNIN_BUTTON_TEXT = `Login with ${
  SocialProfileProvider.FACEBOOK
}`;

export const ADD_GOOGLE_ERROR_MESSAGE = getAddSocialErrorMessage(
  SocialProfileProvider.GOOGLE,
);
export const ADD_GOOGLE_BUTTON_TEXT = `Add ${
  SocialProfileProvider.GOOGLE
} to profile`;
export const ADD_FACEBOOK_ERROR_MESSAGE = getAddSocialErrorMessage(
  SocialProfileProvider.FACEBOOK,
);
export const ADD_FACEBOOK_BUTTON_TEXT = `Add ${
  SocialProfileProvider.FACEBOOK
} to profile`;
