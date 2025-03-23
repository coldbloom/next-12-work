import { mdiCalendarMonthOutline, mdiClockTimeFourOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { LayoutContainer } from "@/components/layouts/LayoutContainer";
import { GoBackBtn } from "@/components/kit/GoBackBtn";
import cn from "classnames";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { tripStore } from '@/store/createTripStore';

import s from './DateTime.module.scss'
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { DatePicker } from "@/components/kit/Calendar";
import { Button } from "@/components/kit/Button";
import { formatDate } from "@/utils/functions";

import { MyTimePicker } from "@/components/kit/MyTimePicker";
import {Heading} from "@/components/kit/Heading/Heading";

const FIELDS = {
  DATE: 1,
  TIME: 2,
};

const DateTime = observer(() => {
  const [activeField, setActiveField] = useState<number | null>(null)
  const [isError, setIsError] = useState<boolean>(false);
  const [defaultTime, setDefaultTime] = useState<string>('10:00');

  const { date, time, cityTo } = tripStore;
  const router = useRouter();

  // Проверка на наличие cityTo до рендера
  if (!cityTo) {
    router.push('/create-trip');
    return null; // Останавливаем рендер компонента
  }

  const handleContinue = () => router.push('/create-trip/seats');

  const closeModal = () => setActiveField(null);

  const onChangeDate = (selectedDate: Date) => {
    tripStore.updateDate(selectedDate);
    closeModal();
  };

  const onChangeTime = (selectedTime: string) => {
    tripStore.updateTime(selectedTime);
    closeModal();
  };
  
  const formattedDate = useMemo(() => {
    return date ? formatDate(date) : null;
  }, [date]);

  useEffect(() => {
    if (formattedDate === 'Сегодня' && time) {
      // Разбиваем выбранное время на часы и минуты
      const [selectedHours, selectedMinutes] = time.split(':').map(Number);

      const now = new Date();

      const selectedDateTime = new Date(now);
      selectedDateTime.setHours(selectedHours, selectedMinutes, 0, 0);
      setIsError(selectedDateTime < now);
    } else if (formattedDate !== 'Сегодня' && isError) {
      setIsError(false);
    }
  }, [time, formattedDate]);

  useEffect(() => {
    if (formattedDate === 'Сегодня') {
      const now = new Date();
      const currentHour = now.getHours();
      if (currentHour >= 10 && currentHour < 23) {
        setDefaultTime(`${currentHour + 1}:00`);
      } else if (currentHour === 23) {
        //@FIXME временное решение
        const currentMinutes = now.getMinutes();
        setDefaultTime(`23:${currentMinutes}`);
      }
    } else if (formattedDate !== 'Сегодня' && defaultTime !== '10:00') {
      setDefaultTime('10:00');
    }
  }, [formattedDate, defaultTime]);

  return (
    <LayoutContainer>
      <>
        <div className={s.formWrapper}>
          <GoBackBtn onClick={() => router.push('to')} />
          {/*<h1>Выберите дату и время поездки</h1>*/}
          <Heading variant="dark">Выберите дату и время поездки</Heading>
          <Button
            variant="input"
            onClick={() => setActiveField(FIELDS.DATE)}
            iconLeft={<Icon path={mdiCalendarMonthOutline} size="24px"/>}
            className={cn({[s.filled]: date})}
          >
            {!date ? 'Дата' : formattedDate}
          </Button>
          <Button
            variant="input"
            onClick={() => setActiveField(FIELDS.TIME)}
            className={cn({[s.filled]: time})}
            iconLeft={<Icon path={mdiClockTimeFourOutline} size="24px"/>}
            error={isError}
            errorText="Время выезда не может быть меньше текущего"
          >
            {time ?? 'Время'}
          </Button>
        </div>
        <Button variant="continue" onClick={handleContinue} disabled={!date || !time || isError}>Далее</Button>
      </>

      <ModalPageWindow
        isOpen={!!activeField}
        onClose={() => closeModal()}
        style={{ height: '380px' }}
        exitActiveFast={true}
      >
        <div className={s.modalWrapper}>
          {activeField === FIELDS.DATE && (
            <DatePicker
              selectedDate={date}
              onChangeDate={(newDate) => onChangeDate(newDate)}
            />
          )}
          {activeField === FIELDS.TIME && (
            <div className={s.timePickerWrapper}>
              <MyTimePicker
                value={time}
                onChange={(value) => onChangeTime(value)}
                onCancel={() => closeModal()}
                pickerDefaultValue={defaultTime}
              />
            </div>
          )}
        </div>
      </ModalPageWindow>
    </LayoutContainer>
  );
});

export default DateTime;