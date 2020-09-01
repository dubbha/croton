import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('components/Header', () => {
  const React = require('react');
  return {
    Header: () => <div>Header</div>,
  };
});

jest.mock('components/Footer', () => {
  const React = require('react');
  return {
    Footer: () => <div>Footer</div>,
  };
});

jest.mock('components/ProfileHeader', () => {
  const React = require('react');
  return {
    ProfileHeader: () => <div>ProfileHeader</div>,
  };
});
jest.mock('components/ManageSocials/FbAuth', () => {
  const React = require('react');
  return {
    FbAuth: () => <button />,
  };
});
jest.mock('components/ManageSocials/GoogleAuth', () => {
  const React = require('react');
  return {
    GoogleAuth: () => <button />,
  };
});

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } }),
}));

describe('pages/Profile', () => {
  it('should render successfully if user is logged in', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => ({
          token: 'TOKEN',
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          email: 'EMAIL',
        }),
      }));

      const { Profile } = require('./Profile');

      const { container } = render(<Profile match={{ path: '/profile' }} />, {
        wrapper: MemoryRouter,
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should redirect to sing in if user is not logged in', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => ({
          token: null,
          firstName: null,
          lastName: null,
          email: null,
        }),
      }));

      const { Profile } = require('./Profile');

      render(<Profile match={{ path: '/profile' }} />, {
        wrapper: MemoryRouter,
      });

      expect(fn).toBeCalledWith({
        type: 'callHistoryMethod',
        payload: { path: '/signin' },
      });
    });
  });
});
