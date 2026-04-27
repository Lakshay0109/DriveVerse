export interface Bid {
  id: string;
  user: string;
  amount: number;
  timestamp: string;
  avatar: string;
}

export interface LegacyCar {
  id: string;
  model: string;
  brand: string;
  price: number;
  specs: {
    range: number;
    topSpeed: number;
    acceleration: number;
  };
  tags: string[];
  description: string;
  likes: number;
  bids: Bid[];
  image: string;
}

export interface NewCar {
  id: string;
  name: string;
  brand: string;
  price: number;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  bodyType: 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'truck';
  images: string[];
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    range?: string;
    drivetrain: string;
  };
  pros: string[];
  cons: string[];
  estimatedMonthlyCost: number;
}
