import React, {FC, PropsWithChildren, useEffect, useState} from 'react';

import cn from 'classnames';
import s from './Create.module.scss';
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { LocationSelect } from "@/components/shared/LocationSelect";
import { Location } from "@/utils/types";
import { observer } from "mobx-react-lite";

import Store from './store';
import {LocationCreateForm} from "@/components/shared/LocationCreateForm";

type LayoutContainerProps = {
  className?: string;
} & PropsWithChildren;

//@fixme доработать вынести в отдельную компоненту
export const LayoutContainer: FC<LayoutContainerProps> = ({ children, className }) => {
  return (
    <div className={cn(s.container, className)}>
      {children}
    </div>
  );
};

const CreateTrip = observer(() => {
  const [activeField, setActiveField] = useState<number | null>(null);

  const closeModal = () => setActiveField(null);

  const handleLocation = (value: Location, fieldName: string) => {
    Store.updateLocation(value, fieldName);
    closeModal();
  };

  const { cityFrom: city, streetFrom: street, buildingFrom: building } = Store;

  return (
    <LayoutContainer>
      <LocationCreateForm
        mode="from"
        city={city}
        street={street}
        building={building}
        setActiveField={setActiveField}
      />
      <ModalPageWindow isOpen={!!activeField}>
        <div className={s.modalWrapper}>
          {activeField === 1 && (
            <LocationSelect
              fieldName="cityFrom"
              initialValue={city?.name}
              onClose={closeModal}
              handleFormChange={handleLocation}
              params={{ limit: 25 }}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName="streetFrom"
              initialValue={street?.name}
              onClose={closeModal}
              handleFormChange={handleLocation}
              params={{ contentType: 'street', limit: 50, cityId: city?.id }}
            />
          )}
          {activeField === 3 && (
            <LocationSelect
              fieldName="buildingFrom"
              initialValue={building?.name}
              onClose={closeModal}
              handleFormChange={handleLocation}
              params={{ contentType: 'building', limit: 10, streetId: street?.id, withParent: 0 }}
            />
          )}
        </div>
      </ModalPageWindow>
    </LayoutContainer>
  );
});

export default CreateTrip;