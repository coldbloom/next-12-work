export type Location = {
  id: string; // postal code
  type: string;
  name: string;
  parents?: string;
  //# параметры для города #//
  region?: string;
  city?: string;
  cityTypeFull?: string;
  settlement?: string;
  settlementTypeFull?: string;
  //# параметры для улицы #//
  streetId?: string;
};

export type LocationTypes = 'city' | 'street' | 'house';

export type LocationReqParams = {
  query?: string;
  location?: LocationTypes;
  limit?: number;
  region?: string;
  city?: string;
  streetId?: string;
  settlement?: string;
};

export type locationField =
  | 'cityFrom'
  | 'streetFrom'
  | 'buildingFrom'
  | 'cityTo'
  | 'streetTo'
  | 'buildingTo';

/** Данные о поездке*/
export type TripData = {
  locationFrom: {
    city: Location;
    street: Location | null;
    building: Location | null;
  };
  locationTo: {
    city: Location;
    street: Location | null;
    building: Location | null;
  };
  dateTime: string;
  passengers: number;
  price: string;
  duration: string;
  distance: number;
  description: string | null;
};

export type RouteDetails = {
  duration: number;
  distance: number;
};