import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import React, {useEffect} from 'react';
import {formatDateToIso} from "@/utils/functions";
import {Meta} from "@/components/layouts/Meta";
import {MainLayout} from "@/components/layouts/MainLayout";

// Функция для получения данных
const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Search = () => {
  const router = useRouter();
  const { from, to, date } = router.query; // Получаем параметры из URL

  // Формируем URL запроса только когда все параметры есть
  const apiUrl = from && to && date
    ? `${process.env.NEXT_PUBLIC_API_URL}/trip?fromCityId=${from}&toCityId=${to}&date=${date}`
    : null;

  // Используем useSWR для запроса
  const { data: trips, error, isLoading } = useSWR<any[]>(apiUrl, fetcher);

  // trips.map(item => console.log(item));

  useEffect(() => {
    console.log(trips);
    if (trips) {
      for (let i = 0; i < trips.length; i++) {
        const dateTime = trips[i].dateTime;
        // console.log(dateTime);
        // console.log(typeof dateTime);
        const dateTime2 = new Date(dateTime);
        console.log(`${i}=${formatDateToIso(dateTime2)}-${dateTime2.getHours()}-${dateTime2.getMinutes()}`)
      }
    }
  }, [trips]);

  return (
    <>
      <Meta
        title="Поиск title"
        description="Поиск направлений описание"
        canonical="https://блаблаавто.рф/search"
        ogTitle="title для соцсетей"
        ogDescription="Описание для соц-сетей"
      />
      <MainLayout>
        <main>
          <h1>Search</h1>
        </main>
      </MainLayout>
    </>
  );
};

export default Search;