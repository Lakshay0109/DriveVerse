# Buy Car Module

A fully functional car buying platform featuring real-time backend filtering, wishlist persistence, side-by-side comparison, and precise MongoDB integration.

## Features Included
1. **Car Listing Page**: Fetch vehicles from the backend, responsive grid, dynamic cards.
2. **Filter System**: Range slider for budget, buttons for fuel/body types. Triggers instant backend API queries.
3. **Car Detail Page**: Dynamic gallery, calculated monthly costs (`(price/60) + average fuel cost`), technical specs.
4. **Compare Feature**: Select up to 3 cars to view them side-by-side on an interactive overlay.
5. **Wishlist**: Add/remove your favorites, synced to MongoDB backend.

## Architecture
* **Frontend**: React (Vite+TS), Tailwind CSS, Zustand, Framer Motion.
* **Backend**: Node.js/Express configured strictly over Vite's dev server middleware.
* **Database**: MongoDB via Mongoose.

## Setup Instructions

### 1. Install dependencies
Dependencies are integrated into the primary package ecosystem. If running locally outside AI Studio, ensure you execute:
\`\`\`bash
npm install
\`\`\`

### 2. Configure Database
Copy `.env.example` to `.env` and provide your MongoDB URI:
\`\`\`env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster...
\`\`\`
*(Note: If `MONGODB_URI` is omitted during local development or AI studio preview, the backend uses `mongodb-memory-server` to automatically spin up a temporary database in-memory so nothing crashes and the preview works out-of-the-box.)*

### 3. Run Backend & Frontend
The project uses a unified Full-Stack Vite/Express configuration. The single command will start both the Express backend and the Vite frontend middleware.
\`\`\`bash
npm run dev
\`\`\`

### 4. Seed Database
The custom seed script (`/src/server/seed.ts`) will automatically run and insert 15 precisely engineered car models into the database on server starup if the collection is empty.
