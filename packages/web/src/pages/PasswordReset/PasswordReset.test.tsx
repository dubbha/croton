import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('pages/PasswordReset', () => {
  it('should render successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useStore: () => ({
          getState: () => ({}),
        }),
        useDispatch: () => jest.fn(),
        useSelector: () => false,
      }));

      jest.doMock('components/PasswordResetForm', () => {
        const React = require('react');
        return {
          PasswordResetForm: ({ onSubmit }) => <button onClick={onSubmit} data-testid="submit" />,
        };
      });

      const { PasswordReset } = require('./PasswordReset');

      const { container } = render(<PasswordReset />, {
        wrapper: MemoryRouter,
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on submit', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useStore: () => ({
          getState: () => ({}),
        }),
        useDispatch: () => fn,
        useSelector: () => false,
      }));

      jest.doMock('components/PasswordResetForm', () => {
        const React = require('react');
        return {
          PasswordResetForm: ({ onSubmit }) => (
            <button onClick={onSubmit} data-testid="submit" />
          ),
        };
      });

      const { PasswordReset } = require('./PasswordReset');

      const { getByTestId } = render(<PasswordReset />, {
        wrapper: MemoryRouter,
      });
      const submitButton = getByTestId('submit');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
