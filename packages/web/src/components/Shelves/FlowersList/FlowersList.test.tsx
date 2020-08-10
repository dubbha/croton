import React from 'react';
import { render } from '@testing-library/react';
import { FlowersList } from './FlowersList';

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('components/FlowersList', () => {
  const props = {
    shelvesList: [{
      id: '',
      name: '',
      description: ''
    }]
  }
  it('should render successfully', () => {
    const { container } = render(<FlowersList {...props} />);

    expect(container.firstChild).toMatchSnapshot();

  });
});
