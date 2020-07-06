import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('pages/SignUp', () => {
  const fn = jest.fn();

  it('should render successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useStore: () => ({
          getState: () => ({}),
        }),
        useDispatch: () => fn,
      }));

      jest.doMock('components/SignUpForm', () => {
        const React = require('react');
        return {
          SignUpForm: ({ onSubmit }) => (
            <button onClick={onSubmit} data-testid="submit" />
          ),
        };
      });

      const { SignUp } = require('./SignUp');

      const { container } = render(<SignUp />, { wrapper: MemoryRouter });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on submit', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useStore: () => ({
          getState: () => ({}),
        }),
        useDispatch: () => fn,
      }));

      jest.doMock('components/SignUpForm', () => {
        const React = require('react');
        return {
          SignUpForm: ({ onSubmit }) => (
            <button onClick={onSubmit} data-testid="submit" />
          ),
        };
      });

      const { SignUp } = require('./SignUp');

      const { getByTestId } = render(<SignUp />, { wrapper: MemoryRouter });
      const submitButton = getByTestId('submit');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
