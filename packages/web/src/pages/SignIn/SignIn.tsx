import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Footer, SignInForm } from 'components';
import { SYSTEM_AUTH } from 'store/system/actions';

export const SignIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = (email: string, password: string) => {
    dispatch({
      type: SYSTEM_AUTH,
      payload: { email, password },
    });
  }

  return (
    <Container>
      <Header />
      <SignInForm onSubmit={handleSubmit} />
      <Footer />
    </Container>
  );
};
