import React from 'react';
import { render, fireEvent } from '@testing-library/react';

jest.mock('components/SignInForm', () => {
  const React = require('react');
  return {
    SignInForm: ({ onSubmit }) => (
      <button onClick={onSubmit} data-testid="submit" />
    )
  };
});

jest.mock('components/Header', () => {
  const React = require('react');
  return {
    Header: () => <div>Header</div>
  };
});

describe('pages/SignIn', () => {
  it('should render successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useDispatch: () => jest.fn(),
        useSelector: () => false
      }));

      const { SignIn } = require('./SignIn');

      const { container } = render(<SignIn />);
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

      const { SignIn } = require('./SignIn');

      const { getByTestId } = render(<SignIn />);
      const submitButton = getByTestId('submit');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
