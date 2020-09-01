import React from 'react';
import { render } from '@testing-library/react';
import { ShelfList } from './ShelfList';

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } }),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({ shelves: [{ id: 'id', name: 'name', location: 'description' }] }),
}));

describe('components/ShelfList', () => {
  it('should render successfully', () => {
    const { container } = render(<ShelfList />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
