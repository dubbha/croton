import React from 'react';
import { render } from '@testing-library/react';
import { ShelfItem } from './ShelfItem';

describe('components/ShelfItem', () => {
  const props = {
    id: 12,
    name: 'name',
    location: 'location',
    description: 'description',
    onSelect: () => {},
  };

  it('should render successfully', () => {
    const { container } = render(<ShelfItem {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
