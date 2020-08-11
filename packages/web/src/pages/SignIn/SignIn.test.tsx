import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('components', () => ({
  Container: ({ children }) => <div className="container">{children}</div>,
  Header: () => <div>Header</div>,
  Footer: () => <div>Footer</div>,
  FbAuth: () => <div>FbAuth</div>,
  GoogleAuth: () => <div>GoogleAuth</div>,
  SignInForm: ({ onSubmit }) => <button onClick={onSubmit} data-testid="submitButton" className="signInForm" />,
}));

describe('pages/SignIn', () => {
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

      const { SignIn } = require('./SignIn');

      const { getByTestId } = render(<SignIn />, { wrapper: MemoryRouter });
      const submitButton = getByTestId('submitButton');

      fireEvent.click(submitButton);
      expect(fn).toBeCalled();
    });
  });
});
