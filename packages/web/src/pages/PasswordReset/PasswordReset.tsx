import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Footer, PasswordResetForm } from 'components';
// import { SYSTEM_AUTH } from 'store/system/actions';
import { AUTH_LOGIN } from 'store/auth/actions';
// import { getAuth } from 'store/auth/selectors';

export const PasswordReset = () => {
  const dispatch = useDispatch();
  // const { isLoading, error } = useSelector(getAuth);

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
