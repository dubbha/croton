import React from 'react';
import Button from 'react-bootstrap/Button';

type Props = {
  children?: React.ReactNode | React.ReactNode[],
}
export const LightButton = ({ children }: Props) => <Button variant="light">{children}</Button>;
