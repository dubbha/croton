import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Shelf } from 'store/shelf';
import { MoveFlowerForm } from './MoveFlowerForm';

describe('components/MoveFlowerForm', () => {
  const fn = jest.fn();
  const shelves = [
    { id: 1, name: 'Test Shelf 1' },
    { id: 2, name: 'Test Shelf 2' },
    { id: 3, name: 'Test Shelf 3' },
  ] as Shelf[];
  const info = 'Some info';
  const flowerName = 'Rose';

  it('should render successfully', () => {
    const { container } = render(
      <MoveFlowerForm
        onSubmit={fn}
        shelves={shelves}
        error={null}
        info={null}
        flowerName={flowerName}
      />,
      { wrapper: MemoryRouter },
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onSubmit prop on submit', () => {
    const { container, getByTestId } = render(
      <MoveFlowerForm
        onSubmit={fn}
        shelves={shelves}
        error={null}
        info={null}
        flowerName={flowerName}
      />,
      { wrapper: MemoryRouter },
    );
    expect(container.firstChild).toMatchSnapshot();

    const submitButton = getByTestId('submitButton');
    fireEvent.click(submitButton);
    expect(fn).toBeCalled();
  });

  it('should display error alert on error', () => {
    const error = 'ERROR';
    const { getByTestId } = render(
      <MoveFlowerForm
        onSubmit={fn}
        shelves={shelves}
        error={error}
        info={null}
        flowerName={flowerName}
      />,
      { wrapper: MemoryRouter },
    );

    const errorAlert = getByTestId('errorAlert');

    expect(errorAlert.textContent).toBe('ERROR');
  });

  it('should display info when flower is moved', () => {
    const { getByTestId } = render(
      <MoveFlowerForm
        onSubmit={fn}
        shelves={shelves}
        error={null}
        info={info}
        flowerName={flowerName}
      />,
      { wrapper: MemoryRouter },
    );

    const infoAlert = getByTestId('infoAlert');

    expect(infoAlert.textContent).toBe(info);
  });
});
