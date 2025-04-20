import { useState } from 'react';
import { LayoutContainer } from "@/components/layouts/LayoutContainer";
import { LocationCreateForm } from '@/components/shared/LocationCreateForm';
import { ModalPageWindow } from '@/components/kit/ModalPageWindow';
import { LocationSelect } from '@/components/shared/LocationSelect';
import { observer } from 'mobx-react-lite';
import { tripStore } from '@/store/createTripStore';
import { Location, locationField } from '@/utils/types';

import s from '../Create.module.scss';
import { useRouter } from "next/router";

const To = observer(() => {
  const [activeField, setActiveField] = useState<number | null>(null);
  const { cityTo: city, streetTo: street, buildingTo: building, cityFrom } = tripStore;
  const router = useRouter();

  if (!cityFrom) {
    router.push('/create-trip');
    return null;
  }

  const arrivalCityError = city?.id === cityFrom?.id;

  const closeModal = () => setActiveField(null);

  const handleLocation = (value: Location, fieldName: locationField) => {
    tripStore.updateLocation(value, fieldName);
    closeModal();
  };

  return (
    <LayoutContainer>
      <LocationCreateForm
        mode="to"
        city={city}
        street={street}
        building={building}
        setActiveField={setActiveField}
        arrivalCityError={arrivalCityError}
      />
      <ModalPageWindow isOpen={!!activeField}>
        <div className={s.modalWrapper}>
          {activeField === 1 && (
            <LocationSelect
              fieldName="cityTo"
              placeholder="Введите город"
              initialValue={city?.name}
              onClose={closeModal}
              handleFormChange={handleLocation}
              params={{ location: 'city', limit: 15 }}
              selectedCity={cityFrom}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName="streetTo"
              placeholder="Введите улицу"
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
              fieldName="buildingTo"
              placeholder="Введите дом"
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

export default To;