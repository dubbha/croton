import React, { useState, FormEvent, useEffect } from 'react';
import { Form, SubmitButton } from 'elements';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
  onSubmit: (email: string, password: string) => void;
};

export const SignInForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!email && !!password);
  }, [email, password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="signInForm__email"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="signInForm__password"
          />
          <Form.Text className="reset-password-link">
            <Link to="/reset">Forgot password?</Link>
          </Form.Text>
        </Form.Group>
        <SubmitButton disabled={!isValid}>Sign Up</SubmitButton>
      </Form>
    </>
  );
};
