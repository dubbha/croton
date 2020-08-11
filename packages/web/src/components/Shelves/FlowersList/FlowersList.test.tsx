import React from 'react';
import { render } from '@testing-library/react';
import { FlowersList } from './FlowersList';

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}));

describe('components/FlowersList', () => {
  const props = {
    flowers: [{
      id: 1,
      name: 'name',
      description: 'desc'
    }]
  }
  it('should render successfully', () => {
    const { container } = render(<FlowersList {...props} />);

    expect(container.firstChild).toMatchSnapshot();

  });
});
