import React, {useState} from 'react';

const Profile = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3233/api/search?query=${query}`);
      const data = await response.json();
      setResults(data.result || []);
    } catch (error) {
      console.error('Ошибка при поиске адреса:', error);
    }
  };

  return (
    <div>
      <h1>Профиль</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите адрес"
        />
        <button onClick={handleSearch}>Поиск</button>
        <ul>
          {results.map((result: any, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;