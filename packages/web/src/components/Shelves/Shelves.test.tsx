import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Shelves } from './Shelves';

jest.mock('./ShelfList', () => ({
  ShelfList: () => <div>Shelf List</div>,
}));

describe('components/Shelves', () => {
  it('should render successfully', () => {
    const { container } = render(<Shelves />, { wrapper: MemoryRouter });

    expect(container.firstChild).toMatchSnapshot();
  });
});
