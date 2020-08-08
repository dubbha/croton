import React from 'react';
import { render } from '@testing-library/react';

jest.mock('components/Header', () => {
  const React = require('react');
  return {
    Header: () => <div>Header</div>
  };
});

jest.mock('components/Footer', () => {
  const React = require('react');
  return {
    Footer: () => <div>Footer</div>
  };
});

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('pages/FlowerShelfsManagement', () => {
  it('should render successfully if user is logged in', () => {
    jest.isolateModules(() => {
      const fn = jest.fn();
      jest.doMock('react-redux', () => ({
        useDispatch: () => fn,
        useSelector: () => ({
          token: 'TOKEN',
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          email: 'EMAIL'
        })
      }));

      const { FlowerShelfsManagement } = require('./FlowerShelfsManagement');

      const { container } = render(<FlowerShelfsManagement />);

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
          email: null
        })
      }));

      const { FlowerShelfsManagement } = require('./FlowerShelfsManagement');

      render(<FlowerShelfsManagement />);

      expect(fn).toBeCalledWith({
        type: 'callHistoryMethod',
        payload: { path: '/signin' }
      });
    });
  });
});
