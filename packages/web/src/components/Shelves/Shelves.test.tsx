import React from 'react';
import { render } from '@testing-library/react';
import { Shelves } from './Shelves';

describe('components/Shelves', () => {
  it('should render successfully', () => {
    const { container } = render(<Shelves />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
