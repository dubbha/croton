import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  SubmitButton,
  ErrorAlert,
  AlertPlaceholder,
  LoadingSpinner,
} from 'elements';
import './styles.scss';

type Props = {
  isLoading: boolean;
  error: string | null;
  onSubmit: (email: string, password: string) => void;
};

export const SignInForm = ({ isLoading, error, onSubmit }: Props) => {
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
    <Form onSubmit={handleSubmit} className="signinForm">
      {error ? <ErrorAlert>{error}</ErrorAlert> : <AlertPlaceholder />}
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="signInForm__email"
        />
      </Form.Group>

      <Form.Group>
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
      <SubmitButton disabled={!isValid || isLoading} data-testid="submitButton">
        <div className="spinner-container">
          {isLoading && <LoadingSpinner />}
        </div>
        <span>Sign In</span>
      </SubmitButton>
    </Form>
  );
};
