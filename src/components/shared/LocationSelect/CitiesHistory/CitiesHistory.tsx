import React from 'react';
import {Location, LocationField} from "@/utils/types";
import {OptionField} from "@/components/shared/LocationSelect/OptionField";

type CitiesHistoryProps = {
  selectedCity?: Location | null;
  fieldName: LocationField;
  handleFormChange: (value: Location, name: LocationField) => void;
};

const filterHistory = (historyList: Location[], selectedCity?: Location | null): Location[] => {
  if (!selectedCity) return historyList;
  return historyList.filter((city: Location) => city.id !== selectedCity.id);
};

export const CitiesHistory = ({ selectedCity, fieldName, handleFormChange }: CitiesHistoryProps) => {
  const history = localStorage.getItem('history');
  const historyList: Location[] = history ? JSON.parse(history) : [];
  const filteredHistory = filterHistory(historyList, selectedCity);
  return (
    <>
      {
        filteredHistory.map((hOption: Location) => (
          <OptionField
            key={hOption.id}
            variant="history"
            option={hOption}
            fieldName={fieldName}
            handleFormChange={handleFormChange}
          />
        ))
      }
    </>
  );
};