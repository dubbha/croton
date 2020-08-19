import * as React from 'react';

interface UserAvatarSectionProps {
  firstName: string | null;
  lastName: string | null;
  pictureUrl: string | undefined;
}

export const UserAvatarSection = ({
  firstName,
  lastName,
  pictureUrl,
}: UserAvatarSectionProps) => {
  const initials = `${
    firstName && firstName[0] ? firstName[0].toUpperCase() : ''
  } ${lastName && lastName[0] ? lastName[0].toUpperCase() : ''}`;
  return pictureUrl ? (
    <picture>
      <source className="circle with-picture" src={pictureUrl} />
      <img className="circle with-picture" alt={initials} src={pictureUrl} />
    </picture>
  ) : (
    <div className="circle">{initials}</div>
  );
};
