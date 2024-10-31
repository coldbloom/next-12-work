import { makeAutoObservable } from "mobx";
import { Location } from "@/utils/types";

type locationField =
  | 'cityFrom'
  | 'streetFrom'
  | 'buildingFrom'
  | 'cityTo'
  | 'streetTo'
  | 'buildingTo';

class CreateTripStore {
  cityFrom: Location | null = null;
  streetFrom: Location | null = null;
  buildingFrom: Location | null = null;
  cityTo: Location | null = null;
  streetTo: Location | null = null;
  buildingTo: Location | null = null;
  dateTime: Date | null = null;
  passengers: number = 3;
  description: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  updateDescription(value: string): void {
    this.description = value;
  }

  updateDate(value: Date | null): void {
    console.log(value);
    this.dateTime = value;
  };

  updatePassengers(value: number): void {
    this.passengers = value;
  }

  // Метод для обновления местоположения
  updateLocation(location: Location, field: string): void {
    // @ts-ignore
    this[field] = location; // Отдельное обновление местоположения
    console.log('updateLocation store method = ' ,this, `\n${field}`)
  };
}

export default new CreateTripStore();
