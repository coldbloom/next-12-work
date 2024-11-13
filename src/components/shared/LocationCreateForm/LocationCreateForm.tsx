import { mdiHomeSearchOutline, mdiMapMarkerRadiusOutline, mdiMapSearchOutline } from "@mdi/js";
import Icon from "@mdi/react";

import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import cn from "classnames";
import {useRouter} from "next/router";
import {Location} from "@/utils/types";
import {GoBackBtn} from "@/components/kit/GoBackBtn";
import s from './LocationCreateForm.module.scss';
import {Button} from "@/components/kit/Button";

type LocationCreateFormProps = {
  mode: 'from' | 'to';
  city: Location | null;
  street: Location | null;
  building: Location | null;
  setActiveField: Dispatch<SetStateAction<number | null>>
  arrivalCityError?: boolean; // ошибка в случае если город отправления совпадает с городом прибытия
};

export const LocationCreateForm = ({ mode, city, street, building, setActiveField, arrivalCityError }: LocationCreateFormProps) => {
  const [streetError, setStreetError] = useState(false);
  const [buildingError, setBuildingError] = useState(false);

  const isFromMode = mode === 'from';

  const router = useRouter();
  const handleContinue = () => router.push(isFromMode ? '/create-trip/to' : '/create-trip/date-time');

  const handleStreet = () => {
    if (!city) {
      setStreetError(true);
    } else {
      setActiveField(2);
    }
  };

  const handleBuilding = () => {
    if (!street) {
      setBuildingError(true)
    } else {
      setActiveField(3);
    }
  };

  useEffect(() => {
    streetError && setStreetError(false);
    buildingError && setBuildingError(false);
  }, [city, street]);

  console.log(arrivalCityError, ' arrivalCityError')

  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <GoBackBtn/>
        <h1>{isFromMode ? 'Откуда вы выезжаете?' : 'Куда вы едете?'}</h1>
        <Button
          variant="input"
          onClick={() => setActiveField(1)}
          error={arrivalCityError}
          errorText="Город прибытия совпадает с городом отправления! Выберетие другой город прибытия."
          className={cn({[s.filled]: city})}
          iconLeft={<Icon path={mdiMapMarkerRadiusOutline} size="24px"/>}
        >
          {city?.name ?? (isFromMode ? 'Город отправления' : 'Город прибытия')}
        </Button>
        <Button
          variant="input"
          onClick={handleStreet}
          active={!!city}
          error={streetError}
          errorText="Укажите город перед выбором улицы!"
          iconLeft={<Icon path={mdiMapSearchOutline} size="24px"/>}
        >
          {street && <span>{street?.typeShort}.&nbsp;</span>}
          <span className={cn({[s.filled]: street})}>{street?.name ?? 'Улица'}</span>
        </Button>
        <Button
          variant="input"
          onClick={handleBuilding}
          active={!!street}
          error={buildingError}
          errorText="Укажите улицу перед выбором дома!"
          iconLeft={<Icon path={mdiHomeSearchOutline} size="24px"/>}
        >
          {building && <span>{building?.typeShort}.&nbsp;</span>}
          <span className={cn({[s.filled]: building})}>{building?.name ?? 'Дом'}</span>
        </Button>
      </div>
      <Button variant="continue" disabled={!city || arrivalCityError} onClick={handleContinue} style={{ marginBottom: '100px'}} >
        Далее
      </Button>
    </div>
  );
};