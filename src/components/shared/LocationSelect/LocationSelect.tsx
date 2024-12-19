import { useEffect, useState, useCallback } from 'react';

import s from './LocationSelect.module.scss';
import axios from 'axios';
import { InputModal } from './InputModal';
import { Loader } from '@/components/kit/Loader';
import { Plug } from "@/components/kit/Plug";
import { OptionField } from './OptionField';

import { useDebounce } from '@/utils/hooks/useDebounce';
import { Location, LocationReqParams } from '@/utils/types';

type LocationSelectProps = {
  fieldName: string;
  onClose: () => void;
  handleFormChange: (value: Location, name: string) => void;
  initialValue?: string;
  params: LocationReqParams;
};

const cache: { [key: string]: Location[] } = {};

export const LocationSelect = ({
                                 fieldName,
                                 onClose,
                                 initialValue,
                                 handleFormChange,
                                 params = { contentType: 'city' }
                               }: LocationSelectProps) => {
  const [value, setValue] = useState(initialValue || '');
  const [options, setOptions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  const { contentType, withParent, limit, cityId, streetId} = params;

  // Формируем cacheKey, добавляя cityId и streetId только если они определены
  const cacheKey = `${debouncedValue}-${contentType}-${cityId || ''}-${streetId || ''}`;

  const fetchOptions = useCallback(async () => {
    // Проверка на наличие ошибки ввода
    if (inputError) {
      setOptions([]);
      return;
    }

    if (!debouncedValue) {
      setOptions([]);
      return;
    }

    // Проверка кэша
    if (cache[cacheKey]) {
      setOptions(cache[cacheKey]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3233/api/search`, {
        params: {
          query: debouncedValue,
          contentType,
          ...(withParent && { withParent }),
          ...(limit && { limit }),
          ...(cityId && { cityId }),
          ...(streetId && { streetId }),
        },
      });
      setOptions(response.data.result);

      // Сохранение ответа в кэш
      cache[cacheKey] = response.data.result;
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedValue]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions, inputError]);

  useEffect(() => {
    console.log(options, ' options');
  }, [options]);

  const onChangeValue = useCallback((newValue: string) => {
    setValue(newValue);

    // Проверка на наличие хотя бы одной буквы латинского алфавита
    const hasLatinLetter = /[a-zA-Z]/.test(newValue);
    setInputError(hasLatinLetter); // Устанавливаем error в true, если есть латинская буква (false, если нет)
  }, []);

  return (
    <div className={s.wrapper}>
      <InputModal name="from" value={value} onChange={onChangeValue} onClose={onClose} isError={inputError} />
      {loading ? (
        <div className={s.centerWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          {options.length > 0 ? (
            <div className={s.optionsWrapper}>
              {options.map((option: Location) => (
                <OptionField key={option.id} option={option} fieldName={fieldName} handleFormChange={handleFormChange} />
              ))}
            </div>
          ) : (
            debouncedValue !== '' && (
              <div className={s.centerWrapper}>
                <Plug title="Ничего не найдено : ("
                      text="Попробуйте уточнить название города или проверьте написание запроса" />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};


// export const LocationSelect = ({
//   fieldName,
//   onClose,
//   initialValue,
//   handleFormChange,
//   params = { contentType: 'city' }
// }: LocationSelectProps) => {
//   const [value, setValue] = useState(initialValue || '');
//   const [options, setOptions] = useState<Location[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [inputError, setInputError] = useState(false);
//   const debouncedValue = useDebounce(value, 500);
//
//   const { contentType, withParent, limit, cityId, streetId} = params;
//
//   // Формируем cacheKey, добавляя cityId и streetId только если они определены
//   const cacheKey = `${debouncedValue}-${contentType}-${cityId || ''}-${streetId || ''}`;
//   // const cacheKey = [
//   //   debouncedValue ? debouncedValue : '',
//   //   debouncedValue,
//   //   !!cityId ? cityId : '',
//   //   !!streetId ? streetId : ''
//   // ].filter(Boolean).join('-');
//
//   const fetchOptions = useCallback(async () => {
//     // Проверка на наличие ошибки ввода
//     if (inputError) {
//       setOptions([]);
//       return;
//     }
//
//     if (!debouncedValue) {
//       setOptions([]);
//       return;
//     }
//
//     // Проверка кэша
//     if (cache[cacheKey]) {
//       setOptions(cache[cacheKey]);
//       return;
//     }
//
//     setLoading(true);
//
//     try {
//       const response = await axios.get(`http://localhost:3233/api/search`, {
//         params: {
//           query: debouncedValue,
//           contentType,
//           ...(withParent && { withParent }),
//           ...(limit && { limit }),
//           ...(cityId && { cityId }),
//           ...(streetId && { streetId }),
//         },
//       });
//       setOptions(response.data.result);
//
//       // Сохранение ответа в кэш
//       cache[cacheKey] = response.data.result;
//     } catch (error) {
//       console.error("Error fetching options:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [debouncedValue]);
//
//   useEffect(() => {
//     fetchOptions();
//   }, [fetchOptions, inputError]);
//
//   useEffect(() => {
//     console.log(options, ' options');
//   }, [options]);
//
//   const onChangeValue = useCallback((newValue: string) => {
//     setValue(newValue);
//
//     // Проверка на наличие хотя бы одной буквы латинского алфавита
//     const hasLatinLetter = /[a-zA-Z]/.test(newValue);
//     setInputError(hasLatinLetter); // Устанавливаем error в true, если есть латинская буква (false, если нет)
//   }, []);
//
//   return (
//     <div className={s.wrapper}>
//       <InputModal name="from" value={value} onChange={onChangeValue} onClose={onClose} isError={inputError} />
//       {loading ? (
//         <div className={s.centerWrapper}>
//           <Loader />
//         </div>
//       ) : (
//         <>
//           {options.length > 0 ? (
//             <div className={s.optionsWrapper}>
//               {options.map((option: Location) => (
//                 <OptionField key={option.id} option={option} fieldName={fieldName} handleFormChange={handleFormChange} />
//               ))}
//             </div>
//           ) : (
//             debouncedValue !== '' && (
//               <div className={s.centerWrapper}>
//                 <Plug title="Ничего не найдено : ("
//                       text="Попробуйте уточнить название города или проверьте написание запроса" />
//               </div>
//             )
//           )}
//         </>
//       )}
//     </div>
//   );
// };
