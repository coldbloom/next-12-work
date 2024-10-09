import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Хук useDebounce, который задерживает обновление значения до тех пор,
 * пока пользователь не прекратит ввод на заданное количество миллисекунд.
 *
 * @param value - Значение, которое требуется дебаунсить (например, текст ввода).
 * @param delay - Задержка (в миллисекундах) перед обновлением значения.
 * @returns debouncedValue - Дебаунсенное значение, которое обновляется с задержкой.
 */
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Устанавливаем таймер, который обновит debouncedValue после задержки.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Убираем таймер, если значение изменилось или компонент размонтирован.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Зависимости: если value или delay изменятся, эффект снова сработает.

  // Возвращаем дебаунсенное значение.
  return debouncedValue;
};

export const ComboBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue) {
      const fetchOptions = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3233/api/search?query=${debouncedValue}&contentType=${'city'}`);
          setOptions(response.data.result);
        } catch (error) {
          console.error("Error fetching options:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOptions();
    } else {
      setOptions([]); // Очистка списка, если поле ввода пустое
    }
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleSelect = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setIsOpen(true)
          console.log('открываем modal page')
        }}
      />
      {loading && <div>Loading...</div>}
      {isOpen && options.length > 0 && (
        <ul>
          {options.map((option: any) => (
            <li key={option.id} onClick={() => handleSelect(option.name)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
