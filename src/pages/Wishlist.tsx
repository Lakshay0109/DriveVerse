import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Heart, ExternalLink, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Wishlist = () => {
  const { cars, newCars, wishlistIds, toggleWishlist, fetchCars, fetchNewCars } = useStore();
  
  useEffect(() => {
    fetchCars();
    fetchNewCars();
  }, []);

  const wishlistedNewCars = newCars.filter(car => wishlistIds.includes(car.id));
  const wishlistedUsedCars = cars.filter(car => wishlistIds.includes(car.id));
  
  const hasSavedCars = wishlistedNewCars.length > 0 || wishlistedUsedCars.length > 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Your Saved Cars</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Keep track of the vehicles you're considering. Come back anytime to review your favorites.
          </p>
        </motion.div>

        {!hasSavedCars ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-[32px] p-12 text-center border-slate-700 max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-800/50 border border-slate-700 mb-6 flex items-center justify-center">
              <Heart className="w-10 h-10 text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-slate-400 mb-8">
              Looks like you haven't saved any cars yet. Explore our collection of new and used vehicles to find your perfect match.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/buy" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold hover:brightness-110 transition-all">
                <ExternalLink className="w-4 h-4" />
                New Cars
              </Link>
              <Link to="/market" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all">
                Used Market
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {wishlistedNewCars.length > 0 && (
              <div>
                <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                  New Cars
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {wishlistedNewCars.map((car) => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                        className="glass-panel p-4 rounded-[32px] border-slate-700/50 hover:bg-slate-800/50 transition-colors group relative"
                      >
                        <button 
                          onClick={() => toggleWishlist(car.id)}
                          className="absolute top-8 right-8 z-10 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-white hover:text-red-400" />
                        </button>

                        <Link to={`/buy/${car.id}`}>
                          <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] mb-6">
                            <img 
                              src={car.images[0]} 
                              alt={car.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
                              <div className="text-sm text-cyan-400 font-bold">${car.estimatedMonthlyCost}/mo</div>
                            </div>
                          </div>
                        </Link>

                        <div className="px-2">
                          <div className="text-xs text-purple-400 font-bold tracking-widest uppercase mb-1">{car.brand}</div>
                          <Link to={`/buy/${car.id}`} className="hover:text-cyan-400 transition-colors">
                            <h3 className="text-xl font-display font-bold mb-4 line-clamp-1">{car.name}</h3>
                          </Link>
                          
                          <div className="flex justify-between items-center text-sm text-slate-400">
                            <span className="capitalize">{car.bodyType}</span>
                            <span className="capitalize">{car.fuelType}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {wishlistedUsedCars.length > 0 && (
              <div>
                <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                  Used Market
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {wishlistedUsedCars.map((car) => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                        className="glass-panel p-4 rounded-[32px] border-slate-700/50 hover:bg-slate-800/50 transition-colors group relative"
                      >
                        <button 
                          onClick={() => toggleWishlist(car.id)}
                          className="absolute top-8 right-8 z-10 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-white hover:text-red-400" />
                        </button>

                        <Link to={`/market/${car.id}`}>
                          <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] mb-6">
                            <img 
                              src={car.image} 
                              alt={car.model}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
                              <div className="flex items-center gap-1 text-sm text-cyan-400 font-bold">
                                <MessageCircle className="w-4 h-4" /> {car.bids.length} bids
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="px-2">
                          <div className="text-xs text-purple-400 font-bold tracking-widest uppercase mb-1">{car.brand}</div>
                          <Link to={`/market/${car.id}`} className="hover:text-cyan-400 transition-colors">
                            <h3 className="text-xl font-display font-bold mb-4 line-clamp-1">{car.model}</h3>
                          </Link>
                          
                          <div className="text-sm text-slate-400 line-clamp-2">
                            {car.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
