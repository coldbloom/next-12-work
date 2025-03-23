import { ReactNode, CSSProperties, ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader } from '../Loader';

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
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
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
     loading,
     ...commonButtonProps
   }, ref) => {
    return (
      <>
        <button
          {...commonButtonProps}
          disabled={loading || disabled}
          style={style}
          className={cn(
            s.button,
            className,
            s[`variant-${variant}`],
            {[s.disabled]: disabled, [s.error]: error, [s.active]: active}
          )}
          ref={ref}
        >
          {iconLeft && <div className={cn(s.icon, s.iconLeft)}>{iconLeft}</div>}
          {!loading ? children : <Loader size="m" color="light" />}
          {iconRight && <div className={cn(s.icon, s.iconRight)}>{iconRight}</div>}
        </button>
        {error && errorText && <p className={s.errorMessage}>{errorText}</p>}
      </>
    );
  }
);