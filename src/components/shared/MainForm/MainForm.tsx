import { mdiCalendarMonthOutline, mdiAccountMultipleOutline, mdiMapMarkerRadiusOutline, mdiSwapVertical } from '@mdi/js';
import Icon from '@mdi/react';

import s from './MainForm.module.scss';
import cn from 'classnames';

import { useEffect, useState } from 'react';

import { ModalPageWindow } from '@/components/kit/ModalPageWindow';
import { HeadingText } from "@/components/kit/HeadingText/HeadingText";
import { DatePicker } from "@/components/kit/Calendar";
import { LocationSelect } from '../LocationSelect';

import { getPassengerString, formatDate } from '@/utils/functions'
import { Location } from '@/utils/types';
import { Passengers } from '../Passengers';

export type TravelSearchFormData = {
  cityFrom: Location | null;
  cityTo: Location | null;
  date: Date;
  passengers: number;
};

type ButtonInputProps = {
  iconPath?: string;
  placeholder?: string;
  onClick?: () => void;
  className?: string;
  value?: string | number;
  error?: boolean;
};

const ButtonInput = ({ iconPath, placeholder, onClick, className, value, error = false }: ButtonInputProps) => {
  // Логика для отображения значения на кнопке
  const displayValue = typeof value === 'number'
    ? getPassengerString(value) // Если value - число, отображаем с правильным склонением
    : (value ?? placeholder); // Иначе, если есть значение, отображаем его, или показываем placeholder

  return (
    <button onClick={onClick} className={cn(s.buttonInput, {[s.disabledColor]: !value}, {[s.error]: error}, className)}>
      {iconPath && <Icon path={iconPath} className={s.icon} />}
      <span>{displayValue}</span>
    </button>
  )
};

export const MainForm = () => {
  const [activeField, setActiveField] = useState<number | null>(null);
  const [formData, setFormData] = useState<TravelSearchFormData>({
    cityFrom: null,
    cityTo: null,
    date: new(Date),
    passengers: 1,
  });

  const [errorFrom, setErrorFrom] = useState(false);
  const [errorTo, setErrorTo] = useState(false);

  const { cityFrom: from, cityTo: to, date, passengers} = formData;

  const swapVisible = !errorTo && !errorFrom && (!!from || !!to);

  const closeModal = (num?: number) => setActiveField(num ?? null);

  const handleLocation = (value: Location, fieldName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value, // Обновляем только нужное поле
    }));
    closeModal();
  }

  const handleDate = (selectedDate: Date) => {
    setFormData(prevState => ({
      ...prevState,
      date: selectedDate,
    }));
    closeModal(0);
  }

  const swap = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      cityFrom: prevFormData.cityTo,
      cityTo: prevFormData.cityFrom,
    }));
  };

  // @fixme потребуется ли мне эта функция или выпилить?
  // const handleClearInput = (name: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: '', // Очищаем значение для конкретного поля
  //   }));
  // };

  const handleSearchInput = () => {
    if (!from) {
      setErrorFrom(true);
    }
    if (!to) {
      setErrorTo(true);
    }
  };

  useEffect(() => {
    if (from && errorFrom) {
      setErrorFrom(false);
    }
    if (to && errorTo) {
      setErrorTo(false);
    }
  }, [from, to]);

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.backgroundColorWrapper}/>
        {/*Проработать заголовок главной*/}
        {/*<HeadingText style={{ zIndex: 2 }}>Находите попутчиков и путешествуйте по самым выгодным ценам!</HeadingText>*/}
        <HeadingText style={{ zIndex: 2 }}>Сервис поиска автомобильных попутчиков без комиссии!</HeadingText>
        <div className={s.paddingWrapper}>
          <div className={s.formWrapper}>
            <ButtonInput
              placeholder="Город отправления"
              iconPath={mdiMapMarkerRadiusOutline}
              onClick={() => setActiveField(1)}
              value={from?.name}
              error={errorFrom}
            />
            <div className={s.swapWrapper}>
              <hr className={cn({[s.hr]: swapVisible})}/>
              {swapVisible && (
                <button onClick={swap}>
                  <Icon path={mdiSwapVertical} size="30px" className={s.iconSwap} />
                </button>
              )}
            </div>
            <ButtonInput
              placeholder="Город прибытия"
              iconPath={mdiMapMarkerRadiusOutline}
              onClick={() => setActiveField(2)}
              value={to?.name}
              error={errorTo}
            />
            <hr/>
            <ButtonInput
              iconPath={mdiCalendarMonthOutline}
              onClick={() => setActiveField(3)}
              value={formatDate(date)}
            />
            <hr/>
            <ButtonInput
              iconPath={mdiAccountMultipleOutline}
              className={s.marginBottom}
              onClick={() => setActiveField(4)}
              value={passengers}
            />
            <button className={s.searchButton} onClick={handleSearchInput}>Поиск</button>
          </div>
        </div>
      </div>
      <ModalPageWindow
        isOpen={!!activeField}
        onClose={() => closeModal(0)}
        style={{ ...((activeField === 3 || activeField === 4 || activeField === 0) && { height: '380px' }) }}
        exitActiveFast={(activeField === 3 || activeField === 4 || activeField === 0) && true}
      >
        <div className={s.modalWrapper}>
          {activeField === 1 && (
            <LocationSelect
              fieldName="cityFrom"
              initialValue={from?.name}
              onClose={() => closeModal()}
              handleFormChange={handleLocation}
              params={{ location: 'city', limit: 25 }}
              // handleClear={handleClearInput}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName="cityTo"
              initialValue={to?.name}
              onClose={() => closeModal()}
              handleFormChange={handleLocation}
              params={{ location: 'city', limit: 25 }}
            />
          )}
          {activeField === 3 && (
            <DatePicker
              selectedDate={formData.date}
              onChangeDate={handleDate}
            />
          )}
          {activeField === 4 && (
            <Passengers
              value={formData.passengers}
              setFormData={setFormData}
            />
          )}
        </div>
      </ModalPageWindow>
    </>
  );
};