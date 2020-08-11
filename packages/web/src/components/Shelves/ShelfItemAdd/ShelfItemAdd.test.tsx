import React from 'react';
import { render } from '@testing-library/react';
import { ShelfItemAdd } from './ShelfItemAdd';

describe('components/ShelfItemAdd', () => {
  const props = {
    onSelect: () => {},
  };

  it('should render successfully', () => {
    const { container } = render(<ShelfItemAdd {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
