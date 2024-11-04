import React, { useState } from 'react';
import TimePickerSelection from './TimePickerSelection';

type MyTimePickerProps = {
  value: string | null;
  cellHeight?: number;
  pickerDefaultValue?: string;
  onChange: (value: string) => void;
  onSave?: (value: string) => void;
  onCancel: () => void;
  cancelButtonText?: string;
  saveButtonText?: string;
  controllers?: boolean;
  seperator?: boolean;
}

export function MyTimePicker({
  value: initialValue = null,
  cellHeight = 28,
  pickerDefaultValue = '10:00',
  onChange = () => {},
  onSave = () => {},
  onCancel = () => {},
  cancelButtonText = 'Отмена',
  saveButtonText = 'Сохранить',
  controllers = true,
  seperator = true,
}: MyTimePickerProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const height = cellHeight;

  let finalValue = inputValue;

  if (initialValue === null) {
    finalValue = pickerDefaultValue;
  }

  const params = {
    onChange,
    height,
    onSave,
    onCancel,
    cancelButtonText,
    saveButtonText,
    controllers,
    setInputValue,
    seperator,
    initialValue: finalValue,
    pickerDefaultValue,
  };

  return (
    <TimePickerSelection {...params} />
  );
}
