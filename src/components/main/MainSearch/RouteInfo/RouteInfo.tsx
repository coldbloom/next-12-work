import React from 'react';
import { observer } from "mobx-react-lite";
import { searchTripStore } from '@/store/searchTripStore';

export const RouteInfo = observer(() => {
  const { cityFrom, cityTo, date } = searchTripStore;
  console.log(cityFrom, ' cityFrom')
  console.log(cityTo, ' cityTo')
  console.log(date, ' date')
  return (
    <div>
      <h1>RouteInfo</h1>

    </div>
  );
});