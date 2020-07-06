import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertPlaceholder, ErrorAlert, InfoAlert } from 'elements/alerts';
import { QueryParams } from '../../constants/query-params';

type Props = {
  isLoading: boolean;
  error: string | null;
  onInit: (token: string) => void;
}

export const EmailConfirmMessage = ({ onInit, error, isLoading }: Props) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    onInit(params.get(QueryParams.EMAIL_VERIFICATION_TOKEN) as string);
  }, []);

  return (
    <>
      {error ? <ErrorAlert>{error}</ErrorAlert> : <AlertPlaceholder />}
      {isLoading ? <InfoAlert>We are about to activate yor account!</InfoAlert> : <AlertPlaceholder />}
    </>
  );
};
