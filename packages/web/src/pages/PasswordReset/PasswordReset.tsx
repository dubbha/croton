import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Footer, PasswordResetForm } from 'components';
import { AUTH_LOGIN } from 'store/auth/actions';

export const PasswordReset = () => {
  const dispatch = useDispatch();

  const handleSubmit = (email: string) => {
    dispatch({
      type: AUTH_LOGIN,
      payload: { email },
    });
  };

  return (
    <Container>
      <Header />
      <PasswordResetForm onSubmit={handleSubmit} />
      <Footer />
    </Container>
  );
};
