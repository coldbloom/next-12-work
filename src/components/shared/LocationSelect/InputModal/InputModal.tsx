import s from './InputModal.module.scss';
import cn from 'classnames';
import Icon from "@mdi/react";
import {mdiArrowLeft, mdiClose} from "@mdi/js";

type InputModalProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  placeholder?: string;
  isError?: boolean;
}

export const InputModal = ({ name, value, onChange, onClose, placeholder, isError }: InputModalProps) => {
  return (
    <div className={cn(s.fieldWrapper, {[s.error]: isError})}>
      <button onClick={onClose}>
        <Icon path={mdiArrowLeft} size={"24px"} className={s.icon}/>
      </button>
      <input
        name={name}
        type="text"
        autoFocus={true}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value.length > 0 && (
        <button onClick={() => onChange('')}>
          <Icon path={mdiClose} size={"24px"} className={s.icon}/>
        </button>
      )}
    </div>
  );
};