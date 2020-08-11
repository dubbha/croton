import React from 'react';
import { render } from '@testing-library/react';
import { ShelfItem } from './ShelfItem';

describe('components/ShelfItem', () => {
  const props = {
    key: '',
    name: '',
    location: '',
    description: '',
    addNew: false
  };

  it('should render successfully', () => {
    const { container } = render(<ShelfItem {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
