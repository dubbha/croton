import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SignUpForm } from './SignUpForm';

describe('components/SignUpForm', () => {
  const fn = jest.fn();

  const props = {
    isLoading: false,
    error: null,
    info: null,
    onSubmit: fn,
  };

  afterEach(() => {
    fn.mockReset();
  });

  it('should render successfully', () => {
    const { container } = render(<SignUpForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render submit button disabled by default', () => {
    const { container, getByTestId } = render(<SignUpForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(<SignUpForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const emailInput = getByTestId('signUpForm__email');
    const passwordInput = getByTestId('signUpForm__password');
    const passwordMatchInput = getByTestId('signUpForm__passwordMatch');
    const firstNameInput = getByTestId('signUpForm__firstName');
    const lastNameInput = getByTestId('signUpForm__lastName');
    const submitButton = getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'admin@admin.com' } });
    fireEvent.change(passwordInput, { target: { value: 'adminPass' } });
    fireEvent.change(passwordMatchInput, { target: { value: 'adminPass' } });
    fireEvent.change(firstNameInput, { target: { value: 'first' } });
    fireEvent.change(lastNameInput, { target: { value: 'last' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(fn).toBeCalled();
  });
});
