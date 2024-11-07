import React from 'react';
import { getDistance } from 'geolib';

const Info = () => {
  // Кoorдинаты двух точек
  // longitude - долгота
  const pointA = { latitude: 55.7558, longitude: 37.6173 }; // Москва
  const pointB = { latitude: 59.9343, longitude: 30.3351 }; // Санкт-Петербург
  const pointC = { latitude: 47.2332, longitude: 39.715 }; // Ростов-на-Дону
  const pointD = { latitude: 45.0421, longitude: 38.9806 }; // Краснодар
  const pointE = { latitude: 44.4994, longitude: 34.164147 } // Ялта
  const pointMoscow = { latitude: 55.75, longitude: 37.62 } //

  // Расчет расстояния в метрах
  const distance = getDistance(pointA, pointB);
  const distance2 = getDistance(pointC, pointD);
  const distance3 = getDistance(pointD, pointE);
  const distance4 = getDistance(pointC, pointMoscow);

  console.log(`Расстояние между Москвой и Санкт-Петербургом: ${distance} метров`);
  console.log(`Расстояние между Москвой и Санкт-Петербургом: ${distance / 1000} км`);

  console.log(`Расстояние между Ростов и Краснодар: ${distance2} метров`);
  console.log(`Расстояние между Ростов и Краснодар: ${distance2 / 1000} км`);

  console.log(`Расстояние между Ялта и Краснодар: ${distance3 / 1000} км`);

  console.log(`Расстояние между Ростов и Москва: ${distance4 / 1000} км`);
  return (
    <div>
      <h1>Description</h1>
    </div>
  );
};

export default Info;