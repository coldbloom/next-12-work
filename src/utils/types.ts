export type Location = {
  id: string; // postal code
  type: string;
  name: string;
  parents?: string;
  //# параметры для города #//
  region?: string;
  city?: string;
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
};

export type locationField =
  | 'cityFrom'
  | 'streetFrom'
  | 'buildingFrom'
  | 'cityTo'
  | 'streetTo'
  | 'buildingTo';