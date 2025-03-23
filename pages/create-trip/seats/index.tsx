import { useRouter } from "next/router";
import { LayoutContainer } from '@/components/layouts/LayoutContainer';

import { GoBackBtn } from '@/components/kit/GoBackBtn';
import { Button } from '@/components/kit/Button';
import {PassengerCounter} from '@/components/shared/PassengerCounter'
import { observer } from 'mobx-react-lite';
import { tripStore } from '@/store/createTripStore'

import s from './Seats.module.scss';
import {Heading} from "@/components/kit/Heading/Heading";

// seats = места, сидения
const Seats = observer(() => {
  const { passengers, cityFrom } = tripStore;
  const router = useRouter();

  if (!cityFrom) {
    router.push('/create-trip');
  }

  //@FIXME возможно следующим будет страница description
  const handleContinue = () => router.push('/create-trip/price');

  const increment = () => {
    tripStore.updatePassengers(passengers + 1);
  }

  const decrement = () => {
    tripStore.updatePassengers(passengers - 1);
  }

  return (
    <LayoutContainer>
      <div className={s.formWrapper}>
        <GoBackBtn onClick={() => router.push('date-time')} />
        {/*<h1>Cколько попутчиков возьмете в дорогу?</h1>*/}
        <Heading variant="dark">Cколько попутчиков возьмете в дорогу?</Heading>
        <PassengerCounter increment={increment} decrement={decrement} value={passengers} className={s.passengers} />
      </div>

      <Button variant="continue" onClick={handleContinue}>Далее</Button>
    </LayoutContainer>
  );
});

export default Seats;