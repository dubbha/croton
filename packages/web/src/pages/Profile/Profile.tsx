import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Container, Header, Footer } from 'components';
import { getAuth } from 'store/auth/selectors';

export const Profile = () => {
  const dispatch = useDispatch();
  const { token, firstName = '', lastName = '', email } = useSelector(getAuth);
  const name = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    if (!token) dispatch(push('/signin'));
  }, [token, dispatch]);
  return (
    <Container>
      <Header />
      <div>{`${name} [${email}]`}</div>
      <Footer />
    </Container>
  );
};
