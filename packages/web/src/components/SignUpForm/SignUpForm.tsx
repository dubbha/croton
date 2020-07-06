import React, { useState, FormEvent, useEffect } from 'react';
import { Form, SubmitButton } from 'elements';
import './styles.scss';

type Props = {
  onSubmit: (
    email: string,
    password: string,
    name: string
  ) => // firstName: string,
  // lastName: string
  void;
};

export const SignUpForm = ({ onSubmit }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  useEffect(() => {
    setIsValid(
      !!email && !!password && !!passwordMatch && !!firstName && !!lastName
    );
  }, [email, password, passwordMatch, firstName, lastName]);

  useEffect(() => {
    setIsPasswordMatch(true);
  }, [password, passwordMatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordMatch) {
      setIsPasswordMatch(false);
      return;
    }
    onSubmit(email, password, `${firstName}, ${lastName}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          data-testid="signUpForm__firstName"
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          data-testid="signUpForm__lastName"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="signUpForm__email"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="signUpForm__password"
        />
      </Form.Group>

      <Form.Group controlId="formPasswordMatch">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat password"
          value={passwordMatch}
          onChange={(e) => setPasswordMatch(e.target.value)}
          data-testid="signUpForm__passwordMatch"
        />
        {!isPasswordMatch ? (
          <Form.Text id="passwordHelpBlock" className="password-not-match">
            Your passwords must match.
          </Form.Text>
        ) : (
          undefined
        )}
      </Form.Group>
      <SubmitButton disabled={!isValid}>Sing Up</SubmitButton>
    </Form>
  );
};
