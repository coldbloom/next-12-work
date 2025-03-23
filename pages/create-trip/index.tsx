import { useState } from 'react';

import s from './Create.module.scss';
import { LayoutContainer } from "@/components/layouts/LayoutContainer";
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { LocationSelect } from "@/components/shared/LocationSelect";
import { Location, locationField } from "@/utils/types";
import { observer } from "mobx-react-lite";

import { tripStore } from '@/store/createTripStore';
import { LocationCreateForm } from "@/components/shared/LocationCreateForm";

const CreateTrip = observer(() => {
  const [activeField, setActiveField] = useState<number | null>(null);

  const closeModal = () => setActiveField(null);

  const handleLocation = (value: Location, fieldName: locationField) => {
    console.log(value, fieldName);
    tripStore.updateLocation(value, fieldName);
    closeModal();
  };

  const { cityFrom: city, streetFrom: street, buildingFrom: building } = tripStore;

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
              params={{ limit: 15 }}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName="streetFrom"
              initialValue={street?.name}
              onClose={closeModal}
              handleFormChange={handleLocation}
              params={{
                location: 'street',
                limit: 50,
                region: city?.region,
                city: city?.city,
                settlement: city?.settlement
              }}
            />
          )}
          {activeField === 3 && (
            <LocationSelect
              fieldName="buildingFrom"
              initialValue={building?.name}
              onClose={closeModal}
              handleFormChange={handleLocation}
              params={{ location: 'house', limit: 15, streetId: street?.id }}
            />
          )}
        </div>
      </ModalPageWindow>
    </LayoutContainer>
  );
});

export default CreateTrip;