import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('pages/SignIn', () => {
  const fn = jest.fn()

  it('should render successfully', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useStore: () => ({
          getState: () => ({}),
        }),
        useDispatch: () => fn,
      }));
  
      jest.doMock('components/SignInForm', () => {
        const React = require('react');
        return {
          SignInForm: ({ onSubmit }) => <button onClick={onSubmit} data-testid="submit" />,
        };
      });

      const { SignIn } = require('./SignIn');

      const { container } = render(<SignIn />);
      expect(container.firstChild).toMatchSnapshot();
    })
  })

  it('should dispatch on submit', () => {
    jest.isolateModules(() => {
      jest.doMock('react-redux', () => ({
        useStore: () => ({
          getState: () => ({}),
        }),
        useDispatch: () => fn,
      }));
  
      jest.doMock('components/SignInForm', () => {
        const React = require('react');
        return {
          SignInForm: ({ onSubmit }) => <button onClick={onSubmit} data-testid="submit" />,
        };
      });

      const { SignIn } = require('./SignIn');

      const { getByTestId } = render(<SignIn />);
      const submitButton = getByTestId('submit');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    })
  })
})