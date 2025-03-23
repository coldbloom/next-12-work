import { mdiHomeSearchOutline, mdiMapMarkerRadiusOutline, mdiMapSearchOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Location } from "@/utils/types";
import { useRouter } from "next/router";
import { GoBackBtn } from "@/components/kit/GoBackBtn";
import { Button } from "@/components/kit/Button";

import cn from "classnames";
import s from './LocationCreateForm.module.scss';
import {Heading} from "@/components/kit/Heading/Heading";

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
  const handleGoBack = () => router.push(isFromMode? '/' : '/create-trip');

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

  return (
    <>
      <div className={s.formWrapper}>
        <GoBackBtn onClick={handleGoBack} />
        {/*<h1 style={{ fontSize: '24px' }}>{isFromMode ? 'Откуда вы выезжаете?' : 'Куда вы едете?'}</h1>*/}
        <Heading variant="dark">{isFromMode ? 'Откуда вы выезжаете?' : 'Куда вы едете?'}</Heading>
        <Button
          variant="input"
          onClick={() => setActiveField(1)}
          error={arrivalCityError}
          errorText="Город прибытия совпадает с городом отправления! Выберетие другой город прибытия."
          iconLeft={<Icon path={mdiMapMarkerRadiusOutline} size="24px"/>}
          // style={{ marginTop: '30px' }}
        >
          {city && <span>{city?.type}.&nbsp;</span>}
          <span className={cn({[s.filled]: city})}>{city?.name ?? (isFromMode ? 'Город отправления' : 'Город прибытия')}</span>
        </Button>
        <Button
          variant="input"
          onClick={handleStreet}
          active={!!city}
          error={streetError}
          errorText="Укажите город перед выбором улицы!"
          iconLeft={<Icon path={mdiMapSearchOutline} size="24px"/>}
        >
          {street && <span>{street?.type}.&nbsp;</span>}
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
          {building && <span>{building?.type}.&nbsp;</span>}
          <span className={cn({[s.filled]: building})}>{building?.name ?? 'Дом'}</span>
        </Button>
      </div>
      <Button variant="continue" disabled={!city || arrivalCityError} onClick={handleContinue}>
        Далее
      </Button>
    </>
  );
};