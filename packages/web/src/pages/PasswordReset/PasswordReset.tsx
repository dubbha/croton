import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Header,
  Footer,
  PasswordResetForm,
  PasswordUpdateForm,
} from 'components';
import { AUTH_RESET_PASSWORD, AUTH_UPDATE_PASSWORD } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';
import { getQuery } from 'store/router/selectors';

export const PasswordReset = () => {
  const dispatch = useDispatch();
  const { isLoading, error, info } = useSelector(getAuth);
  const { passwordResetToken } = useSelector(getQuery);

  const handleReset = (email: string) => {
    dispatch({
      type: AUTH_RESET_PASSWORD,
      payload: { email },
    });
  };

  const handleUpdate = (password: string) => {
    dispatch({
      type: AUTH_UPDATE_PASSWORD,
      payload: { password, token: passwordResetToken },
    });
  };

  return (
    <Container>
      <Header />
      {passwordResetToken ? (
        <PasswordUpdateForm
          isLoading={isLoading}
          error={error}
          info={info}
          onSubmit={handleUpdate}
        />
      ) : (
        <PasswordResetForm
          isLoading={isLoading}
          error={error}
          info={info}
          onSubmit={handleReset}
        />
      )}
      <Footer />
    </Container>
  );
};
