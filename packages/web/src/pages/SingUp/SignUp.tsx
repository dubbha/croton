import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Footer, SignUpForm } from 'components';
import { Link } from 'react-router-dom';
import { AUTH_REGISTER } from 'store/auth/actions';

export const SignUp = () => {
  const dispatch = useDispatch();

  const handleSubmit = (email: string, password: string, name: string) => {
    dispatch({
      type: AUTH_REGISTER,
      payload: { email, password, name },
    });
  };

  return (
    <Container>
      <Header />
      <SignUpForm onSubmit={handleSubmit} />
      <div className="signup-login">
        Already have an account ?<Link to="/signin"> Sign In</Link>
      </div>
      <Footer />
    </Container>
  );
};
