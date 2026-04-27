import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { BuyCars } from './pages/BuyCars';
import { NewCarDetail } from './pages/NewCarDetail';
import { SmartFinder } from './pages/SmartFinder';
import { Marketplace } from './pages/Marketplace';
import { CarDetail } from './pages/CarDetail';
import { Wishlist } from './pages/Wishlist';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyCars />} />
        <Route path="/buy/:id" element={<NewCarDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/sell" element={<div className="min-h-screen pt-32 px-6"><h1 className="text-5xl font-display text-center">Coming Soon</h1></div>} />
        <Route path="/finder" element={<SmartFinder />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/market/:id" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
