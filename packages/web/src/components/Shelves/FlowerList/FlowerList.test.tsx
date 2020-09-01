import React from 'react';
import { render } from '@testing-library/react';
import { FlowerList } from './FlowerList';

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } }),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({ flowers: [{ id: 'id', name: 'name', location: 'description' }] }),
}));

describe('components/FlowerList', () => {
  const props = {
    shelfId: 0,
    flowers: [{
      id: 1,
      name: 'name',
      description: 'desc',
    }],
  };
  it('should render successfully', () => {
    const { container } = render(<FlowerList {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
