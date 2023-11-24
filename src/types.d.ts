// single file for ease of use in this small project

export type TripAdvantage = {
  title: string;
  description: string;
};

export type Trip = {
  id: number;
  photoUrl: string;
  title: string;
  subtitle: string;
  countries: string[];
  days: number;
  co2kilograms: number;
  rating: number;
  description: string;
  advantages: TripAdvantage[];
};
