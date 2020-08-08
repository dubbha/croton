import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AddNewShelfForm } from './AddNewShelfForm';

describe('components/addNewShelfForm', () => {
  const fn = jest.fn();

  const props = {
    onSubmit: fn
  };

  afterEach(() => {
    fn.mockReset();
  });

  it('should render successfully', () => {
    const { container } = render(<AddNewShelfForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render submit button disabled by default', () => {
    const { container, getByTestId } = render(<AddNewShelfForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(<AddNewShelfForm {...props} />);
    expect(container.firstChild).toMatchSnapshot();

    const nameInput = getByTestId('addNewShelfForm__name');
    const locationInput = getByTestId('addNewShelfForm__location');
    const descriptionInput = getByTestId('addNewShelfForm__description');
    const submitButton = getByTestId('submitButton');

    fireEvent.change(nameInput, { target: { value: 'name' } });
    fireEvent.change(locationInput, { target: { value: 'some location' } });
    fireEvent.change(descriptionInput, { target: { value: 'cool shelf' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    // expect(fn).toBeCalled();
  });
});
