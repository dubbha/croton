import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('pages/SignIn', () => {
  beforeEach(() => {
    jest.doMock('components/FbAuth', () => {
      const React = require('react');
      return {
        FbAuth: () => <button />
      };
    });
    jest.doMock('components/GoogleAuth', () => {
      const React = require('react');
      return {
        GoogleAuth: () => <button />
      };
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useDispatch: () => jest.fn(),
        useSelector: () => false
      }));

      const { SignIn } = require('./SignIn');
      const { container } = render(<SignIn />, { wrapper: MemoryRouter });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should dispatch on submit', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => false
      }));
      jest.doMock('components/SignInForm', () => {
        const React = require('react');
        return {
          SignInForm: ({ onSubmit }) => (
            <button onClick={onSubmit} data-testid="submitButton" />
          )
        };
      });
      const { SignIn } = require('./SignIn');

      const { getByTestId } = render(<SignIn />, { wrapper: MemoryRouter });
      const submitButton = getByTestId('submitButton');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
