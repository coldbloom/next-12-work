// Функция для получения правильного склонения слова "пассажир" в зависимости от числа
import { ParentLocation, Location } from "@/utils/types";

export const getPassengerString = (count: number): string => {
  if (count === 1) {
    return `${count} пассажир`;
  } else if (count >= 2 && count <= 4) {
    return `${count} пассажира`;
  } else {
    return `${count} пассажиров`;
  }
};



// функция, которая принимает объект Date и возвращает отформатированную строку в нужном формате
export function formatDate(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Увеличиваем число на 1, чтобы получить завтрашнюю дату

  // Определяем параметры форматирования для вывода даты
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // Краткое название дня недели (например, "Пн")
    day: 'numeric',    // Число месяца (например, "7")
    month: 'short'     // Краткое название месяца (например, "окт.")
  };

  // Создаем форматтер с указанными параметрами и локалью "ru-RU" для русского языка
  const formatter = new Intl.DateTimeFormat('ru-RU', options);

  if (date.toDateString() === today.toDateString()) return 'Сегодня';
  if (date.toDateString() === tomorrow.toDateString()) return 'Завтра';
  return formatter.format(date);
}



export const lowerCaseFirstLetter = (str: string): string => str[0].toLowerCase() + str.slice(1);

// эта функция не экспортируется
const formatParentName = (parent: ParentLocation): string => {
  const restrictedNames = new Set(["Донецкая Народная", "Луганская Народная"]);

  if (restrictedNames.has(parent.name)) {
    return `${parent.name} ${parent.type}`;
  }

  return (parent.type === 'Республика' || parent.type === 'Город')
    ? `${parent.type} ${parent.name}`
    : `${parent.name} ${lowerCaseFirstLetter(parent.type)}`;
};

export const formatComma = (parents: ParentLocation[]): string => {
  // Используем reduce для создания итоговой строки
  return parents.reduce((acc, parent, index) => {
    const prefix = index > 0 ? ', ' : ''; // Запятая перед элементом, кроме первого
    return acc + prefix + formatParentName(parent); // Конкатенируем предыдущую строку и новый элемент
  }, ''); // Начальная строка пустая
};



export function extractLocationData(data: any): Location {
  return {
    id: data.id,
    zip: data.zip,
    type: data.type,
    typeShort: data.typeShort,
    contentType: data.contentType,
    name: data.name,
    parents: data.parents.map((parent: any) => ({
      id: parent.id,
      zip: parent.zip,
      type: parent.type,
      typeShort: parent.typeShort,
      contentType: data.contentType,
      name: parent.name,
    }))
  };
}