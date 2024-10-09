import React from 'react';
import s from './Input.module.scss'

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  type?: 'text' | 'password';
  placeholder?: string;
  isLabel?: boolean;
}

export const Input = ({ value, onChange, onFocus, isLabel = true, type = "text", placeholder}: InputProps) => {
  const onChangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={s.formInput}>
      <input
        type={type}
        value={value}
        onChange={onChangeChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      {isLabel && <label>{placeholder}</label>}
    </div>
  );
};