import { mdiCalendarMonthOutline, mdiClockTimeFourOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { LayoutContainer } from "../index";
import { GoBackBtn } from "@/components/kit/GoBackBtn";
import cn from "classnames";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Store from '../store';

import s from './DateTime.module.scss'
import {ModalPageWindow} from "@/components/kit/ModalPageWindow";
import {DatePicker} from "@/components/kit/Calendar";
import {formatDate} from "@/utils/functions";

// @ts-ignore
// import { TimePicker } from 'react-ios-time-picker';
import {MyTimePicker} from "@/components/kit/MyTimePicker";

const DateTime = observer(() => {
  const [activeField, setActiveField] = useState<number | null>(null)

  const { date, time } = Store;

  const router = useRouter();
  const handleContinue = () => router.push('/create-trip/description');

  const closeModal = (num?: number) => setActiveField(num ?? null);

  const onChangeDate = (selectedDate: Date) => {
    Store.updateDate(selectedDate);
    closeModal(0);
  };

  const onChangeTime = (selectedTime: string) => {
    Store.updateTime(selectedTime);
    closeModal(0);
  };

  useEffect(() => {
    console.log(activeField, ' activeField')
  }, [activeField]);

  const [value, setValue] = useState('10:00');

  const onChange = (timeValue: any) => {
    setValue(timeValue);
  }

  return (
    <LayoutContainer>
      <div className={s.wrapper}>
        <div className={s.formWrapper}>
          <GoBackBtn/>
          <h1>Выберите дату и время поездки</h1>
          <button onClick={() => setActiveField(1)} className={cn(s.buttonInput, {[s.filled]: date})}>
            <Icon path={mdiCalendarMonthOutline} size="24px"/>
            {!date ? 'Дата' : formatDate(date)}
          </button>
          <button onClick={() => setActiveField(2)} className={cn(s.buttonInput)}>
            <Icon path={mdiClockTimeFourOutline} size="24px"/>
            {time ?? 'Время'}
          </button>
        </div>
        {/*<input*/}
        {/*  type="time"*/}
        {/*  value={time}*/}
        {/*  onChange={(e) => setTime(e.target.value)}*/}
        {/*/>*/}

        {/*<div className={s.timePicker}>*/}
        {/*  <div className={s.buttonsWrapper}>*/}
        {/*    <button>Отмена</button>*/}
        {/*    <button>Сохранить</button>*/}
        {/*  </div>*/}
        {/*  <div>*/}

        {/*  </div>*/}
        {/*</div>*/}

        <MyTimePicker
          value={value}
          onChange={(value) => console.log(value)}
          onFocus={(value) => console.log(value, 'focus')}
          onSave={(value) => console.log(value, ' onSave')}
        />
        <button
          //disabled={!city}
          className={cn(s.continueButton, {[s.disabled]: false})}
          onClick={handleContinue}
        >
          Далее
        </button>
      </div>

      <ModalPageWindow
        isOpen={!!activeField}
        onClose={() => closeModal(0)}
        style={{ height: '380px' }}
        exitActiveFast={true}
      >
        <div className={s.modalWrapper}>
          {activeField === 1 && (
            <DatePicker
              selectedDate={date}
              onChangeDate={(newDate) => onChangeDate(newDate)}
            />
          )}
          {activeField === 2 && (
            <div className={s.timePickerWrapper}>
              <MyTimePicker
                value={time}
                onChange={(value) => onChangeTime(value)}
                onFocus={(value) => console.log(value, 'focus')}
                onSave={(value) => console.log(value, ' onSave')}
              />
            </div>
          )}
        </div>
      </ModalPageWindow>
    </LayoutContainer>
  );
});

export default DateTime;