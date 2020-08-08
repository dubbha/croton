import React from 'react';
import { render } from '@testing-library/react';
import { ShelfList } from './ShelfList';

describe('components/ShelfList', () => {
  it('should render successfully', () => {
    const { container } = render(<ShelfList />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
