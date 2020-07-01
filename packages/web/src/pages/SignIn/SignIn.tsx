import React from 'react';
import { useStore, useDispatch } from 'react-redux';
import { Container, Header, Footer, SignInForm } from 'components';
import { SYSTEM_AUTH } from 'store/system/actions';

export const SignIn = () => {
  const store = useStore();
  const state = store.getState();

  const dispatch = useDispatch();

  const handleSubmit = (email: string, password: string) => {
    console.log(email, password);
    dispatch({
      type: SYSTEM_AUTH,
      payload: { email, password },
    });
  }

  return (
    <Container>
      <Header />
      <div>{JSON.stringify(state)}</div>
      <SignInForm onSubmit={handleSubmit} />
      <Footer />
    </Container>
  );
};
