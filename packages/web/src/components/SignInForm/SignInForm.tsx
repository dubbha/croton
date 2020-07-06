import React, { useState, FormEvent, useEffect } from 'react';
import { Form, SubmitButton, ErrorAlert } from 'elements';
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
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        data-testid="signInForm__email"
      />
      <Form.Control
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        data-testid="signInForm__password"
      />
      <SubmitButton disabled={!isValid || isLoading} />
      {error && <ErrorAlert>{error}</ErrorAlert>}
    </Form>
  );
};
