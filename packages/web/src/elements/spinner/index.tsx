import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const LoadingSpinner = () => (
  <Spinner
    as="span"
    animation="border"
    size="sm"
    role="status"
    aria-hidden="true"
  />
);
