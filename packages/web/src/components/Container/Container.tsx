import React from 'react';
import classnames from 'classnames';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export const Container = ({ children, className }: Props) => (
  <div className={classnames(['container', className])}>{children}</div>
);
