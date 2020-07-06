import React, { useState, FormEvent, useEffect } from 'react';
import { Form, SubmitButton } from 'elements';
import './styles.scss';

type Props = {
  onSubmit: (email: string) => void;
};

export const PasswordResetForm = ({ onSubmit }: Props) => {
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
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="passwordResetForm__email"
        />
      </Form.Group>

      <SubmitButton disabled={!isValid}>Send email</SubmitButton>
    </Form>
  );
};
