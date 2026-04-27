import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Heart, ChevronRight, CheckCircle2, XCircle, Calculator, Info } from 'lucide-react';
import { NewCar } from '../types';

export const NewCarDetail = () => {
  const { id } = useParams();
  const { newCars, fetchNewCars, toggleWishlist, wishlistIds } = useStore();
  const [car, setCar] = useState<NewCar | undefined>(newCars.find(c => c.id === id));
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (newCars.length === 0) fetchNewCars();
  }, [fetchNewCars, newCars.length]);

  useEffect(() => {
    setCar(newCars.find(c => c.id === id));
  }, [newCars, id]);

  if (!car) return <div className="min-h-screen flex text-white pt-32 justify-center">Loading...</div>;

  const isWishlisted = wishlistIds.includes(car.id);

  // monthlyCost = (price / 60) + estimated fuel cost
  const estimatedFuelCost = car.fuelType === 'electric' ? 60 : 180;
  const autoCalculatedMonthly = Math.round((car.price / 60) + estimatedFuelCost);

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 mt-4">
        <Link to="/buy" className="hover:text-white transition-colors">Buy New</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="capitalize">{car.bodyType}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white font-medium">{car.brand} {car.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-[4/3] rounded-[32px] overflow-hidden relative group"
          >
            <img src={car.images[activeImage]} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            
            <button 
              onClick={() => toggleWishlist(car.id)}
              className="absolute top-6 right-6 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors"
            >
              <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
            </button>
          </motion.div>
          
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
            {car.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-32 h-24 rounded-2xl overflow-hidden shrink-0 transition-all ${activeImage === idx ? 'ring-2 ring-cyan-500 opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                <img src={img} alt={`${car.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Specs */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="text-purple-400 font-bold tracking-widest uppercase mb-2">{car.brand}</div>
            <h1 className="text-5xl font-display font-bold mb-4">{car.name}</h1>
            <div className="text-3xl text-cyan-400 font-bold mb-6">${car.price.toLocaleString()}</div>
            
            <div className="flex gap-4">
              <button className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Build & Order
              </button>
              <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition-colors">
                Schedule Test Drive
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Estimated Finance</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                ${autoCalculatedMonthly.toLocaleString()} <span className="text-sm font-normal text-slate-500">/mo</span>
              </div>
              <div className="text-xs text-sky-400 mt-2 flex items-center gap-1 cursor-pointer hover:underline">
                <Calculator className="w-3 h-3" /> Includes est. fuel/energy
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Efficiency</div>
              <div className="text-2xl font-bold">{car.mileage} {car.fuelType === 'electric' ? 'miles range' : 'mpg'}</div>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Info className="w-3 h-3" /> Combined EPA est.
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 mb-8">
            <h3 className="text-xl font-display font-bold mb-6">Technical Specifications</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-700">
                <span className="text-slate-400">Power Output</span>
                <span className="font-medium text-right">{car.specs.power}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700">
                <span className="text-slate-400">Acceleration</span>
                <span className="font-medium text-right">{car.specs.acceleration}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700">
                <span className="text-slate-400">Top Speed</span>
                <span className="font-medium text-right">{car.specs.topSpeed}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700">
                <span className="text-slate-400">Drivetrain</span>
                <span className="font-medium text-right">{car.specs.drivetrain}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700">
                <span className="text-slate-400">Fuel Type / Energy</span>
                <span className="font-medium text-right uppercase">{car.fuelType}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Body Class</span>
                <span className="font-medium text-right capitalize">{car.bodyType}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-3xl p-6 border-green-500/20">
              <h3 className="font-display font-bold mb-4 flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" /> Pros
              </h3>
              <ul className="space-y-3">
                {car.pros.map((pro, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-panel rounded-3xl p-6 border-red-500/20">
              <h3 className="font-display font-bold mb-4 flex items-center gap-2 text-red-400">
                <XCircle className="w-5 h-5" /> Cons
              </h3>
              <ul className="space-y-3">
                {car.cons.map((con, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
