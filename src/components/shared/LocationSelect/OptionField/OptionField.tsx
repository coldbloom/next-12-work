import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";

import s from './OptioField.module.scss'

import { Location, locationField } from "@/utils/types";

type OptionFieldProps = {
  option: Location;
  fieldName: locationField;
  handleFormChange: (value: Location, name: locationField) => void;
}

export const OptionField = ({ option, fieldName, handleFormChange }: OptionFieldProps) => {
  return (
    <div className={s.optionWrapper} key={option.id} onClick={() => handleFormChange(option, fieldName)}>
      <div className={s.citiesWrapper}>
        <div className={s.row}>
          <p className={s.type}>{option.type}</p>
          <p className={s.city}>&nbsp;{option.name}</p>
        </div>
        <p className={s.parent}>{option.parents}</p>
      </div>
      <Icon path={mdiChevronRight} size="24px" className={s.chevronIcon}/>
    </div>
  )
};