import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, CarFilters } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Heart, Activity, Scale, Battery, Fuel, Settings2, X, ChevronRight } from 'lucide-react';

export const BuyCars = () => {
  const { newCars, fetchNewCars, fetchWishlist, isLoading, toggleWishlist, wishlistIds, toggleCompare, compareIds } = useStore();
  
  const [budget, setBudget] = useState(150000);
  const [fuelFilter, setFuelFilter] = useState<CarFilters['fuelType']>('all');
  const [bodyFilter, setBodyFilter] = useState<CarFilters['bodyType']>('all');
  const [showCompare, setShowCompare] = useState(false);

  // Debounce API calls for slider
  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNewCars({
        maxPrice: budget,
        fuelType: fuelFilter,
        bodyType: bodyFilter
      });
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [budget, fuelFilter, bodyFilter, fetchNewCars]);

  const compareList = newCars.filter(car => compareIds.includes(car.id));

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-display font-bold mb-2">Buy New</h1>
          <p className="text-slate-400">Discover your next vehicle. Filter, compare, and drive.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
           <button 
             onClick={() => setShowCompare(true)}
             disabled={compareIds.length === 0}
             className="px-6 py-3 rounded-xl border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 font-bold disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] disabled:shadow-none flex items-center gap-2"
           >
             <Scale className="w-4 h-4" /> Compare ({compareIds.length}/3)
           </button>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 shrink-0 glass-panel p-6 rounded-[24px] h-fit lg:sticky lg:top-24 z-20">
          <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-cyan-400" /> Filters
          </h3>
          
          <div className="mb-8">
             <label className="block text-sm font-medium text-slate-300 mb-3">
               Max Price: ${budget.toLocaleString()}
             </label>
             <input 
               type="range" min="15000" max="200000" step="5000"
               value={budget}
               onChange={(e) => setBudget(Number(e.target.value))}
               className="w-full appearance-none bg-slate-800 h-2 flex rounded-full accent-cyan-500"
             />
          </div>

          <div className="mb-8">
             <label className="block text-sm font-medium text-slate-300 mb-3">Fuel Type</label>
             <div className="flex flex-col gap-2">
               {['all', 'petrol', 'diesel', 'electric', 'hybrid'].map((type) => (
                 <button 
                   key={type}
                   onClick={() => setFuelFilter(type as any)}
                   className={`text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize ${fuelFilter === type ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:bg-slate-800'}`}
                 >
                   {type}
                 </button>
               ))}
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-300 mb-3">Body Style</label>
             <div className="flex flex-col gap-2">
               {['all', 'suv', 'sedan', 'hatchback', 'coupe', 'truck'].map((type) => (
                 <button 
                   key={type}
                   onClick={() => setBodyFilter(type as any)}
                   className={`text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize ${bodyFilter === type ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:bg-slate-800'}`}
                 >
                   {type}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Listing Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="glass-panel rounded-[32px] p-4 h-[350px] animate-pulse">
                   <div className="bg-slate-800 rounded-[24px] h-[200px] w-full mb-6" />
                   <div className="bg-slate-800 h-6 w-1/2 rounded mb-3" />
                 </div>
               ))}
            </div>
          ) : newCars.length === 0 ? (
            <div className="glass-panel rounded-[32px] p-12 text-center text-slate-400 flex flex-col items-center">
              <Activity className="w-12 h-12 mb-4 opacity-50" />
              <p>No vehicles match your refined criteria.</p>
              <button 
                onClick={() => { setBudget(200000); setFuelFilter('all'); setBodyFilter('all'); }}
                className="mt-4 text-cyan-400 hover:text-cyan-300 underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newCars.map((car, index) => {
                const isWishlisted = wishlistIds.includes(car.id);
                const isCompared = compareIds.includes(car.id);
                
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={car.id}
                    className="glass-panel p-4 rounded-[32px] group relative"
                  >
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleWishlist(car.id); }}
                      className="absolute top-8 right-8 z-10 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors"
                    >
                      <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                    </button>

                    <Link to={`/buy/${car.id}`}>
                      <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] mb-6">
                        <img 
                          src={car.images[0]} 
                          alt={car.name} 
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </Link>
                    
                    <div className="px-2">
                       <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xs text-purple-400 font-bold tracking-widest uppercase mb-1">{car.brand}</div>
                          <Link to={`/buy/${car.id}`} className="hover:text-cyan-400 transition-colors">
                            <h3 className="text-2xl font-display font-bold">{car.name}</h3>
                          </Link>
                        </div>
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:text-white transition-colors">
                          ${car.price.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4 mt-4">
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 flex items-center gap-1">
                          {car.fuelType === 'electric' ? <Battery className="w-3 h-3 text-green-400" /> : <Fuel className="w-3 h-3 text-orange-400" />}
                          <span className="uppercase">{car.fuelType}</span>
                        </span>
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 capitalize">{car.bodyType}</span>
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300">{car.mileage} {car.fuelType === 'electric' ? 'miles' : 'mpg'}</span>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-700/50 flex gap-3">
                        <Link to={`/buy/${car.id}`} className="flex-1 bg-white/5 hover:bg-white/10 text-center py-3 rounded-xl text-sm font-bold transition-colors">
                          View Details
                        </Link>
                        <button 
                          onClick={() => toggleCompare(car.id)}
                          className={`px-4 py-3 rounded-xl border transition-colors flex items-center justify-center ${
                            isCompared ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'border-slate-700 hover:border-slate-500 text-slate-400'
                          }`}
                        >
                          <Scale className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

       {/* Compare Modal */}
       <AnimatePresence>
        {showCompare && compareList.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowCompare(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl glass-panel bg-slate-900/90 rounded-[32px] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl border border-white/10"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold text-white">Compare Vehicles</h2>
                <button onClick={() => setShowCompare(false)} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="overflow-auto p-6 custom-scrollbar flex-1">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 min-w-[800px]">
                  {/* Headers */}
                  <div className="space-y-4">
                    <div className="h-48" /> {/* Spacer for image */}
                    <div className="font-bold text-slate-400 py-2 border-b border-slate-800">Price</div>
                    <div className="font-bold text-slate-400 py-2 border-b border-slate-800">Body Type</div>
                    <div className="font-bold text-slate-400 py-2 border-b border-slate-800">Fuel</div>
                    <div className="font-bold text-slate-400 py-2 border-b border-slate-800">Power</div>
                    <div className="font-bold text-slate-400 py-2 border-b border-slate-800">Acceleration</div>
                    <div className="font-bold text-slate-400 py-2 border-b border-slate-800">Drivetrain</div>
                    <div className="font-bold text-slate-400 py-2">Est. Monthly</div>
                  </div>
                  
                  {/* Cars */}
                  {compareList.map(car => (
                    <div key={car.id} className="space-y-4 relative">
                      <button 
                        onClick={() => toggleCompare(car.id)}
                        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur text-white hover:bg-red-500/80 flex items-center justify-center transition-colors border border-white/20"
                      >
                         <X className="w-4 h-4" />
                      </button>
                      <div className="h-48 rounded-2xl overflow-hidden relative group">
                        <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="text-xs text-cyan-400">{car.brand}</div>
                          <div className="font-bold text-white">{car.name}</div>
                        </div>
                      </div>
                      <div className="py-2 border-b border-slate-800 font-medium text-white">${car.price.toLocaleString()}</div>
                      <div className="py-2 border-b border-slate-800 capitalize text-white">{car.bodyType}</div>
                      <div className="py-2 border-b border-slate-800 uppercase flex items-center gap-2 text-white">
                        {car.fuelType === 'electric' ? <Battery className="w-4 h-4 text-green-400" /> : <Fuel className="w-4 h-4 text-orange-400" />} {car.fuelType}
                      </div>
                      <div className="py-2 border-b border-slate-800 text-white">{car.specs.power}</div>
                      <div className="py-2 border-b border-slate-800 text-white">{car.specs.acceleration}</div>
                      <div className="py-2 border-b border-slate-800 text-white">{car.specs.drivetrain}</div>
                      <div className="py-2 text-cyan-400 font-bold">${car.estimatedMonthlyCost}/mo</div>
                      
                      <Link to={`/buy/${car.id}`} onClick={() => setShowCompare(false)} className="mt-4 block w-full py-3 text-center rounded-xl bg-purple-600 hover:bg-purple-700 font-bold transition-colors text-white">
                        View Details
                      </Link>
                    </div>
                  ))}
                  
                  {compareList.length < 3 && (
                    <div className="border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-500 h-48 opacity-50 hover:opacity-100 hover:border-slate-500 transition-colors cursor-pointer" onClick={() => setShowCompare(false)}>
                      <Scale className="w-8 h-8 mb-2" />
                      <span>Select to add</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
