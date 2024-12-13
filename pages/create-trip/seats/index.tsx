import React from 'react';
import { LayoutContainer } from "../index";

import { GoBackBtn } from "@/components/kit/GoBackBtn";
import {Button} from "@/components/kit/Button";
import cn from "classnames";
import s from './Seats.module.scss';
import Icon from "@mdi/react";
import {mdiMinusCircleOutline, mdiPlusCircleOutline} from "@mdi/js";
import {observer} from "mobx-react-lite";
import Store from "@/store/createTripStore";

// seats = места, сидения
const Seats = observer(() => {
  const { passengers } = Store;

  const increment = () => {
    Store.updatePassengers(passengers + 1);
  }

  const decrement = () => {
    Store.updatePassengers(passengers - 1);
  }
  return (
    <LayoutContainer>
      <div className={s.wrapper}>
        <div className={s.formWrapper}>
          <GoBackBtn/>
          <h1>Cколько попутчиков возьмете в дорогу?</h1>
          <div className={s.counterWrapper}>
            <button onClick={decrement} disabled={passengers === 1}>
              <Icon path={mdiMinusCircleOutline} size="48px" className={cn(s.icon, {[s.disabled]: passengers === 1})}/>
            </button>
            <p>{passengers}</p>
            <button onClick={increment} disabled={passengers === 8}>
              <Icon path={mdiPlusCircleOutline} size="48px" className={cn(s.icon, {[s.disabled]: passengers === 8})}/>
            </button>
          </div>
        </div>

        <Button variant="continue">Далее</Button>
      </div>
    </LayoutContainer>
  );
});

export default Seats;