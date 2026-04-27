import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

export const Marketplace = () => {
  const { cars, fetchCars, isLoading, toggleWishlist, wishlistIds } = useStore();

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-display font-bold mb-2">Used Market</h1>
          <p className="text-slate-400">Discover premium pre-owned vehicles. Place your bid.</p>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-panel rounded-[32px] p-4 h-[400px] animate-pulse">
              <div className="bg-slate-800 rounded-[24px] h-[200px] w-full mb-6" />
              <div className="bg-slate-800 h-6 w-1/2 rounded mb-3" />
              <div className="bg-slate-800 h-4 w-1/3 rounded mb-6" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {cars.map((car, index) => {
            const isWishlisted = wishlistIds.includes(car.id);
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={car.id}
              >
                <div className="glass-panel p-4 rounded-[32px] group hover:border-cyan-500/30 transition-all duration-500 hover:neon-box-glow relative">
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(car.id); }}
                    className="absolute top-8 right-8 z-10 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors"
                  >
                    <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                  </button>
                  <Link to={`/market/${car.id}`}>
                    <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] mb-6">
                      <img 
                        src={car.image} 
                        alt={car.model} 
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/10 flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-white text-white" /> {car.likes}
                      </div>
                    </div>
                    
                    <div className="px-2">
                      <div className="text-xs text-purple-400 font-bold tracking-widest uppercase mb-1">{car.brand}</div>
                      <h3 className="text-2xl font-display font-bold mb-2">{car.model}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-6">
                        {car.description}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-slate-700/50 pt-4 mt-auto">
                        <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {car.bids.length} bids
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
