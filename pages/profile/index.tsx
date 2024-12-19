import { MainLayout } from "src/components/layouts/MainLayout";

import { AddressSuggestions, DaDataSuggestion, DaDataAddress } from 'react-dadata';

import s from './profile.module.scss';
import {useEffect, useState} from "react";
import axios from "axios";

// import 'react-dadata/dist/react-dadata.css';

const Profile = () => {
  const [apiQuery, setApiQuery] = useState('')
  const [value, setValue] = useState<DaDataSuggestion<DaDataAddress> | undefined>();

  const handleAdderss = () => {
    axios.get(`http://localhost:3233/api/address`, {
      params: {
        query: apiQuery,
      }
    }).then(res => console.log(res, ' res', `apiQuery = ${apiQuery}`));
  }

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const API_KEY = '51cd66a0fb9915ecc5edf4ee025c3e17ea8f1993';

    try {
      const response = await axios.post(API_URL, {
        query: query,
        from_bound: { value: "city" }, // Передаем объект напрямую
        to_bound: { value: "city" },     // Передаем объект напрямую
        count: 10 // Добавляем параметр count, если нужно
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${API_KEY}`
        }
      });

      setResults(response.data); // Сохраняем результаты
      setError(null); // Сбрасываем ошибку
    } catch (err) {
      console.error(err);
      setError('Ошибка при получении данных');
    }
  };

  useEffect(() => {
    console.log(results)
  }, [results]);


  return (
    <MainLayout>
      <div className={s.wrapper}>
        <h1>Мой профиль</h1>
        <div>
          <AddressSuggestions token="51cd66a0fb9915ecc5edf4ee025c3e17ea8f1993" value={value} onChange={setValue}
                              filterFromBound="city" filterToBound="city"/>;
        </div>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
        <button onClick={handleSearch}>Отправить</button>

        <h2>С помощью серверного проксирования</h2>
        <input type="text" value={apiQuery} onChange={e => setApiQuery(e.target.value)}/>
        <button onClick={handleAdderss}>Отправить</button>
      </div>
    </MainLayout>
  );
};

export default Profile;