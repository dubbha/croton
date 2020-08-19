import * as React from 'react';
import { useSelector, } from 'react-redux';
import { Container, UpdateProfileForm, AddSocialToProfile } from 'components';
import { getAuth } from 'store/auth/selectors';

import { UserAvatarSection } from './UserAvatarSection';
import './styles.scss';

export const ProfileUserDetails = () => {

  const {
    firstName,
    lastName,
    socialProfile,
  } = useSelector(getAuth);

  return (
    <Container>
      <UserAvatarSection firstName={firstName} lastName={lastName} pictureUrl={socialProfile?.pictureUrl} />
      <UpdateProfileForm />
      <AddSocialToProfile />
    </Container>
  );
};
