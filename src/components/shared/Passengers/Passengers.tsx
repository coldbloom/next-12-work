import s from './Passengers.module.scss';

import { PassengerCounter } from '@/components/shared/PassengerCounter'

import { searchTripStore } from '@/store/searchTripStore';
import { observer } from "mobx-react-lite";

export const Passengers = observer(() => {
  const { passengers } = searchTripStore;

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Выберите количество пассажиров</h2>
      <PassengerCounter
        value={passengers}
        increment={() => searchTripStore.incrementPassengers()}
        decrement={() => searchTripStore.decrementPassengers()}
      />
    </div>
  );
});