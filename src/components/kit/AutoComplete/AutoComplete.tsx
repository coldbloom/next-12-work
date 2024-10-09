import React, { useRef, useState, useEffect } from 'react';
import {DropDown} from "@/components/kit/DropDown/DropDown";

type AutoCompleteProps = {}

export const AutoComplete = () => {
  const [value, setValue] = useState<string>('');
  const debounceTimeout = useRef<number | null>(null); // Хранит ссылку на текущий таймаут

  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const onChange = (newValue: string) => {
    setValue(newValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Очищаем предыдущий таймер
    }

    debounceTimeout.current = window.setTimeout(() => {
      console.log(newValue); // Логируем значение после задержки
      setOpenDropDown(true);
    }, 650); // 300 мс задержка
  }

  useEffect(() => {
    console.log(openDropDown);
  }, [openDropDown]);

  return (
    <div>
      <DropDown
        open={openDropDown}
        onClose={() => setOpenDropDown(false)}
        anchor={ref => (
          <input ref={ref} value={value} onChange={e => onChange(e.target.value)}/>
        )}
      >
        <DropDown.Item key="1">1</DropDown.Item>
        <DropDown.Item key="2">2</DropDown.Item>
      </DropDown>
      {/*<input value={value} onChange={e => onChange(e.target.value)} />*/}
    </div>
  );
};