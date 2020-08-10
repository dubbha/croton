import React from 'react';
import { render } from '@testing-library/react';
import { ShelfList } from './ShelfList';

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('components/ShelfList', () => {
  const props = {
    shelvesList: [{
      id: '',
      name: '',
      location: '',
      description: '',
      addNew: false
    }]
  }
  it('should render successfully', () => {
    jest.doMock('react-redux', () => ({
      useDispatch: () => jest.fn()
    }));
    const { container } = render(<ShelfList {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
