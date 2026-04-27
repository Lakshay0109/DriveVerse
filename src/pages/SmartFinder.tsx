import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { ChevronRight, ArrowRight, Car as CarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SmartFinder = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(50000);
  const [cityType, setCityType] = useState('traffic');
  const [usage, setUsage] = useState('daily');
  const [priority, setPriority] = useState('efficiency');
  
  const [result, setResult] = useState<{recommended: Car, reason: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ budget, cityType, usage, priority })
      });
      const data = await res.json();
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 800); // Artificial delay to show nice loading animation
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-display font-bold mb-6">Smart Car Finder</h1>
        <p className="text-slate-400 text-lg">Tell us how you drive. We'll find your perfect match.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Wizard Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 rounded-[32px] flex flex-col gap-8"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-widest mb-4">
              Budget: ${budget.toLocaleString()}
            </label>
            <input 
              type="range" 
              min="20000" 
              max="150000" 
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full appearance-none bg-slate-800 h-2 flex rounded-full accent-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-widest mb-4">Driving Environment</label>
            <div className="grid grid-cols-2 gap-3">
              {['traffic', 'highway'].map(type => (
                <button
                  key={type}
                  onClick={() => setCityType(type)}
                  className={`py-3 px-4 rounded-xl border transition-all ${
                    cityType === type 
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 neon-box-glow' 
                      : 'border-slate-700 hover:border-slate-500 text-slate-400'
                  }`}
                >
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-widest mb-4">Primary Usage</label>
            <div className="grid grid-cols-2 gap-3">
              {['daily', 'long trips'].map(use => (
                <button
                  key={use}
                  onClick={() => setUsage(use)}
                  className={`py-3 px-4 rounded-xl border transition-all ${
                    usage === use 
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300 neon-box-glow' 
                      : 'border-slate-700 hover:border-slate-500 text-slate-400'
                  }`}
                >
                  <span className="capitalize">{use}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={getRecommendation}
            disabled={loading}
            className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            ) : "Find My Match"}
          </button>
        </motion.div>

        {/* Result Area */}
        <div className="flex items-center justify-center">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-6 rounded-[32px] w-full group cursor-pointer"
              onClick={() => navigate(`/market/${result.recommended.id}`)}
            >
              <div className="rounded-[24px] overflow-hidden relative aspect-[4/3] mb-6">
                <img 
                  src={result.recommended.image} 
                  alt={result.recommended.model} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="text-sm text-cyan-400 font-bold tracking-widest uppercase mb-1">{result.recommended.brand}</div>
                  <h3 className="text-3xl font-display font-bold">{result.recommended.model}</h3>
                </div>
              </div>
              
              <div className="p-2 border-l-2 border-purple-500 pl-4 bg-purple-500/5 rounded-r-xl mb-6">
                <p className="text-slate-300 italic">"{result.reason}"</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold font-display">${result.recommended.price.toLocaleString()}</span>
                <div className="flex items-center gap-2 text-cyan-400 group-hover:translate-x-2 transition-transform">
                  View Details <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full w-full border border-dashed border-slate-700 rounded-[32px] flex items-center justify-center flex-col text-slate-500 p-8 text-center min-h-[400px]">
              <CarIcon className="w-16 h-16 mb-4 opacity-50" />
              <p>Configure your preferences and hit "Find My Match" to see our specialized recommendation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
