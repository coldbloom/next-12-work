import { Dispatch, SetStateAction } from 'react';
import s from './Passengers.module.scss';

import { TravelSearchFormData } from '@/components/shared/MainForm';
import { PassengerCounter } from '@/components/shared/PassengerCounter'

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
      <PassengerCounter increment={increment} decrement={decrement} value={value}/>
    </div>
  );
};