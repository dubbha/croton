import React from 'react';
import { render } from '@testing-library/react';
import { ErrorAlert } from './ErrorAlert';

describe('elements/ErrorAlert', () => {
  it('should render default error text by default', () => {
    const { getByTestId } = render(<ErrorAlert />);
    const errorAlert = getByTestId('errorAlert');
    expect(errorAlert.textContent).toBe('Error');
  })
})