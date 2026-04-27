import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Search, TrendingUp, User, Activity, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const tabs = [
    { name: 'Home', path: '/', icon: <Car className="w-4 h-4" /> },
    { name: 'Buy New', path: '/buy', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Wishlist', path: '/wishlist', icon: <Heart className="w-4 h-4" /> },
    { name: 'Sell', path: '/sell', icon: <Activity className="w-4 h-4" /> },
    { name: 'Find My Car', path: '/finder', icon: <Search className="w-4 h-4" /> },
    { name: 'Used Market', path: '/market', icon: <Car className="w-4 h-4" /> },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#020617]/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center neon-box-glow">
          <Car className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight">DriveVerse</span>
      </div>

      <div className="hidden md:flex items-center gap-1 p-1 rounded-full glass-panel">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) => cn(
              "relative px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-cyan-500/30 neon-box-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {tab.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors border border-slate-700">
        <User className="w-5 h-5 text-slate-300" />
      </div>
    </motion.nav>
  );
};
