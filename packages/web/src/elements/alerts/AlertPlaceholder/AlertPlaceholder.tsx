import React from 'react';

type Props = {
  height?: string;
};

export const AlertPlaceholder = ({ height = '38px' }: Props) => (
  <div style={{ height }} />
);
