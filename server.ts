import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Car } from "./src/server/models/Car.ts";
import { Wishlist } from "./src/server/models/Wishlist.ts";
import { seedCars } from "./src/server/seed.ts";

// Legacy mock data for older endpoints not part of this specific request
const MOCK_CARS = [
  {
    id: "1",
    model: "Cyber GT",
    brand: "X-Motors",
    price: 85000,
    specs: { range: 400, topSpeed: 200, acceleration: 2.1 },
    tags: ["performance", "electric", "highway"],
    description: "The ultimate electric grand tourer. Built for cross-country performance with zero emissions.",
    likes: 1240,
    bids: [],
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop"
  }
];

async function connectDB() {
  try {
    if (process.env.MONGODB_URI) {
      let uri = process.env.MONGODB_URI;
      // Fix common issue where users put '@' in their password without URL encoding it
      const parts = uri.split('@');
      if (parts.length > 2) {
        const host = parts.pop();
        const creds = parts.join('%40');
        uri = creds + '@' + host;
      }
      await mongoose.connect(uri);
      console.log('Connected to external MongoDB');
    } else {
      console.log('No MONGODB_URI found, creating in-memory MongoDB for preview...');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      console.log('Connected to in-memory MongoDB');
    }
    await seedCars();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

async function startServer() {
  await connectDB();

  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === NEW "Buy Car" Module Endpoints (MongoDB) ===

  app.get("/api/cars", async (req, res) => {
    try {
      const { minPrice, maxPrice, fuelType, bodyType } = req.query;
      const query: any = {};

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      
      if (fuelType && fuelType !== 'all') {
        query.fuelType = fuelType;
      }
      
      if (bodyType && bodyType !== 'all') {
        query.bodyType = bodyType;
      }

      const cars = await Car.find(query).sort({ price: 1 });
      
      // Map to frontend expected shape (rename _id to id)
      res.json(cars.map(c => ({ ...c.toObject(), id: c._id.toString() })));
    } catch (error) {
      console.error("Error in /api/cars:", error);
      res.status(500).json({ error: "Failed to fetch cars", details: String(error) });
    }
  });

  app.get("/api/cars/:id", async (req, res) => {
    try {
      // Avoid breaking legacy routes, if it's not a Mongo ID format, pass to next route?
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Invalid car ID" });
      }
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ error: "Car not found" });
      res.json({ ...car.toObject(), id: car._id.toString() });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch car details" });
    }
  });

  app.get("/api/wishlist", async (req, res) => {
    try {
      const wishlists = await Wishlist.find().lean();
      res.json(wishlists.map(w => w.carId.toString()));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const { carId } = req.body;
      if (!carId) return res.status(400).json({ error: "Car ID is required" });
      
      await Wishlist.findOneAndUpdate(
        { carId: new mongoose.Types.ObjectId(carId) },
        { carId: new mongoose.Types.ObjectId(carId) },
        { upsert: true, new: true }
      );
      
      const wishlists = await Wishlist.find().lean();
      res.json(wishlists.map(w => w.carId.toString()));
    } catch (error) {
      res.status(500).json({ error: "Failed to update wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", async (req, res) => {
    try {
      await Wishlist.findOneAndDelete({ carId: new mongoose.Types.ObjectId(req.params.id) });
      const wishlists = await Wishlist.find().lean();
      res.json(wishlists.map(w => w.carId.toString()));
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  });

  // === Legacy Endpoints (Left intact to not break other unrequested parts) ===

  app.get("/api/legacy-cars", (req, res) => { // renamed to avoid clash
    res.json(MOCK_CARS);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
