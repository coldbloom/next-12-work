import React, { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react';

import cn from 'classnames';
import s from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant: 'input' | 'continue';
  disabled?: boolean;
  error?: boolean;
  active?: boolean; // пропс active отвечает за анимацию при клике на кнопку
  errorText?: string;
  className?: string;
  style?: CSSProperties;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export const Button = ({
  children,
  variant,
  disabled = false,
  error = false,
  active = true,
  errorText,
  className,
  style,
  iconLeft,
  iconRight,
  ...commonButtonProps
}: ButtonProps) => {
  return (
    <>
      <button
        {...commonButtonProps}
        disabled={disabled}
        style={style}
        className={cn(
          s.button, className,
          s[`variant-${variant}`],
          {[s.disabled]: disabled, [s.error]: error, [s.active]: active}
        )}
      >
        {iconLeft && <div className={cn(s.icon, s.iconLeft)}>{iconLeft}</div>}
        {children}
        {iconRight && <div className={cn(s.icon, s.iconRight)}>{iconRight}</div>}
      </button>
      {error && errorText && <p className={s.errorMessage}>{errorText}</p>}
    </>
  );
};