import React from 'react';
import { render } from '@testing-library/react';
import { SubmitButton } from './SubmitButton';

describe('elements/SubmitButton', () => {
  it('should render enabled by default', () => {
    const { getByTestId } = render(<SubmitButton />);
    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeEnabled();
  });
});
