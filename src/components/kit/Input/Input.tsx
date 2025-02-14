import React, { forwardRef, Ref, CSSProperties, useRef, useState, ChangeEvent, HTMLProps} from 'react';
import s from './Input.module.scss'
import cn from 'classnames';
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

type InputProps = {
  value?: string;
  onFocus?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  isLabel?: boolean;
  autoFocus?: boolean;
  className?: string;
  classNameWrapper?: string;
  style?: CSSProperties;
} & HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onFocus,
  onBlur,
  isLabel = true,
  type = "text",
  error,
  placeholder,
  autoFocus,
  className,
  classNameWrapper,
  style,
  ...props
}, ref) => {

  if (type === "submit") {
    return (
      <input type={type} value={value} className={cn(s.submitButton, className)} {...props} />
    )
  }

  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onPasswordVisible = () => setPasswordVisible(prev => !prev);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputId = useRef(`input-${Math.random().toString(36).substr(2, 9)}`).current;

  return (
    <div className={cn(s.wrapper, classNameWrapper)}>
      <div className={cn(s.formInput, className, {[s.error]: error})}>
        <input
          id={inputId}
          type={passwordVisible ? "text" : type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          ref={ref}
          {...props}
        />
        {isLabel &&
          <label
            htmlFor={inputId}
            className={cn({[s.focus]: isFocused && value?.length !== 0, [s.error]: error && value?.length !== 0})}
          >
            {placeholder}
          </label>
        }
        {type === 'password' && (
          <div
            onClick={onPasswordVisible}
            aria-label={passwordVisible ? "Скрыть пароль" : "Показать пароль"}
            className={s.eyesButton}
          >
            <Icon path={passwordVisible ? mdiEyeOffOutline : mdiEyeOutline} size="24px"/>
          </div>
        )}
      </div>
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
});