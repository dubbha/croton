import React from 'react';

type Props = {
  children: React.ReactNode | React.ReactNode[],
}

export const Container = ({ children }: Props) => (
  <div className="container">
    {children}
  </div>
);
