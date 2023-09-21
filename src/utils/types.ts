export type cityData = {
  rating: number;
  id: number;
  name: string;
  street: string;
  type: string;
};

export interface ICitiesData {
  belgorod: cityData[],
  orel: cityData[],
  mtsensk: cityData[]
}