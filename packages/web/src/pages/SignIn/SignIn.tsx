import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Footer, SignInForm } from 'components';
import { AUTH_LOGIN } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';

export const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getAuth);

  const handleSubmit = (email: string, password: string) => {
    dispatch({
      type: AUTH_LOGIN,
      payload: { email, password }
    });
  };

  return (
    <Container>
      <Header />
      <SignInForm isLoading={isLoading} error={error} onSubmit={handleSubmit} />
      <Footer />
    </Container>
  );
};
