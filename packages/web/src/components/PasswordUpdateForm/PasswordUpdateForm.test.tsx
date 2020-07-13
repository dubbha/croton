import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PasswordUpdateForm } from './PasswordUpdateForm';

describe('components/PasswordUpdateForm', () => {
  const fn = jest.fn();

  const props = {
    isLoading: false,
    error: null,
    info: null,
    onSubmit: fn
  };

  afterEach(() => {
    fn.mockReset();
  });

  it('should render successfully', () => {
    const { container } = render(<PasswordUpdateForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render submit button disabled by default', () => {
    const { container, getByTestId } = render(
      <PasswordUpdateForm {...props} />
    );
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(
      <PasswordUpdateForm {...props} />
    );
    expect(container.firstChild).toMatchSnapshot();

    const passwordInput = getByTestId('passwordUpdateForm__password');
    const passwordMatchInput = getByTestId('passwordUpdateForm__passwordMatch');
    const submitButton = getByTestId('submitButton');

    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.change(passwordMatchInput, { target: { value: 'pass' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(fn).toBeCalled();
  });

  it('should enforce matching passwords', () => {
    const { getByTestId, getByText } = render(
      <PasswordUpdateForm {...props} />
    );

    const passwordInput = getByTestId('passwordUpdateForm__password');
    const passwordMatchInput = getByTestId('passwordUpdateForm__passwordMatch');
    const submitButton = getByTestId('submitButton');

    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.change(passwordMatchInput, { target: { value: 'PASS' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(fn).not.toBeCalled();
    expect(getByText('Your passwords must match.')).toBeTruthy();
  });

  it('should render spinner when loading', () => {
    const { container } = render(<PasswordUpdateForm {...props} isLoading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display error alert', () => {
    const { getByTestId } = render(
      <PasswordUpdateForm {...props} error="ERROR" />
    );
    const errorAlert = getByTestId('errorAlert');
    expect(errorAlert.textContent).toBe('ERROR');
  });

  it('should display info alert', () => {
    const { getByTestId } = render(
      <PasswordUpdateForm {...props} info="INFO" />
    );
    const infoAlert = getByTestId('infoAlert');
    expect(infoAlert.textContent).toBe('INFO');
  });
});
