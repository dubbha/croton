import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('components', () => ({
  Container: ({ children }) => <div className="container">{children}</div>,
  Header: () => <div>Header</div>,
  Footer: () => <div>Footer</div>,
  PasswordResetForm: ({ onSubmit }) => <button onClick={onSubmit} data-testid="submitButton" className="resetForm" />,
  PasswordUpdateForm: ({ onSubmit }) => <button onClick={onSubmit} data-testid="submitButton" className="updateForm" />,
}));

describe('pages/PasswordReset', () => {
  it('should render password reset form successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useDispatch: () => jest.fn(),
        useSelector: () => false,
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { container } = render(<PasswordReset />, {
        wrapper: MemoryRouter,
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on reset', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => false,
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { getByTestId } = render(<PasswordReset />, {
        wrapper: MemoryRouter,
      });
      const submitButton = getByTestId('submitButton');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });

  it('should render password update form successfully if token provided', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useDispatch: () => jest.fn(),
        useSelector: () => ({ passwordResetToken: 'TOKEN' }),
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { container } = render(<PasswordReset />, {
        wrapper: MemoryRouter,
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on update', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => ({ passwordResetToken: 'TOKEN' }),
      }));

      const { PasswordReset } = require('./PasswordReset');

      const { getByTestId } = render(<PasswordReset />, {
        wrapper: MemoryRouter,
      });
      const submitButton = getByTestId('submitButton');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
