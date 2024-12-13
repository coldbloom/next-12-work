import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import s from './AuthButton.module.scss';
import cn from 'classnames';

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant: 'local' | 'google';
} & PropsWithChildren;

export const AuthButton = ({
  variant,
  children,
  className,
  ...otherProps
}: AuthButtonProps) => {
  const lastAuthMethod = localStorage.getItem('lastAuthMethod');
  return (
    <button {...otherProps} className={cn(s.authButton, className)}>
      {lastAuthMethod === variant && <div className={s.lastAuthInfo}>Последний вход</div>}
      {children}
    </button>
  );
};