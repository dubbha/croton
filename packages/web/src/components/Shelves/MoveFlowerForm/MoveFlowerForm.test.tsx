import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MoveFlowerForm } from './MoveFlowerForm';
import { Shelf } from 'store/shelf';

describe('components/SignInForm', () => {
  const fn = jest.fn();
  const shelves = [] as Shelf[];

  it('should render successfully', () => {
    const { container } = render(
      <MoveFlowerForm onSubmit={fn} shelves={shelves} error={null} />,
      { wrapper: MemoryRouter }
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render submit button disabled by default', () => {
    const { container, getByTestId } = render(
      <MoveFlowerForm onSubmit={fn} shelves={shelves} error={null} />,
      { wrapper: MemoryRouter }
    );
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(
      <MoveFlowerForm onSubmit={fn} shelves={shelves} error={null} />,
      { wrapper: MemoryRouter }
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

  it('should display error alert on error', () => {
    const error = 'ERROR';
    const { getByTestId } = render(
      <MoveFlowerForm onSubmit={fn} shelves={shelves} error={error} />,
      { wrapper: MemoryRouter }
    );

    const errorAlert = getByTestId('errorAlert');

    expect(errorAlert.textContent).toBe('ERROR');
  });
});
