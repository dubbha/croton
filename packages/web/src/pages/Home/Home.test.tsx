import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';

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

describe('pages/Home', () => {
  it('should render successfully', () => {
    const { container } = render(<Home />, { wrapper: MemoryRouter });
    expect(container.firstChild).toMatchSnapshot();
  });
});
