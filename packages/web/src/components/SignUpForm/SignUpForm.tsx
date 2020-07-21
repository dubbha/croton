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
  onSubmit: (email: string, password: string, firstName: string, lastName: string) => void;
};

export const SignUpForm = ({ isLoading, error, info, onSubmit }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passwordMatchTouched, setPasswordMatchTouched] = useState(false);

  const [isValid, setIsValid] = useState(false);

  // I've decided to keep it here for now, but later probably we can use 'validate' or/and 'Formik' npm libs.
  const validateEmail = (emailToTest) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailToTest).toLowerCase());
  };

  useEffect(() => {
    setIsValid(
      !emailError
      && !passwordError
      && !passwordMatchError
      && !firstNameError
      && !lastNameError
    );
  }, [
    emailError,
    passwordError,
    passwordMatchError,
    firstNameError,
    lastNameError,
  ]);

  // validation and error setting for First Name
  useEffect(() => {
    if (firstName.length < 2) {
      setFirstNameError('First name has to be greater than 1 symbols.');
    } else {
      setFirstNameError('');
    }
  }, [firstName]);

  // validation and error setting for Last Name
  useEffect(() => {
    if (lastName.length < 2) {
      setLastNameError('Last name has to be greater than 1 symbols.');
    } else {
      setLastNameError('');
    }
  }, [lastName]);

  // validation and error setting for Email
  useEffect(() => {
    if (!validateEmail(email)) {
      setEmailError('Email is invalid.');
    } else {
      setEmailError('');
    }
  }, [email]);

  // validation and error setting for Password
  useEffect(() => {
    if (password.length < 8) {
      setPasswordError('Password has to be greater than 8 symbols.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  // validation and error setting for Password Matching
  useEffect(() => {
    if (password !== passwordMatch) {
      setPasswordMatchError('Password doesn\'t match.');
    } else {
      setPasswordMatchError('');
    }
  }, [passwordMatch, password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsValid(
      !!email && !!password && !!passwordMatch && !!firstName && !!lastName
    );
    onSubmit(email, password, firstName, lastName);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {info && <InfoAlert>{info}</InfoAlert>}
      {!error && !info && <AlertPlaceholder />}
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={() => setFirstNameTouched(true)}
          data-testid="signUpForm__firstName"
        />
        {firstNameTouched && firstNameError && (
          <Form.Text className="form-error-message">{firstNameError}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onBlur={() => setLastNameTouched(true)}
          onChange={(e) => setLastName(e.target.value)}
          data-testid="signUpForm__lastName"
        />
        {lastNameTouched && lastNameError && (
          <Form.Text className="form-error-message">{lastNameError}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          data-testid="signUpForm__email"
        />
        {emailTouched && emailError && (
          <Form.Text className="form-error-message">{emailError}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          data-testid="signUpForm__password"
        />
        {passwordTouched && passwordError && (
          <Form.Text className="form-error-message">{passwordError}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formPasswordMatch">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat password"
          value={passwordMatch}
          onChange={(e) => setPasswordMatch(e.target.value)}
          onBlur={() => setPasswordMatchTouched(true)}
          data-testid="signUpForm__passwordMatch"
        />
        {passwordMatchTouched && passwordMatchError && (
          <Form.Text className="form-error-message">
            {passwordMatchError}
          </Form.Text>
        )}
      </Form.Group>
      <SubmitButton disabled={!isValid || isLoading}>
        <div className="spinner-container">
          {isLoading && <LoadingSpinner />}
        </div>
        <span>Sign Up</span>
      </SubmitButton>
    </Form>
  );
};
