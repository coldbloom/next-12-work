import {mdiArrowLeft, mdiClose} from "@mdi/js";
import Icon from "@mdi/react";
import { useRef } from "react";
import cn from 'classnames';
import s from './InputModal.module.scss';

type InputModalProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  placeholder?: string;
  isError?: boolean;
}

export const InputModal = ({ name, value, onChange, onClose, placeholder, isError }: InputModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn(s.fieldWrapper, {[s.error]: isError})}>
      <button onClick={onClose}>
        <Icon path={mdiArrowLeft} size="24px" className={s.icon}/>
      </button>
      <input
        ref={inputRef}
        name={name}
        type="text"
        autoFocus={true}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value.length > 0 && (
        <button onClick={handleClear}>
          <Icon path={mdiClose} size="24px" className={s.icon}/>
        </button>
      )}
    </div>
  );
};