import React, { useState, FormEvent, useEffect } from 'react';
import { Form, SubmitButton } from 'elements';
import './styles.scss';

type Props = {
  onSubmit: (email: string, password: string) => void
}

export const SignInForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!email && !!password);
  }, [email, password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Form.Control
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <SubmitButton disabled={!isValid} />
    </Form>
  );
};
