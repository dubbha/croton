import React, { useState, FormEvent, useEffect } from 'react';
import {
  Form,
  SubmitButton,
  ErrorAlert,
  InfoAlert,
  AlertPlaceholder,
  LoadingSpinner
} from 'elements';
import './styles.scss';

type Props = {
  isLoading: boolean;
  error: string | null;
  info: string | null;
  onSubmit: (email: string) => void;
};

export const PasswordResetForm = ({
  isLoading,
  error,
  info,
  onSubmit
}: Props) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!email);
  }, [email]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {info && <InfoAlert>{info}</InfoAlert>}
      {!error && !info && <AlertPlaceholder height="62px" />}
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          data-testid="passwordResetForm__email"
        />
      </Form.Group>

      <SubmitButton disabled={!isValid || isLoading}>
        <div className="spinner-container">
          {isLoading && <LoadingSpinner />}
        </div>
        <span>Send Email</span>
      </SubmitButton>
    </Form>
  );
};
