import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CarScene } from '../components/CarScene';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rotation, zoom } = useScrollAnimation(containerRef);

  return (
    <div className="bg-primary min-h-screen text-white w-full">
      {/* 3D Hero Section - Pinned by GSAP */}
      <div ref={containerRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px]" />
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
          <CarScene rotationY={rotation} cameraZ={zoom} />
        </div>

        {/* Typography Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between py-32 px-12">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl md:text-8xl font-display font-bold tracking-tighter leading-none"
            >
              FUTURE <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                IN MOTION
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 text-xl text-slate-300 font-light max-w-md"
            >
              Scroll to explore the cutting-edge abstract styling of tomorrow's vehicles.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="self-center flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">Scroll to rotate</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-slate-400 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Rest of the page content after the pinned scroll */}
      <div className="relative z-30 py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">
          Beyond Limits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-[32px] hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Precision Engineering</h3>
            <p className="text-slate-400 leading-relaxed">
              Every curve and component is meticulously crafted for aerodynamic perfection, delivering unprecedented efficiency and aesthetic brilliance.
            </p>
          </div>
          <div className="glass-panel p-8 rounded-[32px] hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Intelligent Core</h3>
            <p className="text-slate-400 leading-relaxed">
              Powered by advanced neural networks that adapt to your driving patterns, city traffic, and environmental conditions in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
