import mongoose, { Document, Schema } from 'mongoose';

export interface ICar extends Document {
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

const carSchema = new Schema<ICar>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  fuelType: { type: String, enum: ['petrol', 'diesel', 'electric', 'hybrid'], required: true },
  bodyType: { type: String, enum: ['sedan', 'suv', 'coupe', 'hatchback', 'truck'], required: true },
  images: [{ type: String, required: true }],
  specs: {
    power: { type: String, required: true },
    acceleration: { type: String, required: true },
    topSpeed: { type: String, required: true },
    range: { type: String },
    drivetrain: { type: String, required: true },
  },
  pros: [{ type: String }],
  cons: [{ type: String }],
  estimatedMonthlyCost: { type: Number, required: true },
}, { timestamps: true });

export const Car = mongoose.models.Car || mongoose.model<ICar>('Car', carSchema);
