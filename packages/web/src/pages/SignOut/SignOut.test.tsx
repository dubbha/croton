import React from 'react';
import { render } from '@testing-library/react';
import { AUTH_LOGOUT } from 'store/auth/actions';

describe('pages/SignOut', () => {
  it('should fire logout and location change actions', () => {
      const dispatchFn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => dispatchFn,
        useSelector: () => false
      }));

      const pushFn = jest.fn(() => ({ type: 'PUSH_TYPE' }));
      jest.doMock('connected-react-router', () => ({
        push: pushFn,
      }));

      const { SignOut } = require('./SignOut');
      render(<SignOut />);

      expect(dispatchFn).toBeCalledTimes(2);
      expect(dispatchFn).toBeCalledWith({ type: AUTH_LOGOUT });
      expect(dispatchFn).toBeCalledWith({ type: 'PUSH_TYPE' });
  });
});
