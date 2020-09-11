import React from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  inner?: boolean;
};

export const Container = ({ inner, children }: Props) => (
  <div
    className={
      classNames(
        'container',
        { 'container-inner': inner },
      )
    }
  >
    {children}
  </div>
);
