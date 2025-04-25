import { Location } from "@/utils/types";
import { makeAutoObservable } from "mobx";

export type CitiesField = 'cityFrom' | 'cityTo';

class SearchTripStore {
  cityFrom: Location | null = null;
  cityTo: Location | null = null;
  date: Date = new Date();
  passengers: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  updateLocation(field: CitiesField, location: Location) {
    this[field] = location;
  }

  updateDate(date: Date) {
    this.date = date;
  }

  incrementPassengers() {
    if (this.passengers < 8) {
      this.passengers += 1;
    }
  }

  decrementPassengers() {
    if (this.passengers > 1) {
      this.passengers -= 1;
    }
  }

  swapLocation() {
    const tmpFrom = this.cityFrom;
    this.cityFrom = this.cityTo;
    this.cityTo = tmpFrom;
  }
}

export const searchTripStore = new SearchTripStore();