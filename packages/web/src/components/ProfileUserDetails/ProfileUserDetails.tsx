import * as React from 'react';
import { Container, UpdateProfileForm, AddSocialToProfile } from 'components';

import { UserAvatarSection } from './UserAvatarSection';
import './styles.scss';

export const ProfileUserDetails = () => {
  return (
    <Container>
      <UserAvatarSection />
      <UpdateProfileForm />
      <AddSocialToProfile />
    </Container>
  );
};
