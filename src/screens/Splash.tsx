import React, { useEffect } from 'react';
import { Screen } from '../types';
import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';

export function Splash({ navigate }: { navigate: (s: Screen) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('Welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 bg-[#000000] flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920] opacity-30 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD400] opacity-20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center z-10 relative"
      >
        <div className="w-28 h-28 bg-[#D71920] rounded-2xl flex items-center justify-center mb-6 border-4 border-white shadow-[8px_8px_0_rgba(255,212,0,1)]">
          <Building2 size={56} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-widest text-center">
          Chennai<br/><span className="text-[#FFD400]">Ward</span>
        </h1>
        <p className="text-[#FFFFFF] text-sm uppercase tracking-widest font-bold">
          Civic Engagement Platform
        </p>
      </motion.div>

      <div className="absolute bottom-10 z-10 flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-[#D71920] border-t-[#FFD400] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
