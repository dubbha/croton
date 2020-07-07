import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('pages/PasswordReset', () => {
  it('should render password reset form successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('components/Header', () => ({
        Header: () => <div>Header</div>
      }));
      jest.doMock('components/Footer', () => ({
        Footer: () => <div>Footer</div>
      }));

      jest.doMock('react-redux', () => ({
        useDispatch: () => jest.fn(),
        useSelector: () => false
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { container } = render(<PasswordReset />, {
        wrapper: MemoryRouter
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on reset', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => false
      }));

      jest.doMock('components/PasswordResetForm', () => ({
        PasswordResetForm: ({ onSubmit }) => (
          <button onClick={onSubmit} data-testid="submit" />
        )
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { getByTestId } = render(<PasswordReset />, {
        wrapper: MemoryRouter
      });
      const submitButton = getByTestId('submit');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });

  it('should render password update form successfully if token provided', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useDispatch: () => jest.fn(),
        useSelector: () => ({ passwordResetToken: 'TOKEN' })
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { container } = render(<PasswordReset />, {
        wrapper: MemoryRouter
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on update', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => ({ passwordResetToken: 'TOKEN' })
      }));

      jest.doMock('components/PasswordUpdateForm', () => ({
        PasswordUpdateForm: ({ onSubmit }) => (
          <button onClick={onSubmit} data-testid="submit" />
        )
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { getByTestId } = render(<PasswordReset />, {
        wrapper: MemoryRouter
      });
      const submitButton = getByTestId('submit');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
