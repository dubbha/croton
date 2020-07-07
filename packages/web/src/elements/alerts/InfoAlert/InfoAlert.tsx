import React from 'react';
import Alert from 'react-bootstrap/Alert';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const InfoAlert = ({ children }: Props) => (
  <Alert variant="info" data-testid="infoAlert">
    {children}
  </Alert>
);
