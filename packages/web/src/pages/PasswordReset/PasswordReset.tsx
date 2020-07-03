import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Footer, PasswordResetForm } from 'components';
import { SYSTEM_AUTH } from 'store/system/actions';

export const PasswordReset = () => {
  const dispatch = useDispatch();

  const handleSubmit = (email: string) => {
    dispatch({
      type: SYSTEM_AUTH,
      payload: { email },
    });
  }

  return (
    <Container>
      <Header />
      <PasswordResetForm onSubmit={handleSubmit} />
      <Footer />
    </Container>
  );
};
