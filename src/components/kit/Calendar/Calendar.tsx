import { useMemo } from 'react';
// @ts-ignore
import { ru } from "react-day-picker/locale";
import s from './Calendar.module.scss';
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import classNames from "react-day-picker/style.module.css";
import {Location} from "@/utils/types"; //дока библиотечных стилей

type CalendarProps = {
  selectedDate?: Date;
  onCloseModal: () => void;
  handleFormChange: (value: Location | Date | number, name: string) => void;
}

export const Calendar = ({ selectedDate, onCloseModal, handleFormChange }: CalendarProps) => {
  const defaultClassNames = getDefaultClassNames();
  // Функция для создания массива дат за текущий месяц до сегодняшней даты
  const disabledDates = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Создаем массив с датами от 1-го числа текущего месяца до вчерашнего дня
    return Array.from({ length: today.getDate() - 1 }, (_, i) =>
      new Date(year, month, i + 1));
  }, []);

  const onSelect = (selectedDate: Date) => {
    handleFormChange(selectedDate, 'date');
    onCloseModal();
  }

  return (
    <DayPicker
      mode="single"
      required={true}
      timeZone="Europe/Moscow"
      captionLayout="label"
      locale={ru}
      selected={selectedDate} // Устанавливаем выделенную дату
      onSelect={onSelect} // Обработка выбора даты
      disabled={disabledDates} // Установленные недоступные даты
      startMonth={new Date()} // Выбор даты осуществляется только с текущего месяца
      defaultMonth={selectedDate}
      className={s.calendarWrapper}
      classNames={{ today: s.today, disabled: s.disabledDates, weekday: s.weekday, month: s.month, selected: `${defaultClassNames.selected} ${s.selected}` }}
    />
  );
};