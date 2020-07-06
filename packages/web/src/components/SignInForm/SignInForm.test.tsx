import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { SignInForm } from './SignInForm';

describe('components/SignInForm', () => {
  const fn = jest.fn();

  it('should render successfully', () => {
    const { container } = render(
      <Router>
        <SignInForm onSubmit={fn} />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render submit button disabled by default', () => {
    const { container, getByTestId } = render(
      <Router>
        <SignInForm onSubmit={fn} />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(
      <Router>
        <SignInForm onSubmit={fn} />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();

    const emailInput = getByTestId('signInForm__email');
    const passwordInput = getByTestId('signInForm__password');
    const submitButton = getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'admin@admin.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admin' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(fn).toBeCalled();
  });
});
