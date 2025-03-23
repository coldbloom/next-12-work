import { useState } from 'react';
import { poster } from "@/context/AuthContext";

import { LayoutContainer } from "@/components/layouts/LayoutContainer";
import { GoBackBtn } from "@/components/kit/GoBackBtn";
import { Button } from "@/components/kit/Button";
import { TextArea } from "@/components/kit/TextArea";
import { Heading } from "@/components/kit/Heading/Heading";
import { useRouter } from "next/router";

import s from './Description.module.scss';
import { observer } from "mobx-react-lite";
import { tripStore } from '@/store/createTripStore';
import {Location, TripData} from "@/utils/types";

// Массив числительных на русском языке для проверки
const RUSSIAN_NUMBERS = [
  'ноль', 'один', 'два', 'три', 'четыр', 'пят', 'шест', 'сем', 'восем', 'девят',
  'десят', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
  'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать', 'двадцать', 'тридцать',
  'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто', 'сто',
  'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот',
  'девятьсот', 'тысяча', 'миллион', 'миллиард', 'триллион',
  // Добавляем склонения
  'одного', 'двух', 'трех', 'четырех', 'пяти', 'шести', 'семи', 'восьми', 'девяти',
  'десяти', 'одиннадцати', 'двенадцати', 'тринадцати', 'четырнадцати', 'пятнадцати',
  'шестнадцати', 'семнадцати', 'восемнадцати', 'девятнадцати', 'двадцати', 'тридцати',
  'сорока', 'пятидесяти', 'шестидесяти', 'семидесяти', 'восьмидесяти', 'девяноста', 'ста',
  'двухсот', 'трехсот', 'четырехсот', 'пятисот', 'шестисот', 'семисот', 'восьмисот',
  'девятисот', 'тысячи', 'миллиона', 'миллиарда', 'триллиона',
  // Множественное число
  'тысячи', 'миллионы', 'миллиарды', 'триллионы',
  'тысяч', 'миллионов', 'миллиардов', 'триллионов'
];

// Функция валидации текста
const validateText = (text: string): string | false => {
  // Проверка на наличие цифр
  if (/\d/.test(text)) {
    return 'Пожалуйста, не используйте цифры в описании';
  }

  // Проверка на наличие не-русских букв (кроме пробелов и знаков препинания)
  if (/[\p{Letter}\p{Mark}]/gmu.test(text) && !/^[\p{Script=Cyrillic}\s\p{P}\p{N}\$^`~]*$/gmu.test(text)) {
    return 'Пожалуйста, используйте только русские буквы';
  }
  const cleanText = text.replace(/[\s\p{P}]/gu, '');

  for (let i = 0; i < RUSSIAN_NUMBERS.length - 1; i++) {
    if (cleanText.includes(RUSSIAN_NUMBERS[i])) {
      return 'Пожалуйста, не используйте числительные в описании';
    }
  }

  return false; // Нет ошибок
};

const Description = observer(() => {
  const [error, setError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { description } = tripStore;
  const router = useRouter();
  // Обработчик изменения текста
  const handleDescriptionChange = (newDescription: string) => {
    tripStore.updateDescription(newDescription);
    const validationError = validateText(newDescription);
    setError(validationError);
  };

  const handlePublish = async () => {
    console.log('publish');
    try {
      setLoading(true);
      const data: TripData = tripStore.getRequestData();
      const res = await poster('trip/publish', data);
    } catch (error) {
      console.error(error)
      router.push('/create-trip')
    }
  };
  return (
    <LayoutContainer>
      <div className={s.formWrapper}>
        <GoBackBtn onClick={() => router.push('price')} />
        <Heading variant="dark">Дополнительная информация о поездке</Heading>
        <TextArea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Как поедете, планируете ли остановки, правила поведения в машине и т.п."
          errorText={error}
          className={s.textArea}
        />
      </div>
      <Button variant="continue" onClick={handlePublish} disabled={!!error}>Опубликовать</Button>
    </LayoutContainer>
  );
});

export default Description;