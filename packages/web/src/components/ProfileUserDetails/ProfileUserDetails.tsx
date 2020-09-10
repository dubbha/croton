import * as React from 'react';
import { Container, UpdateProfileForm, AddSocialToProfile, ProfileInvites } from 'components';

import { UserAvatarSection } from './UserAvatarSection';

export const ProfileUserDetails = () => (
  <Container inner>
    <UserAvatarSection />
    <ProfileInvites />
    <UpdateProfileForm />
    <AddSocialToProfile />
  </Container>
);
