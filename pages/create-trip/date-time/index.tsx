import { mdiCalendarMonthOutline, mdiClockTimeFourOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { LayoutContainer } from "../index";
import { GoBackBtn } from "@/components/kit/GoBackBtn";
import cn from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Store from '@/store/createTripStore';

import s from './DateTime.module.scss'
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { DatePicker } from "@/components/kit/Calendar";
import { Button } from "@/components/kit/Button";
import {formatDate} from "@/utils/functions";

import { MyTimePicker } from "@/components/kit/MyTimePicker";

const DateTime = observer(() => {
  const [activeField, setActiveField] = useState<number | null>(null)

  const { date, time, cityTo } = Store;

  const router = useRouter();
  const handleContinue = () => router.push('/create-trip/seats');

  const closeModal = (num?: number) => setActiveField(num ?? null);

  const onChangeDate = (selectedDate: Date) => {
    Store.updateDate(selectedDate);
    closeModal(0);
  };

  const onChangeTime = (selectedTime: string) => {
    Store.updateTime(selectedTime);
    closeModal(0);
  };

  // useEffect(() => {
  //   if (!cityTo) {
  //     router.push('/create-trip');
  //   }
  // }, []);

  return (
    <LayoutContainer>
      <div className={s.wrapper}>
        <div className={s.formWrapper}>
          <GoBackBtn/>
          <h1>Выберите дату и время поездки</h1>
          <Button
            variant="input"
            onClick={() => setActiveField(1)}
            iconLeft={<Icon path={mdiCalendarMonthOutline} size="24px"/>}
            className={cn({[s.filled]: date})}
          >
            {!date ? 'Дата' : formatDate(date)}
          </Button>
          <Button
            variant="input"
            onClick={() => setActiveField(2)}
            className={cn({[s.filled]: time})}
            iconLeft={<Icon path={mdiClockTimeFourOutline} size="24px"/>}
          >
            {time ?? 'Время'}
          </Button>
        </div>

        <Button variant="continue" onClick={handleContinue} disabled={!date || !time}>Далее</Button>
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
                onSave={(value) => console.log(value, ' onSave')}
                onCancel={() => closeModal(0)}
              />
            </div>
          )}
        </div>
      </ModalPageWindow>
    </LayoutContainer>
  );
});

export default DateTime;