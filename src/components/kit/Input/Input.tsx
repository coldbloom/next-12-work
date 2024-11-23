import React, { CSSProperties, useRef, useState, ChangeEvent } from 'react';
import s from './Input.module.scss'
import cn from 'classnames';
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  isLabel?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Input = ({ value, onChange, onFocus, isLabel = true, type = "text", placeholder, className, style }: InputProps) => {

  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onPasswordVisible = () => setPasswordVisible(prev => !prev);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onChangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputId = useRef(`input-${Math.random().toString(36).substr(2, 9)}`).current;

  return (
    <div className={cn(s.formInput, className)} style={style}>
      <input
        id={inputId}
        type={passwordVisible ? "text" : type}
        value={value}
        onChange={onChangeChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {isLabel && <label htmlFor={inputId} className={cn({ [s.focus]: isFocused && value.length > 0})}>{placeholder}</label>}
      {type === 'password' && (
        <div
          onClick={onPasswordVisible}
          aria-label={passwordVisible ? "Скрыть пароль" : "Показать пароль"}
          className={s.eyesButton}
        >
          <Icon path={passwordVisible ? mdiEyeOffOutline : mdiEyeOutline} size="24px" />
        </div>
      )}
    </div>
  );
};