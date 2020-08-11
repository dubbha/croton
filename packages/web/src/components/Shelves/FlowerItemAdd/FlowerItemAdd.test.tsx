import React from 'react';
import { render } from '@testing-library/react';
import { FlowerItemAdd } from '../FlowerItemAdd';

describe('components/FlowerItemAdd', () => {
  const props = {
    onSelect: () => {},
  };

  it('should render successfully', () => {
    const { container } = render(<FlowerItemAdd {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
