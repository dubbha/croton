import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import { LoadingSpinner } from '../../spinner';
import { CheckIcon, TimesIcon } from '../../icons';

import './styles.scss';

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  variant?: ButtonProps['variant'];
  type?: ButtonProps['type'];
  disabled?: boolean;
  clickable?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isFailure?: boolean;
  onClick?: () => void;
  onNotificationTimeout?: () => void;
}

export const ButtonWithLoader = ({
  children = 'Submit',
  variant = 'primary',
  type = 'button',
  disabled = false,
  clickable = true,
  isLoading = false,
  isSuccess = false,
  isFailure = false,
  onClick = () => {},
  onNotificationTimeout = () => {},
}: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  useEffect(() => {
    let timer: number;
    if (!isLoading && (isSuccess || isFailure)) {
      setShowSuccess(isSuccess);
      setShowFailure(isFailure);

      timer = setTimeout(() => {
        setShowSuccess(false);
        setShowFailure(false);
        onNotificationTimeout();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isLoading, isSuccess, isFailure, onNotificationTimeout]);

  return (
    <Button
      variant={variant}
      type={type}
      disabled={disabled || isLoading || showSuccess || showFailure}
      onClick={onClick}
      data-testid="buttonWithLoader"
      className={
        classNames(
          'button-with-loader',
          { 'button-with-loader-error': showFailure },
          { 'button-with-loader-non-clickable': !clickable },
        )
      }
    >
      <div
        className={
          classNames(
            'button-with-loader-overlay',
            { 'button-with-loader-overlay-hidden': !isLoading && !showSuccess && !showFailure },
          )
        }
      >
        {isLoading && <LoadingSpinner />}
        {showSuccess && <CheckIcon size="2x" />}
        {showFailure && <TimesIcon size="2x" />}
      </div>
      {children}
    </Button>
  );
};
