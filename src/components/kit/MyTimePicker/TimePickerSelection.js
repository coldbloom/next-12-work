import React, { useEffect, useState } from 'react';
import HourWheel from './HourWheel';
import MinuteWheel from './MinuteWheel';

import cn from 'classnames';
import s from './MyTimePicker.module.scss';


function TimePickerSelection({
   pickerDefaultValue,
   initialValue,
   onChange,
   height,
   onSave,
   onCancel,
   cancelButtonText,
   saveButtonText,
   controllers,
   setInputValue,
   seperator,
}) {
   const initialTimeValue =  initialValue;
   const [value, setValue] = useState(
      initialValue === null ? pickerDefaultValue : initialTimeValue,
   );
   const [hourFormat, setHourFormat] = useState({
      mount: false,
      hourFormat: initialValue.slice(6, 8),
   });

   useEffect(() => {
      if (controllers === false) {
         const finalSelectedValue = value;
         setInputValue(finalSelectedValue);
         console.log(finalSelectedValue, ' finalSelectedValue')
         onChange(finalSelectedValue);
      }
   }, [value]);

   const params = {
      height,
      value,
      setValue,
      controllers,
      setHourFormat,
      hourFormat,
   };

   const handleSave = () => {
      const finalSelectedValue = value;
      setInputValue(finalSelectedValue);
      onChange(finalSelectedValue);
      onSave(finalSelectedValue);
   };
   const handleCancel = () => {
      onCancel();
   };

   return (
      <div className={cn(s['react-ios-time-picker'], s['react-ios-time-picker-transition'])}>
         {controllers && (
            <div className={s['react-ios-time-picker-btn-container']}>
               <button
                  className={cn(s['react-ios-time-picker-btn'], s['react-ios-time-picker-btn-cancel'])}
                  onClick={handleCancel}
               >
                  {cancelButtonText}
               </button>
               <button className={s['react-ios-time-picker-btn']} onClick={handleSave}>
                  {saveButtonText}
               </button>
            </div>
         )}
         <div
            className={s['react-ios-time-picker-container']}
            style={{ height: `${height * 5 + 40}px` }}
         >
            <div
               className={s['react-ios-time-picker-selected-overlay']}
               style={{
                  top: `${height * 2 + 20}px`,
                  height: `${height}px`,
               }}
            />
            <HourWheel {...params} />
            { seperator && <div className={s['react-ios-time-picker-colon']}> : </div> }
            <MinuteWheel {...params} />
         </div>
      </div>
   );
}

export default TimePickerSelection;
