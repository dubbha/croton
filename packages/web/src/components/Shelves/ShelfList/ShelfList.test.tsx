import React from 'react';
import { render } from '@testing-library/react';
import { ShelfList } from './ShelfList';

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}));

describe('components/ShelfList', () => {
  const props = {
    shelves: [{
      id: 0,
      name: 'name',
      location: 'location',
      description: 'description',
    }]
  }
  it('should render successfully', () => {
    const { container } = render(<ShelfList {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
