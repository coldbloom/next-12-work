export type BaseLocation = {
  id: string;
  zip: number;
  type: string;
  typeShort: string;
  contentType: string;
  name: string;
};

// Тип для родительского местоположения
export type ParentLocation = BaseLocation;  //@fixme проверить и привести в вид

// Тип для основного местоположения, расширяющий базовый тип
export type Location = BaseLocation & {
  parents: BaseLocation[];
};

export type LocationReqParams = {
  contentType?: 'city' | 'street' | 'building'; // на сервере по умолчанию значение 'city'
  limit?: number; // на сервере по умолчанию значение '10'
  withParent?: number; // на сервере по умолчанию значение '1'
  cityId?: string;
  streetId?: string;
};