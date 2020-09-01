import React, { useState, FormEvent, useEffect } from 'react';
import {
  Form,
  SubmitButton,
  ErrorAlert,
  InfoAlert,
  AlertPlaceholder,
  LoadingSpinner,
} from 'elements';
import './styles.scss';

type Props = {
  isLoading: boolean;
  error: string | null;
  info: string | null;
  onSubmit: (email: string) => void;
};

export const PasswordUpdateForm = ({
  isLoading,
  error,
  info,
  onSubmit,
}: Props) => {
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  useEffect(() => {
    setIsPasswordMatch(true);
  }, [password, passwordMatch]);

  useEffect(() => {
    setIsValid(!!password && !!passwordMatch);
  }, [password, passwordMatch, isPasswordMatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordMatch) {
      setIsPasswordMatch(false);
      return;
    }
    onSubmit(password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {info && <InfoAlert>{info}</InfoAlert>}
      {!error && !info && <AlertPlaceholder />}
      <Form.Group>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-testid="passwordUpdateForm__password"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat password"
          value={passwordMatch}
          onChange={e => setPasswordMatch(e.target.value)}
          data-testid="passwordUpdateForm__passwordMatch"
        />
        {!isPasswordMatch && (
          <Form.Text id="passwordHelpBlock" className="password-not-match">
            Your passwords must match.
          </Form.Text>
        )}
      </Form.Group>

      <SubmitButton disabled={!isValid || isLoading}>
        <div className="spinner-container">
          {isLoading && <LoadingSpinner />}
        </div>
        <span>Update Password</span>
      </SubmitButton>
    </Form>
  );
};
