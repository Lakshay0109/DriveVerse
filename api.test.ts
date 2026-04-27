import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Car } from './src/server/models/Car';
import { Wishlist } from './src/server/models/Wishlist';

// Basic mock express app mapping our actual endpoints for testing
const app = express();
app.use(express.json());

app.get("/api/cars", async (req, res) => {
  const { minPrice, maxPrice, fuelType, bodyType } = req.query;
  const query: any = {};
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (fuelType && fuelType !== 'all') query.fuelType = fuelType;
  if (bodyType && bodyType !== 'all') query.bodyType = bodyType;
  
  const cars = await Car.find(query).sort({ price: 1 });
  res.json(cars.map(c => ({ ...c.toObject(), id: c._id.toString() })));
});

app.post("/api/wishlist", async (req, res) => {
  const { carId } = req.body;
  await Wishlist.findOneAndUpdate(
    { carId: new mongoose.Types.ObjectId(carId as string) },
    { carId: new mongoose.Types.ObjectId(carId as string) },
    { upsert: true, new: true }
  );
  res.status(200).json({ success: true });
});

app.delete("/api/wishlist/:id", async (req, res) => {
  await Wishlist.findOneAndDelete({ carId: new mongoose.Types.ObjectId(req.params.id) });
  res.status(200).json({ success: true });
});

let mongoServer: MongoMemoryServer;

describe('Buy Cars Backend & Filter Logic', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    
    // Seed tiny dataset
    await Car.insertMany([
      { name: "Car A", brand: "Test", price: 20000, mileage: 30, fuelType: "petrol", bodyType: "sedan", images: ["img.jpg"], specs: { power: "100hp", acceleration: "10s", topSpeed: "100mph", drivetrain: "FWD" }, estimatedMonthlyCost: 350 },
      { name: "Car B", brand: "Test", price: 60000, mileage: 250, fuelType: "electric", bodyType: "suv", images: ["img.jpg"], specs: { power: "300hp", acceleration: "5s", topSpeed: "130mph", drivetrain: "AWD" }, estimatedMonthlyCost: 950 },
      { name: "Car C", brand: "Test", price: 40000, mileage: 45, fuelType: "hybrid", bodyType: "sedan", images: ["img.jpg"], specs: { power: "200hp", acceleration: "7s", topSpeed: "120mph", drivetrain: "FWD" }, estimatedMonthlyCost: 650 }
    ]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test('GET /api/cars - Endpoint returns all cars', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  });

  test('GET /api/cars - Filter logic handles maxPrice', async () => {
    const res = await request(app).get('/api/cars?maxPrice=45000');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe("Car A"); // sorted by price 1
    expect(res.body[1].name).toBe("Car C");
  });

  test('GET /api/cars - Filter logic handles fuelType', async () => {
    const res = await request(app).get('/api/cars?fuelType=electric');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Car B");
  });

  test('Wishlist add/remove logic', async () => {
    const car = await Car.findOne({ name: "Car A" });
    const carId = car!._id.toString();

    // Add
    const postRes = await request(app).post('/api/wishlist').send({ carId });
    expect(postRes.status).toBe(200);
    let count = await Wishlist.countDocuments();
    expect(count).toBe(1);

    // Remove
    const delRes = await request(app).delete(`/api/wishlist/${carId}`);
    expect(delRes.status).toBe(200);
    count = await Wishlist.countDocuments();
    expect(count).toBe(0);
  });
});
