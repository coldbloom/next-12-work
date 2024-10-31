import { mdiHomeSearchOutline, mdiMapMarkerRadiusOutline, mdiMapSearchOutline } from "@mdi/js";
import Icon from "@mdi/react";

import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import cn from "classnames";
import {useRouter} from "next/router";
import {Location} from "@/utils/types";
import {GoBackBtn} from "@/components/kit/GoBackBtn";
import s from './LocationCreateForm.module.scss';
import {DatePicker} from "@/components/kit/Calendar";

type LocationCreateFormProps = {
  mode: 'from' | 'to';
  city: Location | null;
  street: Location | null;
  building: Location | null;
  setActiveField: Dispatch<SetStateAction<number | null>>
};

export const LocationCreateForm = ({ mode, city, street, building, setActiveField }: LocationCreateFormProps) => {
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

  const [date, setDate] = useState<Date>(new Date());
  const onChangeDate = (newDate: Date) => setDate(newDate);

  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <GoBackBtn/>
        <h1>{isFromMode ? 'Откуда вы выезжаете?' : 'Куда вы едете?'}</h1>
        <button onClick={() => setActiveField(1)} className={cn(s.buttonInput, s.active, {[s.filled]: city})}>
          <Icon path={mdiMapMarkerRadiusOutline} size="24px"/>
          {/*{city && <span>{city?.typeShort}.</span>}*/}
          {city?.name ?? (isFromMode ? 'Город отправления' : 'Город прибытия')}
        </button>
        <button
          onClick={handleStreet}
          className={cn(s.buttonInput, {[s.filled]: street}, {[s.error]: streetError}, {[s.active]: city})}
        >
          <Icon path={mdiMapSearchOutline} size="24px"/>
          {street && <span>{street?.typeShort}. </span>}
          {street?.name ?? 'Улица'}
        </button>
        {streetError && (
          <p className={s.errorMessage}>Укажите город перед выбором улицы!</p>
        )}
        <button
          onClick={handleBuilding}
          className={cn(s.buttonInput, {[s.filled]: building}, {[s.error]: buildingError}, {[s.active]: street})}
        >
          <Icon path={mdiHomeSearchOutline} size="24px"/>
          {building && <span>{building?.typeShort}. </span>}
          {building?.name ?? 'Дом'}
        </button>
        {buildingError && (
          <p className={s.errorMessage}>Укажите улицу перед выбором дома!</p>
        )}
      </div>
      <button
        disabled={!city}
        className={cn(s.continueButton, {[s.disabled]: !city})}
        onClick={handleContinue}
      >
        Далее
      </button>
    </div>
  );
};