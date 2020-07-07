import { Container, Header, Footer, EmailConfirmMessage } from 'components';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'store/auth/selectors';
import { AUTH_EMAIL_CONFIRM } from 'store/auth';

export const EmailConfirm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getAuth);

  const handleOnInit = useCallback((emailVerificationToken: string): void => {
    dispatch({
      type: AUTH_EMAIL_CONFIRM,
      payload: { emailVerificationToken },
    });
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <EmailConfirmMessage isLoading={isLoading} error={error} onInit={handleOnInit} />
      <Footer />
    </Container>
  );
}
