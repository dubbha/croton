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
import useCustomForm from '../../hooks/useCustomForm';
import { isEmail } from '../../helpers/validators';

type Props = {
  isLoading: boolean;
  error: string | null;
  info: string | null;
  onSubmit: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
};

export const SignUpForm = ({ isLoading, error, info, onSubmit }: Props) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const emailErrorMessage = (email: string): string | null => {
    if (!isEmail(email)) {
      return 'Email is invalid.';
    }
    return null;
  };

  const firstNameErrorMessage = (firstName: string): string | null => {
    if (firstName.length < 2) {
      return 'First name has to be greater than 1 symbols.';
    }
    return null;
  };

  const lastNameErrorMessage = (lastName: string): string | null => {
    if (lastName.length < 2) {
      return 'Last name has to be greater than 1 symbols.';
    }
    return null;
  };

  const passwordErrorMessage = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password has to be greater than 8 symbols.';
    }
    return null;
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  }: {
    values: any;
    errors: any;
    touched: any;
    handleChange: any;
    handleBlur: any;
  } = useCustomForm({
    initialValues,
    errorsRules: {
      email: emailErrorMessage,
      firstName: firstNameErrorMessage,
      lastName: lastNameErrorMessage,
      password: passwordErrorMessage,
    },
  });

  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      !errors.email &&
        !errors.password &&
        !passwordMatchError &&
        !errors.firstName &&
        !errors.lastName
    );
  }, [errors, passwordMatchError]);

  // Password match is not moved to useCustomForm hook due to custom logic
  useEffect(() => {
    if (values.password !== values.passwordMatch) {
      setPasswordMatchError('Password doesn\'t match.');
    } else {
      setPasswordMatchError('');
    }
  }, [values.password, values.passwordMatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(values.email, values.password, values.firstName, values.lastName);
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
          value={values.name}
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="signUpForm__firstName"
        />
        {touched.firstName && errors.firstName && (
          <Form.Text className="form-error-message">
            {errors.firstName}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={values.name}
          name="lastName"
          onBlur={handleBlur}
          onChange={handleChange}
          data-testid="signUpForm__lastName"
        />
        {touched.lastName && errors.lastName && (
          <Form.Text className="form-error-message">
            {errors.lastName}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={values.name}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="signUpForm__email"
        />
        {touched.email && errors.email && (
          <Form.Text className="form-error-message">
            {errors.email}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={values.name}
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="signUpForm__password"
        />
        {touched.password && errors.password && (
          <Form.Text className="form-error-message">
            {errors.password}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formPasswordMatch">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat password"
          value={values.name}
          name="passwordMatch"
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="signUpForm__passwordMatch"
        />
        {touched.passwordMatch && passwordMatchError && (
          <Form.Text className="form-error-message">
            {passwordMatchError}
          </Form.Text>
        )}
      </Form.Group>
      <SubmitButton disabled={!isValid || isLoading}>
        <div className="spinner-container">
          {isLoading && <LoadingSpinner />}
        </div>
        <span>Sing Up</span>
      </SubmitButton>
    </Form>
  );
};
