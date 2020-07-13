import React from 'react';
import Button from 'react-bootstrap/Button';

type Props = {
  children?: React.ReactNode | React.ReactNode[],
  disabled?: boolean
}

export const SubmitButton = ({
  children = 'Submit',
  disabled = false,
}: Props) => (
  <Button variant="primary" type="submit" disabled={disabled} data-testid="submitButton">
    {children}
  </Button>
);
