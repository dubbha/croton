import React, { useEffect } from 'react';
import { AlertPlaceholder, ErrorAlert, InfoAlert } from 'elements/alerts';
import { useSelector } from 'react-redux';

import { getQuery } from 'store/router/selectors';

type Props = {
  isLoading: boolean;
  error: string | null;
  onInit: (token: string) => void;
}

export const EmailConfirmMessage = ({ onInit, error, isLoading }: Props) => {
  const { emailVerificationToken } = useSelector(getQuery);

  useEffect(() => {
    onInit(emailVerificationToken);
  }, [onInit, emailVerificationToken]);

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {isLoading && <InfoAlert>We are about to activate yor account!</InfoAlert>}
      {!error && !isLoading && <AlertPlaceholder />}
    </>
  );
};
