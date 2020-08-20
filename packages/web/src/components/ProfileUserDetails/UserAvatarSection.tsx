import * as React from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from 'store/auth/selectors';

export const UserAvatarSection = () => {
  const {
    firstName,
    lastName,
    socialProfile,
  } = useSelector(getAuth);
  const initials = `${
    firstName && firstName[0] ? firstName[0].toUpperCase() : ''
  } ${lastName && lastName[0] ? lastName[0].toUpperCase() : ''}`;
  return socialProfile?.pictureUrl ? (
    <picture data-testid="userAvatarSection__picture">
      <source className="circle with-picture" src={socialProfile?.pictureUrl} />
      <img className="circle with-picture" alt={initials} src={socialProfile?.pictureUrl} />
    </picture>
  ) : (
    <div className="circle" data-testid="userAvatarSection__default">{initials}</div>
  );
};
