import { mdiPlusCircleOutline, mdiMinusCircleOutline } from '@mdi/js';
import Icon from "@mdi/react";

import {Dispatch, SetStateAction} from 'react';
import cn from 'classnames';
import s from './Passengers.module.scss';

import { TravelSearchFormData } from "@/components/shared/MainForm";

type PassengersProps = {
  value: number;
  setFormData: Dispatch<SetStateAction<TravelSearchFormData>>;
};

export const Passengers = ({ value, setFormData }: PassengersProps) => {

  function increment(){
    setFormData(prevState => ({
      ...prevState,
      passengers: prevState.passengers + 1,
    }));
  }

  function decrement() {
    setFormData(prevState => ({
      ...prevState,
      passengers: prevState.passengers - 1,
    }))
  }

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Выберите количество пассажиров</h2>
      <div className={s.counterWrapper}>
        <button onClick={decrement} disabled={value === 1}>
          <Icon path={mdiMinusCircleOutline} size="48px" className={cn(s.icon, {[s.disabled]: value === 1})} />
        </button>
        <p>{value}</p>
        <button onClick={increment} disabled={value === 8}>
          <Icon path={mdiPlusCircleOutline} size="48px" className={cn(s.icon, {[s.disabled]: value === 8})} />
        </button>
      </div>
    </div>
  );
};