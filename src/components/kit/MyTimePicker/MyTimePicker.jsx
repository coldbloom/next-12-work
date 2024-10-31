import React, { useEffect, useState } from 'react';
import TimePickerSelection from './TimePickerSelection';

// type MyTimePickerProps = {
//   value: Date | null;
//   cellHeight: number;
//   pickerDefaultValue: string;
//   onChange: (value: Date) => void;
// }

export function MyTimePicker({
  value: initialValue = null,
  cellHeight = 28,
  pickerDefaultValue = '10:00',
  onChange = () => {},
  onFocus = () => {},
  onSave = () => {},
  onCancel = () => {},
  //disabled = false,
  //isOpen: initialIsOpenValue = false,
  //required = false,
  cancelButtonText = 'Cancel',
  saveButtonText = 'Save',
  controllers = false,
  seperator = true,
  //id = null,
  //use12Hours = false,
  onAmPmChange = () => {},
  //name = null,
  onOpen = () => {},
  //popupClassName = null,
  //inputClassName = null,
}) {
  const [inputValue, setInputValue] = useState(initialValue);
  const height = cellHeight;

  let finalValue = inputValue;

  if (initialValue === null) {
    finalValue = pickerDefaultValue;
  }

  // useEffect(() => {
  //   console.log(value, ' value');
  // }, [value]);

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
