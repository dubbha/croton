import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ShelfForm } from './ShelfForm';

describe('components/AddShelfForm', () => {
  const fn = jest.fn();

  const props = {
    onSubmit: fn,
  };

  afterEach(() => {
    fn.mockReset();
  });

  it('should render successfully', () => {
    const { container } = render(<ShelfForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render submit button disabled by default', () => {
    const { container, getByTestId } = render(<ShelfForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(<ShelfForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const nameInput = getByTestId('shelfForm__name');
    const locationInput = getByTestId('shelfForm__location');
    const descriptionInput = getByTestId('shelfForm__description');
    const submitButton = getByTestId('submitButton');

    fireEvent.change(nameInput, { target: { value: 'name' } });
    fireEvent.change(locationInput, { target: { value: 'some location' } });
    fireEvent.change(descriptionInput, { target: { value: 'cool shelf' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(fn).toBeCalled();
  });
});
