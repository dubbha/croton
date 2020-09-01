import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PasswordResetForm } from './PasswordResetForm';

describe('components/PasswordResetForm', () => {
  const fn = jest.fn();

  const props = {
    isLoading: false,
    error: null,
    info: null,
    onSubmit: fn,
  };

  it('should render successfully', () => {
    const { container } = render(<PasswordResetForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render submit button disabled by default', () => {
    const { container, getByTestId } = render(<PasswordResetForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(<PasswordResetForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const emailInput = getByTestId('passwordResetForm__email');
    const submitButton = getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'admin@admin.com' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(fn).toBeCalled();
  });
});
