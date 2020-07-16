import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Container, Header, Footer, SignInForm, FbAuth } from 'components';
import { Link } from 'react-router-dom';
import { AUTH_LOGIN } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';

import './styles.scss';

export const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getAuth);

  const handleSubmit = (email: string, password: string) => {
    dispatch({
      type: AUTH_LOGIN,
      payload: { email, password },
    });
  };

  return (
    <Container>
      <Header />
      <div className={classNames(['container', 'signInConrollersContainer'])}>
        <SignInForm
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
        />
        <FbAuth />
      </div>
      <div className="signin-register">
        Don&apos;t have an account? <Link to="/signup"> Register</Link>
      </div>

      <Footer />
    </Container>
  );
};
