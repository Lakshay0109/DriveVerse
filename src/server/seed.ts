import { Car } from './models/Car';

export const seedCars = async () => {
  // Always refresh cars so that we get the latest images without 404 errors
  await Car.deleteMany({});
  
  const cars = [
    {
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      price: 109990,
      mileage: 15,
      fuelType: "electric",
      bodyType: "sedan",
      images: [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "1,020 hp",
        acceleration: "1.99s 0-60 mph",
        topSpeed: "200 mph",
        range: "396 miles",
        drivetrain: "Tri-Motor AWD"
      },
      pros: ["Incredible acceleration", "Spacious interior", "Excellent Autopilot features", "Long electric range"],
      cons: ["Yoke steering wheel takes getting used to", "Interior quality doesn't match price", "No Apple CarPlay/Android Auto"],
      estimatedMonthlyCost: 1833
    },
    {
      name: "Porsche 911 GT3",
      brand: "Porsche",
      price: 182900,
      mileage: 450,
      fuelType: "petrol",
      bodyType: "coupe",
      images: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "502 hp",
        acceleration: "3.2s 0-60 mph",
        topSpeed: "197 mph",
        drivetrain: "RWD"
      },
      pros: ["Divine engine sound", "Pure driving connection", "Incredible track performance"],
      cons: ["Stiff daily ride", "Hard to get allocations", "Expensive options"],
      estimatedMonthlyCost: 3048
    },
    {
      name: "BMW M5 Competition",
      brand: "BMW",
      price: 135000,
      mileage: 1200,
      fuelType: "petrol",
      bodyType: "sedan",
      images: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "617 hp",
        acceleration: "3.1s 0-60 mph",
        topSpeed: "190 mph",
        drivetrain: "M xDrive AWD"
      },
      pros: ["Outstanding V8 power", "Comfortable for daily driving", "Aggressive styling"],
      cons: ["Heavy curb weight", "Numb steering feel", "High fuel consumption"],
      estimatedMonthlyCost: 2450
    },
    {
      name: "Audi RS e-tron GT",
      brand: "Audi",
      price: 147100,
      mileage: 80,
      fuelType: "electric",
      bodyType: "sedan",
      images: [
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "637 hp",
        acceleration: "2.9s 0-60 mph",
        topSpeed: "155 mph",
        range: "232 miles",
        drivetrain: "Dual-Motor AWD"
      },
      pros: ["Stunning design", "Very comfortable ride", "Extremely fast charging"],
      cons: ["Mediocre electric range", "Cramped rear headroom", "Limited storage space"],
      estimatedMonthlyCost: 2650
    },
    {
      name: "Mercedes-AMG G 63",
      brand: "Mercedes-Benz",
      price: 179000,
      mileage: 50,
      fuelType: "petrol",
      bodyType: "suv",
      images: [
        "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "577 hp",
        acceleration: "4.5s 0-60 mph",
        topSpeed: "149 mph",
        drivetrain: "AWD"
      },
      pros: ["Iconic boxy design", "Commanding seating position", "Luxurious interior"],
      cons: ["Poor fuel economy", "Wind noise at highway speeds", "Bumpy ride quality"],
      estimatedMonthlyCost: 3180
    },
    {
      name: "Rivian R1S",
      brand: "Rivian",
      price: 92000,
      mileage: 100,
      fuelType: "electric",
      bodyType: "suv",
      images: [
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "835 hp",
        acceleration: "3.0s 0-60 mph",
        topSpeed: "111 mph",
        range: "316 miles",
        drivetrain: "Quad-Motor AWD"
      },
      pros: ["Extremely capable off-road", "Spacious 3-row seating", "Innovative storage solutions"],
      cons: ["Infotainment can be laggy", "Firm ride on paved roads", "Service centers are sparse"],
      estimatedMonthlyCost: 1600
    },
    {
      name: "Toyota RAV4 Hybrid",
      brand: "Toyota",
      price: 34000,
      mileage: 5,
      fuelType: "hybrid",
      bodyType: "suv",
      images: [
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "219 hp",
        acceleration: "7.4s 0-60 mph",
        topSpeed: "112 mph",
        range: "580 miles total",
        drivetrain: "AWD"
      },
      pros: ["Excellent fuel economy", "Reliable and practical", "Strong resale value"],
      cons: ["Engine can be noisy", "Infotainment feels dated", "Uninspiring driving dynamics"],
      estimatedMonthlyCost: 650
    },
    {
      name: "Ford F-150 Lightning",
      brand: "Ford",
      price: 75000,
      mileage: 40,
      fuelType: "electric",
      bodyType: "truck",
      images: [
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "580 hp",
        acceleration: "4.0s 0-60 mph",
        topSpeed: "105 mph",
        range: "320 miles",
        drivetrain: "Dual-Motor AWD"
      },
      pros: ["Familiar F-150 feel", "Massive frunk storage", "Can power your home"],
      cons: ["Range drops significantly when towing", "Slow fast-charging speeds", "Pricey top trims"],
      estimatedMonthlyCost: 1350
    },
    {
      name: "Lexus LC 500",
      brand: "Lexus",
      price: 98000,
      mileage: 120,
      fuelType: "petrol",
      bodyType: "coupe",
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "471 hp",
        acceleration: "4.4s 0-60 mph",
        topSpeed: "168 mph",
        drivetrain: "RWD"
      },
      pros: ["Breathtaking concept-car styling", "Incredible naturally aspirated V8 sound", "Impeccable build quality"],
      cons: ["Infotainment trackpad is frustrating", "Tiny rear seats and trunk", "Heavy for a sports coupe"],
      estimatedMonthlyCost: 1750
    },
    {
      name: "Polestar 2",
      brand: "Polestar",
      price: 52000,
      mileage: 300,
      fuelType: "electric",
      bodyType: "sedan",
      images: [
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "421 hp",
        acceleration: "4.1s 0-60 mph",
        topSpeed: "127 mph",
        range: "276 miles",
        drivetrain: "Dual-Motor AWD"
      },
      pros: ["Clean minimalist design", "Great Android Automotive OS", "Build quality"],
      cons: ["Thick pillars hinder visibility", "Cupholder placement is awkward", "Firm ride"],
      estimatedMonthlyCost: 950
    },
    {
      name: "Honda Civic Type R",
      brand: "Honda",
      price: 44000,
      mileage: 200,
      fuelType: "petrol",
      bodyType: "hatchback",
      images: [
        "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "315 hp",
        acceleration: "4.9s 0-60 mph",
        topSpeed: "170 mph",
        drivetrain: "FWD"
      },
      pros: ["Incredible manual transmission", "Superb handling", "Practical hatchback design"],
      cons: ["Firm ride", "Lots of road noise", "Fake engine noise pumped in"],
      estimatedMonthlyCost: 780
    },
    {
      name: "Volkswagen Golf R",
      brand: "Volkswagen",
      price: 46000,
      mileage: 150,
      fuelType: "petrol",
      bodyType: "hatchback",
      images: [
        "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "315 hp",
        acceleration: "3.9s 0-60 mph",
        topSpeed: "155 mph",
        drivetrain: "AWD"
      },
      pros: ["Blisteringly quick", "Drift mode is fun", "Refined interior"],
      cons: ["Frustrating touch-capacitive controls", "Pricey for a Golf", "Infotainment is clunky"],
      estimatedMonthlyCost: 820
    },
    {
      name: "Kia Telluride",
      brand: "Kia",
      price: 43000,
      mileage: 30,
      fuelType: "petrol",
      bodyType: "suv",
      images: [
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "291 hp",
        acceleration: "7.0s 0-60 mph",
        topSpeed: "130 mph",
        drivetrain: "AWD"
      },
      pros: ["Incredible value for money", "Premium-feeling interior", "Spacious third row"],
      cons: ["V6 fuel economy isn't great", "Firm ride on larger wheels", "High dealer markups"],
      estimatedMonthlyCost: 780
    },
    {
      name: "Chevrolet Corvette Stingray",
      brand: "Chevrolet",
      price: 68000,
      mileage: 500,
      fuelType: "petrol",
      bodyType: "coupe",
      images: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "490 hp",
        acceleration: "2.9s 0-60 mph",
        topSpeed: "194 mph",
        drivetrain: "RWD"
      },
      pros: ["Supercar performance for a fraction of the price", "Excellent ride quality", "Striking mid-engine design"],
      cons: ["Interior layout is polarizing (wall of buttons)", "Limited rear visibility", "No manual transmission option"],
      estimatedMonthlyCost: 1200
    },
    {
      name: "Hyundai Ioniq 5",
      brand: "Hyundai",
      price: 46000,
      mileage: 40,
      fuelType: "electric",
      bodyType: "hatchback",
      images: [
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        power: "320 hp",
        acceleration: "5.0s 0-60 mph",
        topSpeed: "115 mph",
        range: "266 miles",
        drivetrain: "Dual-Motor AWD"
      },
      pros: ["Extremely fast charging", "Spacious airy interior", "Retro-futuristic styling"],
      cons: ["Lack of rear wiper", "Infotainment doesn't support wireless CarPlay", "Sound system could be better"],
      estimatedMonthlyCost: 950
    }
  ];

  await Car.insertMany(cars);
  console.log(`Seeded ${cars.length} cars into the database.`);
};
