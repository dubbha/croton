import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Container, Header, Footer } from 'components';
import { getAuth } from 'store/auth/selectors';

export const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, firstName = '', lastName = '', email } = useSelector(getAuth);
  const name = `${firstName} ${lastName}`.trim();

  useEffect(() => {
    if (!isAuthenticated) dispatch(push('/signin'));
  }, [isAuthenticated, dispatch]);

  return (
    <Container>
      <Header />
      <div>{`${name} [${email}]`}</div>
      <Footer />
    </Container>
  );
};
