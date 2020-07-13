import React from 'react';

type Props = {
  height?: string;
};

export const AlertPlaceholder = ({ height = '50px' }: Props) => (
  <div style={{ height, marginBottom: '16px' }} />
);
