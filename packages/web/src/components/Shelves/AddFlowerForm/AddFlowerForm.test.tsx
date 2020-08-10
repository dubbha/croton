import React from 'react';
import { render } from '@testing-library/react';
import { AddFlowerForm } from './AddFlowerForm';

describe('components/AddFlowerForm', () => {
  const fn = jest.fn();

  const props = {
    onSubmit: fn
  };

  afterEach(() => {
    fn.mockReset();
  });

  it('should render successfully', () => {
    const { container } = render(<AddFlowerForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
