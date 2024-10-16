import { mdiMapMarkerRadiusOutline, mdiMapSearchOutline, mdiHomeSearchOutline, mdiArrowLeftCircle, mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';

import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import s from './Create.module.scss';
import cn from 'classnames';
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { LocationSelect } from "@/components/shared/LocationSelect";
import { Location } from "@/utils/types";
import { useRouter } from 'next/router';
import { observer } from "mobx-react-lite";

import Store from './store';

type LayoutContainerProps = {

} & PropsWithChildren;

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  );
};

type LocationFromType = {
  city: Location | null;
  street: Location | null;
  building: Location | null;
};

const CreateTrip = observer(() => {
  const [activeField, setActiveField] = useState<number | null>(null);
  const [streetError, setStreetError] = useState(false);
  const [buildingError, setBuildingError] = useState(false);
  const [locationFrom, setLocationFrom] = useState<LocationFromType>({
    city: null,
    street: null,
    building: null,
  });

  const router = useRouter();

  const handleFormChange = (value: Location | Date | number, fieldName: string) => {
    setLocationFrom((prevData) => ({
      ...prevData,
      [fieldName]: value, // Обновляем только нужное поле
    }))
    closeModal();
  };

  const closeModal = () => setActiveField(null);

  const { city, street, building } = locationFrom;

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

  const handleGoBack = () => {
    router.back();
  };

  const handleGoTo = () => {
    router.push('/create-trip/to');
  }

  useEffect(() => {
    streetError && setStreetError(false);
    buildingError && setBuildingError(false);
  }, [locationFrom]);

  return (
    <LayoutContainer>
      <div className={s.wrapper}>
        <div onClick={handleGoBack} className={s.goBackWrapper}>
          <Icon path={mdiArrowLeftCircle} size="36px" />
        </div>
        <div className={s.formWrapper}>
          <h1>Откуда вы выезжаете?</h1>
          <button onClick={() => setActiveField(1)} className={cn(s.buttonInput, { [s.filled]: city })}>
            <Icon path={mdiMapMarkerRadiusOutline} size="24px"/>
            {/*{city && <span>{city?.typeShort}.</span>}*/}
            {city?.name ?? 'Город отправления'}
          </button>
          <button
            onClick={handleStreet}
            className={cn(s.buttonInput, { [s.filled]: street }, { [s.error]: streetError })}
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
            className={cn(s.buttonInput, { [s.filled]: building }, { [s.error]: buildingError })}
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
          className={cn(s.continueButton, { [s.disabled]: !city})}
          onClick={handleGoTo}
        >
          Далее
        </button>
      </div>
      <ModalPageWindow isOpen={!!activeField}>
        <div className={s.modalWrapper}>
          {activeField === 1 && (
            <LocationSelect
              fieldName="city"
              initialValue={city?.name}
              onClose={closeModal}
              handleFormChange={handleFormChange}
              params={{ limit: 25 }}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName="street"
              initialValue={street?.name}
              onClose={closeModal}
              handleFormChange={handleFormChange}
              params={{ contentType: 'street', limit: 50, cityId: city?.id }}
            />
          )}
          {activeField === 3 && (
            <LocationSelect
              fieldName="building"
              initialValue={building?.name}
              onClose={closeModal}
              handleFormChange={handleFormChange}
              params={{ contentType: 'building', limit: 10, streetId: street?.id, withParent: 0 }}
            />
          )}
        </div>
      </ModalPageWindow>
    </LayoutContainer>
  );
});

export default CreateTrip;