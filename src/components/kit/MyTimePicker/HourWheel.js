import React, { useEffect, useState, useRef } from 'react';
import { initialNumbersValue, returnSelectedValue } from './helpers';

import cn from 'classnames';
import s from './MyTimePicker.module.scss'

function HourWheel({ height, value, setValue }) {
   const hourLength = 24;
   const [hours, setHours] = useState(
      initialNumbersValue(height, hourLength, parseInt(value.slice(0, 2))),
   );
   const mainListRef = useRef(null);
   const [cursorPosition, setCursorPosition] = useState(null);
   const [firstCursorPosition, setFirstCursorPosition] = useState(null);
   const [currentTranslatedValue, setCurrentTranslatedValue] = useState(
      parseInt(
         initialNumbersValue(height, hourLength, parseInt(value.slice(0, 2))).filter(
            (item) => item.number === value.slice(0, 2) && item.selected === true,
         )[0].translatedValue,
      ),
   );
   const [startCapture, setStartCapture] = useState(false);
   const [showFinalTranslate, setShowFinalTranslate] = useState(false);
   // start and end times
   const [dragStartTime, setDragStartTime] = useState(null);
   const [dragEndTime, setDragEndTime] = useState(null);
   // drag duration
   const [dragDuration, setDragDuration] = useState(null);
   // drag type fast or slow
   const [dragType, setDragType] = useState(null);
   // drag direction
   const [dragDirection, setDragDirection] = useState(null);
   // selected number
   const [selectedNumber, setSelectedNumber] = useState(null);

   const handleMouseDown = (e) => {
      setShowFinalTranslate(false);
      setFirstCursorPosition(e.clientY);
      setStartCapture(true);
      setDragStartTime(performance.now());
   };

   const handleTouchStart = (e) => {
      setShowFinalTranslate(false);
      setFirstCursorPosition(e.targetTouches[0].clientY);
      setStartCapture(true);
      setDragStartTime(performance.now());
   };

   const handleMouseUp = (e) => {
      setStartCapture(false);
      setCurrentTranslatedValue((prev) => prev + cursorPosition);
      setShowFinalTranslate(true);
      setDragEndTime(performance.now());
      if (performance.now() - dragStartTime <= 100) {
         setDragType('fast');
      } else {
         setDragType('slow');
      }
      if (cursorPosition < 0) {
         setDragDirection('down');
      } else {
         setDragDirection('up');
      }
   };

   const handleMouseLeave = (e) => {
      setStartCapture(false);
      setCurrentTranslatedValue((prev) => prev + cursorPosition);
      setShowFinalTranslate(true);
      setDragEndTime(performance.now());
      if (performance.now() - dragStartTime <= 100) {
         setDragType('fast');
      } else {
         setDragType('slow');
      }

      if (cursorPosition < 0) {
         setDragDirection('down');
      } else {
         setDragDirection('up');
      }
   };

   const handleMouseMove = (e) => {
      if (startCapture) {
         setCursorPosition(e.clientY - firstCursorPosition);
      } else {
         setCursorPosition(0);
      }
   };

   const handleTouchMove = (e) => {
      if (startCapture) {
         setCursorPosition(e.targetTouches[0].clientY - firstCursorPosition);
      } else {
         setCursorPosition(0);
      }
   };

   // preview translation
   useEffect(() => {
      if (startCapture) {
         mainListRef.current.style.transform = `translateY(${
            currentTranslatedValue + cursorPosition
         }px)`;
      }
   }, [cursorPosition]);

   // final translation here
   useEffect(() => {
      if (showFinalTranslate) {
         setDragDuration(dragEndTime - dragStartTime);
         if (dragEndTime - dragStartTime <= 100 && cursorPosition !== 0) {
            let currentValue;
            if (dragDirection === 'down') {
               currentValue = currentTranslatedValue - (120 / (dragEndTime - dragStartTime)) * 100;
            } else if (dragDirection === 'up') {
               currentValue = currentTranslatedValue + (120 / (dragEndTime - dragStartTime)) * 100;
            }
            let finalValue = Math.round(currentValue / height) * height;

           if (finalValue < height * -69) finalValue = height * -69;
           if (finalValue > height * 2) finalValue = height * 2;

            mainListRef.current.style.transform = `translateY(${finalValue}px)`;
            setCurrentTranslatedValue(finalValue);
         }
         if (dragEndTime - dragStartTime > 100 && cursorPosition !== 0) {
            let finalValue = Math.round(currentTranslatedValue / height) * height;

            if (finalValue < height * -69) finalValue = height * -69;
            if (finalValue > height * 2) finalValue = height * 2;
            mainListRef.current.style.transform = `translateY(${finalValue}px)`;
            setCurrentTranslatedValue(finalValue);
         }
         setCursorPosition(0);
      }
   }, [showFinalTranslate]);

   const handleTransitionEnd = (e) => {
      returnSelectedValue(height, hourLength).map((item) => {
         if (parseInt(item.translatedValue) === currentTranslatedValue) {
            setSelectedNumber(item.arrayNumber);
            setValue((prev) => `${item.number}:${prev.slice(3, 6)}`);
            setHours(() => {
               const newValue = initialNumbersValue(height, hourLength).map((hour) => {
                  if (
                     hour.number == item.number &&
                     hour.translatedValue == currentTranslatedValue
                  ) {
                     return {
                        ...hour,
                        selected: true,
                     };
                  }
                  return hour;
               });
               return newValue;
            });
         }
      });
   };

   // handle click to select number
   const handleClickToSelect = (e) => {
      if (cursorPosition === 0) {
         setCurrentTranslatedValue(parseInt(e.target.dataset.translatedValue));
      }
   };

   const isFastCondition = showFinalTranslate && dragType === 'fast';
   const isSlowCondition = showFinalTranslate && dragType === 'slow';

   /** ***************************   handle wheel scroll ************************* */

   const handleWheelScroll = (e) => {
      if (e.deltaY > 0) {
         if (currentTranslatedValue < height * 2) {
            setCurrentTranslatedValue((prev) => prev + height);
         }
      } else if (currentTranslatedValue > height * -69) {
         setCurrentTranslatedValue((prev) => prev - height);
      }
   };

   return (
      <div
         className={cn(s['react-ios-time-picker-minute'])}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         style={{ height: height * 5 }}
         onWheel={handleWheelScroll}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleMouseUp}
      >
         <div
            ref={mainListRef}
            className={cn({[s['react-ios-time-picker-fast']]: isFastCondition}, {[s['react-ios-time-picker-slow']]: isSlowCondition})}
            onTransitionEnd={handleTransitionEnd}
            style={{ transform: `translateY(${currentTranslatedValue}px)` }}
         >
            {hours.map((hourObj, index) => (
               <div
                  key={index}
                  className={s['react-ios-time-picker-cell-hour']}
                  style={{ height: `${height}px` }}
               >
                  <div
                     className={cn(s['react-ios-time-picker-cell-inner-hour'], {[s['react-ios-time-picker-cell-inner-selected']]: hourObj.selected}, {[s['react-ios-time-picker-cell-inner-hidden']]: hourObj?.hidden})}
                     onClick={handleClickToSelect}
                     data-translated-value={hourObj.translatedValue}
                  >
                     {hourObj.number}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default HourWheel;
