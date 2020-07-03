import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Header, Footer, SignUpForm } from 'components';
import { Link } from 'react-router-dom';
import { SYSTEM_AUTH } from 'store/system/actions';

export const SignUp = () => {
  const dispatch = useDispatch();

  const handleSubmit = (email: string, password: string) => {
    dispatch({
      type: SYSTEM_AUTH,
      payload: { email, password },
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
