import { makeAutoObservable } from "mobx";
import { Location, locationField } from "@/utils/types";

class CreateTripStore {
  cityFrom: Location | null = null;
  streetFrom: Location | null = null;
  buildingFrom: Location | null = null;
  cityTo: Location | null = null;
  streetTo: Location | null = null;
  buildingTo: Location | null = null;
  date: Date | null = null;
  time: string | null = null;
  passengers: number = 4;
  price: number | null = null;
  description: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  updateDescription(value: string): void {
    this.description = value;
  }

  updateDate(value: Date | null): void {
    this.date = value;
  };

  updateTime(time: string): void {
    this.time = time;
  }

  updatePassengers(value: number): void {
    this.passengers = value;
  }

  // Метод для обновления местоположения
  updateLocation(location: Location, field: locationField): void {
    const currentLocation = this[field];
    if (!currentLocation || currentLocation.id !== location.id) {
      this[field] = location;

      if (field === 'cityFrom') {
        // Reset dependent fields when cityFrom changes
        this.streetFrom = null;
        this.buildingFrom = null;
      }
      if (field === 'cityTo') {
        this.streetTo = null;
        this.buildingTo = null;
      }
    }
    console.log('updateLocation store method = ' ,this, `\n${field}`)
  };
}

export default new CreateTripStore();
