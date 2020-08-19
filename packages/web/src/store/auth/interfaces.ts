export interface SocialProfile {
  facebookId?: string;
  googleId?: string;
  pictureUrl: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  error: string | null;
  info: string | null;
  socialProfile: SocialProfile | null;
  isSignedInWithSocial: boolean;
}
