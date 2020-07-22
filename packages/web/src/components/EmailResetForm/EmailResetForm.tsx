import React, { useState, FormEvent } from 'react';
import {
  Form,
  SubmitButton,
  ErrorAlert,
  AlertPlaceholder,
  LoadingSpinner
} from 'elements';

type Props = {
  isLoading: boolean;
  error: string | null;
  onSubmit: (email: string) => void;
};

export const EmailResetForm = ({ isLoading, error, onSubmit }: Props) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {!error && <AlertPlaceholder height="74px" />}
      <Form.Group controlId="formResetEmail">
        <Form.Label>You are about to change your email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Please enter new email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          data-testid="emailResetForm__email"
        />
      </Form.Group>

      <SubmitButton disabled={isLoading}>
        <div className="spinner-container">
          {isLoading && <LoadingSpinner />}
        </div>
        <span>Reset Email</span>
      </SubmitButton>
    </Form>
  );
};
