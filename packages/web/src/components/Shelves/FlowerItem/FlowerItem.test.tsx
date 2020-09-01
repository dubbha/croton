import React from 'react';
import { render } from '@testing-library/react';
import { FlowerItem } from './FlowerItem';

describe('components/FlowerItem', () => {
  const props = {
    id: 0,
    name: '',
    location: '',
    description: '',
    addNew: false,
    onSelect: () => {},
  };

  it('should render successfully', () => {
    const { container } = render(<FlowerItem {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
