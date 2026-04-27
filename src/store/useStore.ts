import { create } from 'zustand';
import { LegacyCar, NewCar } from '../types';

export interface CarFilters {
  maxPrice?: number;
  fuelType?: 'all' | 'petrol' | 'diesel' | 'electric' | 'hybrid';
  bodyType?: 'all' | 'suv' | 'sedan' | 'hatchback' | 'coupe' | 'truck';
}

interface AppState {
  cars: LegacyCar[];
  activeCar: LegacyCar | null;
  newCars: NewCar[];
  wishlistIds: string[];
  compareIds: string[];
  isLoading: boolean;
  setCars: (cars: LegacyCar[]) => void;
  setActiveCar: (car: LegacyCar | null) => void;
  fetchCars: () => Promise<void>;
  fetchNewCars: (filters?: CarFilters) => Promise<void>;
  addBid: (carId: string, amount: number, user: string) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (carId: string) => Promise<void>;
  toggleCompare: (carId: string) => void;
  clearCompare: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  cars: [],
  activeCar: null,
  newCars: [],
  wishlistIds: [],
  compareIds: [],
  isLoading: true,
  setCars: (cars) => set({ cars }),
  setActiveCar: (car) => set({ activeCar: car }),
  
  fetchCars: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/legacy-cars');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        set({ cars: data, isLoading: false });
      } else {
        set({ cars: [], isLoading: false });
      }
    } catch (error) {
      console.error("Failed to fetch legacy cars", error);
      set({ cars: [], isLoading: false });
    }
  },

  fetchNewCars: async (filters) => {
    set({ isLoading: true });
    try {
      let url = '/api/cars';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.fuelType && filters.fuelType !== 'all') params.append('fuelType', filters.fuelType);
        if (filters.bodyType && filters.bodyType !== 'all') params.append('bodyType', filters.bodyType);
        url += `?${params.toString()}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        set({ newCars: data, isLoading: false });
      } else {
        set({ newCars: [], isLoading: false });
      }
    } catch (error) {
      console.error("Failed to fetch new cars", error);
      set({ newCars: [], isLoading: false });
    }
  },

  fetchWishlist: async () => {
    try {
      const res = await fetch('/api/wishlist');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        set({ wishlistIds: data });
      } else {
        set({ wishlistIds: [] });
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      set({ wishlistIds: [] });
    }
  },

  toggleWishlist: async (carId) => {
    const isWishlisted = get().wishlistIds.includes(carId);
    
    // Optimistic update
    set((state) => ({
      wishlistIds: isWishlisted 
        ? state.wishlistIds.filter(id => id !== carId)
        : [...state.wishlistIds, carId]
    }));

    try {
      if (isWishlisted) {
        await fetch(`/api/wishlist/${carId}`, { method: 'DELETE' });
      } else {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ carId })
        });
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
      get().fetchWishlist(); // revert on failure
    }
  },

  addBid: async (carId, amount, user) => {
    try {
      const res = await fetch(`/api/legacy-cars/${carId}/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, user })
      });
      const newBid = await res.json();
      
      set((state) => {
        const updatedCars = state.cars.map(c => {
          if (c.id === carId) {
            return { ...c, bids: [...c.bids, newBid] };
          }
          return c;
        });
        
        let updatedActiveCar = state.activeCar;
        if (state.activeCar?.id === carId) {
          updatedActiveCar = { ...state.activeCar, bids: [...state.activeCar.bids, newBid] };
        }
        
        return { cars: updatedCars, activeCar: updatedActiveCar };
      });
    } catch (error) {
      console.error("Failed to add bid", error);
    }
  },

  toggleCompare: (carId) => set((state) => {
    if (state.compareIds.includes(carId)) {
      return { compareIds: state.compareIds.filter(id => id !== carId) };
    }
    if (state.compareIds.length >= 3) {
      return { compareIds: state.compareIds }; // max 3
    }
    return { compareIds: [...state.compareIds, carId] };
  }),
  
  clearCompare: () => set({ compareIds: [] }),
}));
