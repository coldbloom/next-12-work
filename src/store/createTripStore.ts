import { makeAutoObservable } from "mobx";
import { Location, locationField, TripData, RouteDetails } from "@/utils/types";
import { secondsToHoursMinutes } from "@/utils/functions";

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
  price: string | null = null;
  duration: string | null = null;
  distance: number | null = null;
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

  updatePrice(value: string): void {
    this.price = value;
  }

  getDetails(details: RouteDetails): void {
    const { duration, distance } = details;
    this.distance = Math.round(distance / 1000);
    this.duration = secondsToHoursMinutes(duration);
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
  };

  getRequestData(): TripData {
    if (!this.cityFrom || !this.cityTo || !this.date || !this.time || !this.passengers || !this.price || !this.duration || !this.distance) {
      throw new Error("Пожалуйста, заполните все поля перед публикацией.");
    }
    const [hours, minutes] = this.time.split(':');
    if (!hours || !minutes) {
      throw new Error("Неверный формат времени. Используйте HH:MM.");
    }

    const dateTime = this.date;
    dateTime.setHours(Number(hours));
    dateTime.setMinutes(Number(minutes));
    dateTime.setSeconds(0);
    const localDateTime = dateTime.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    return {
      locationFrom: {
        city: this.cityFrom,
        street: this.streetFrom ?? null,
        building: this.buildingFrom ?? null,
      },
      locationTo: {
        city: this.cityTo,
        street: this.streetTo ?? null,
        building: this.buildingTo ?? null,
      },
      dateTime: localDateTime,
      passengers: this.passengers,
      price: this.price,
      duration: this.duration,
      distance: this.distance,
      description: this.description !== '' ? this.description : null,
    }
  }
}

export const tripStore = new CreateTripStore();
