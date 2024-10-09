import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";

import s from './OptioField.module.scss'

import { Location } from "@/utils/types";
import { extractLocationData, formatComma } from "@/utils/functions";

type OptionFieldProps = {
  option: Location;
  fieldName: string;
  handleFormChange: (value: Location | Date | number, name: string) => void;
}

export const OptionField = ({ option, fieldName, handleFormChange }: OptionFieldProps) => {
  return (
    <div className={s.optionWrapper} key={option.id} onClick={() => handleFormChange(extractLocationData(option), fieldName)}>
      <div className={s.citiesWrapper}>
        <div className={s.row}>
          <p className={s.type}>{option.type}</p>
          <p className={s.city}>&nbsp;{option.name}</p>
        </div>
        <p className={s.parent}>{formatComma(option.parents)}</p>
      </div>
      <Icon path={mdiChevronRight} size="24px" className={s.chevronIcon}/>
    </div>
  )
};