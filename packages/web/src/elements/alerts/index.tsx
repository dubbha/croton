import React from 'react';
import Alert from 'react-bootstrap/Alert';

export { default as Alert } from 'react-bootstrap/Alert';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const ErrorAlert = ({ children = 'Error' }: Props) => (
  <Alert variant="danger" data-testid="errorAlert">
    {children}
  </Alert>
);

export const AlertPlaceholder = () => <div style={{ height: '50px', marginBottom: '16px' }} />;
