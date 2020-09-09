export interface SocialProfile {
  facebookId?: string;
  googleId?: string;
  pictureUrl: string;
}

export type Shelf = {
  id: number;
  name: string;
  location: string;
}

export type Invite = {
  id: number;
  userEmail: string;
  expiresIn: string;
  shelf: Shelf;
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
  invites: Invite[];
}
