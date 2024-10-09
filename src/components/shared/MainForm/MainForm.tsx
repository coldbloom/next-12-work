import { mdiCalendarMonthOutline, mdiAccountMultipleOutline, mdiMapMarkerRadiusOutline, mdiSwapVerticalCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

import s from './MainForm.module.scss';
import cn from 'classnames';

import { useEffect, useState } from 'react';

import { ModalPageWindow } from '@/components/kit/ModalPageWindow';
import { Calendar } from '@/components/kit/Calendar';
import { LocationSelect } from '../LocationSelect';

import { getPassengerString, formatDate } from '@/utils/functions'
import { Location } from '@/utils/types';
import { Passengers } from '../Passengers';

export type TravelSearchFormData = {
  from: Location | null;
  to: Location | null;
  date: Date;
  passengers: number;
};

type ButtonInputProps = {
  iconPath?: string;
  placeholder?: string;
  onClick?: () => void;
  className?: string;
  value?: string | number;
};

const ButtonInput = ({ iconPath, placeholder, onClick, className, value }: ButtonInputProps) => {
  // Логика для отображения значения на кнопке
  const displayValue = typeof value === 'number'
    ? getPassengerString(value) // Если value - число, отображаем с правильным склонением
    : (value ?? placeholder); // Иначе, если есть значение, отображаем его, или показываем placeholder

  return (
    <button onClick={onClick} className={cn(s.buttonInput, {[s.disabledColor]: !value}, className)}>
      {iconPath && <Icon path={iconPath} className={s.icon} />}
      <span>{displayValue}</span>
    </button>
  )
};

export const MainForm = () => {
  const [activeField, setActiveField] = useState<number | null>(null);
  const [formData, setFormData] = useState<TravelSearchFormData>({
    from: null,
    to: null,
    date: new(Date),
    passengers: 1,
  });

  const closeModal = (num?: number) => setActiveField(num ?? null);

  useEffect(() => {
    console.log(activeField, ' 999')
  }, [activeField]);

  const handleFormChange = (value: Location | Date | number, fieldName: string) => {
    // Обновляем состояние, используя предыдущее значение
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value, // Обновляем только нужное поле
    }));
    closeModal();
  };

  const swap = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      from: prevFormData.to,
      to: prevFormData.from,
    }));
  };

  const handleClearInput = (name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: '', // Очищаем значение для конкретного поля
    }));
  };

  const { from, to, date, passengers} = formData;

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.backgroundColorWrapper}/>
        <h1>Находите попутчиков и путешествуйте по самым выгодным ценам!</h1>
        <div className={s.paddingWrapper}>
          <div className={s.formWrapper}>
            <ButtonInput
              placeholder="Город отправления"
              iconPath={mdiMapMarkerRadiusOutline}
              onClick={() => setActiveField(1)}
              value={from?.name}
            />
            <div className={s.swapWrapper}>
              <hr className={cn({[s.hr]: !!from || !!to})}/>
              {(!!from || !!to) && (
                <button onClick={swap}>
                  <Icon path={mdiSwapVerticalCircleOutline} size="30px" className={s.iconSwap} />
                </button>
              )}
            </div>
            <ButtonInput
              placeholder="Город прибытия"
              iconPath={mdiMapMarkerRadiusOutline}
              onClick={() => setActiveField(2)}
              value={to?.name}
            />
            <hr/>
            <ButtonInput
              placeholder="Сегодня"
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
            <button className={s.searchButton}>Поиск</button>
          </div>
        </div>
      </div>
      <ModalPageWindow
        isOpen={!!activeField}
        onClose={() => closeModal(0)}
        style={{ ...((activeField === 3 || activeField === 4 || activeField === 0) && { height: '345px' }) }}
        exitActiveFast={(activeField === 3 || activeField === 4 || activeField === 0) && true}
      >
        <div className={s.modalWrapper}>
          {activeField === 1 && (
            <LocationSelect
              fieldName="from"
              initialValue={from?.name}
              onClose={() => closeModal()}
              handleFormChange={handleFormChange}
              params={{ contentType: 'city', limit: 25 }}
              // handleClear={handleClearInput}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName="to"
              initialValue={to?.name}
              onClose={() => closeModal()}
              handleFormChange={handleFormChange}
              params={{ contentType: 'city', limit: 25 }}
            />
          )}
          {activeField === 3 && (
            <Calendar
              selectedDate={formData.date}
              handleFormChange={handleFormChange}
              onCloseModal={() => closeModal(0)}
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