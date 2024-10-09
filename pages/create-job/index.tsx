import { mdiMapMarkerRadiusOutline, mdiMapSearchOutline, mdiHomeSearchOutline } from '@mdi/js';
import Icon from '@mdi/react';

import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import s from './Create.module.scss';
import cn from 'classnames';
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { LocationSelect } from "@/components/shared/LocationSelect";
import { Location } from "@/utils/types";

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

const CreateJob = () => {
  const [activeField, setActiveField] = useState<number | null>(null);
  const [locationFrom, setLocationFrom] = useState<LocationFromType>({
    city: null,
    street: null,
    building: null,
  });

  const handleFormChange = (value: Location | Date | number, fieldName: string) => {
    ///if (value instanceof Location) { //@fixme необязательная проверка из-за пересечения типов в сигнатуре пробрасываемой функции
      setLocationFrom((prevData) => ({
        ...prevData,
        [fieldName]: value, // Обновляем только нужное поле
      }))
      closeModal();
    //}
  };

  const closeModal = () => setActiveField(null);

  const { city, street, building } = locationFrom;

  useEffect(() => {
    console.log(locationFrom)
  }, [locationFrom]);

  return (
    <LayoutContainer>
      <div className={s.wrapper}>
        <div className={s.formWrapper}>
          <h1>Откуда вы выезжаете?</h1>
          <button className={cn(s.buttonInput, { [s.filled]: city })} onClick={() => setActiveField(1)}>
            <Icon path={mdiMapMarkerRadiusOutline} size="24px"/>
            {/*{city && <span>{city?.typeShort}.</span>}*/}
            {city?.name ?? 'Город отправления'}
          </button>
          <button className={cn(s.buttonInput, { [s.filled]: street })} onClick={() => setActiveField(2)}>
            <Icon path={mdiMapSearchOutline} size="24px"/>
            {street && <span>{street?.typeShort}. </span>}
            {street?.name ?? 'Улица'}
          </button>
          <button className={cn(s.buttonInput, { [s.filled]: building })} onClick={() => setActiveField(3)}>
            <Icon path={mdiHomeSearchOutline} size="24px"/>
            {building && <span>{building?.typeShort}. </span>}
            {building?.name ?? 'Дом'}
          </button>
        </div>
        {/*<button>Далее</button>*/}
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
};

export default CreateJob;