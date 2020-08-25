import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('components', () => ({
  Container: ({ children }) => <div className="container">{children}</div>,
  Header: () => <div>Header</div>,
  Footer: () => <div>Footer</div>,
  SignUpForm: ({ onSubmit }) => <button onClick={onSubmit} data-testid="submitButton" className="signUpForm" />,
}));

describe('pages/SignUp', () => {
  it('should render successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useDispatch: () => jest.fn(),
        useSelector: () => false,
      }));

      const { SignUp } = require('./SignUp');

      const { container } = render(<SignUp />, { wrapper: MemoryRouter });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on submit', () => {
    const fn = jest.fn();
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => false,
      }));

      jest.doMock('components/SignUpForm', () => {
        const React = require('react');
        return {
          SignUpForm: ({ onSubmit }) => (
            <button onClick={onSubmit} data-testid="submitButton" />
          ),
        };
      });

      const { SignUp } = require('./SignUp');

      const { getByTestId } = render(<SignUp />, { wrapper: MemoryRouter });
      const submitButton = getByTestId('submitButton');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
