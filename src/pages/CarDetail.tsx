import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Heart, Send, Activity, Settings, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const CarDetail = () => {
  const { id } = useParams();
  const { cars, fetchCars, addBid, toggleWishlist, wishlistIds } = useStore();
  const [car, setCar] = useState(cars.find(c => c.id === id));
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    if (cars.length === 0) fetchCars();
  }, []);

  useEffect(() => {
    setCar(cars.find(c => c.id === id));
  }, [cars, id]);

  if (!car) return <div className="min-h-screen flex text-white pt-32 justify-center">Loading...</div>;

  const isWishlisted = wishlistIds.includes(car.id);

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidAmount || isNaN(Number(bidAmount))) return;
    addBid(car.id, Number(bidAmount), "Current User");
    setBidAmount('');
  };

  const chartData = [
    { name: '0s', speed: 0 },
    { name: '1s', speed: 45 },
    { name: '2s', speed: 85 },
    { name: '3s', speed: 120 },
    { name: '4s', speed: 145 },
    { name: '5s', speed: 180 },
  ];

  // Highest bid logic
  const highestBid = car.bids.length > 0 ? Math.max(...car.bids.map(b => b.amount)) : car.price;

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] w-full">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={car.image} 
          alt={car.model} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-24 left-0 right-0 max-w-7xl mx-auto px-6 h-0 pointer-events-none"
        >
          <button 
            onClick={() => toggleWishlist(car.id)}
            className="absolute top-6 right-6 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors pointer-events-auto"
          >
            <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
          </button>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-cyan-400 font-bold tracking-widest uppercase mb-2">
              {car.brand}
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-display font-bold">
              {car.model}
            </motion.h1>
          </div>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-3 border-purple-500/30 font-display">
            <span className="text-slate-400">Current Value</span>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              ${highestBid.toLocaleString()}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Specs & Insights */}
        <div className="lg:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Vehicle Intelligence</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel p-6 rounded-[24px]">
                <Activity className="w-8 h-8 text-cyan-400 mb-4" />
                <div className="text-3xl font-bold mb-1">{car.specs.topSpeed} <span className="text-sm text-slate-400 font-normal">mph</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Top Speed</div>
              </div>
              <div className="glass-panel p-6 rounded-[24px]">
                <Zap className="w-8 h-8 text-purple-400 mb-4" />
                <div className="text-3xl font-bold mb-1">{car.specs.acceleration} <span className="text-sm text-slate-400 font-normal">s</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">0-60 Time</div>
              </div>
              <div className="glass-panel p-6 rounded-[24px]">
                <Settings className="w-8 h-8 text-blue-400 mb-4" />
                <div className="text-3xl font-bold mb-1">{car.specs.range} <span className="text-sm text-slate-400 font-normal">mi</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Adv. Range</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Performance Trajectory</h2>
            <div className="glass-panel p-6 rounded-[32px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#06b6d4' }}
                  />
                  <Area type="monotone" dataKey="speed" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorSpeed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Story</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              {car.description} Imagine driving this on a serene highway at midnight, 
              the neon glow of the dashboard illuminating the cabin as the electric motors whir silently, 
              pushing you forward into the future.
            </p>
          </section>
        </div>

        {/* Right Column: Social Bidding (Instagram Style Comments) */}
        <div>
          <div className="glass-panel p-6 rounded-[32px] sticky top-24">
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              Live Bids <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
            </h2>

            <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {car.bids.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">Be the first to bid on this vehicle.</p>
              ) : (
                 car.bids.map((bid) => (
                  <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} key={bid.id} className="flex gap-4">
                    <img src={bid.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-slate-700" />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm">{bid.user}</span>
                        <span className="text-xs text-slate-500">
                           {new Date(bid.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mt-1">
                        Placed a bid for <strong className="text-white">${bid.amount.toLocaleString()}</strong>
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-xs text-slate-500 font-medium hover:text-white transition-colors">Reply</button>
                        <Heart className="w-3 h-3 text-slate-500 hover:text-red-500 cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Bid Input */}
            <form onSubmit={handleBid} className="relative mt-4 pt-4 border-t border-slate-700/50">
              <input 
                type="number" 
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Min bid: $${highestBid + 500}`}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500"
              />
              <button 
                type="submit" 
                disabled={!bidAmount}
                className="absolute right-2 top-6 bottom-2 p-2 rounded-full text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
