import { Container, Header, Footer, EmailResetForm } from 'components';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'store/auth/selectors';
import { AUTH_UPDATE_EMAIL } from 'store/auth';
import { getQuery } from '../../store/router/selectors';

export const EmailReset = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getAuth);
  const { emailResetToken } = useSelector(getQuery);

  const handleOnSubmit = useCallback(
    (email: string): void => {
      dispatch({
        type: AUTH_UPDATE_EMAIL,
        payload: { email, emailResetToken }
      });
    },
    [dispatch, emailResetToken]
  );

  return (
    <Container>
      <Header />
      <EmailResetForm
        isLoading={isLoading}
        error={error}
        onSubmit={handleOnSubmit}
      />
      <Footer />
    </Container>
  );
};
