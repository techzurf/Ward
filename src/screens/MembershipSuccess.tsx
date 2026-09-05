import React from 'react';
import { Screen } from '../types';
import { Button } from '../components/ui/Button';
import { CheckCircle2, FileText, Home } from 'lucide-react';
import { motion } from 'motion/react';

export function MembershipSuccess({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  const appId = `APP-2026-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  return (
    <div className="flex-1 bg-[#E5E5E5] flex flex-col items-center justify-center p-6 text-center h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920] opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD400] opacity-20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center bg-white p-6 border-4 border-black rounded-2xl w-full max-w-sm shadow-[8px_8px_0_rgba(0,0,0,1)] relative z-10"
      >
        <div className="w-20 h-20 bg-[#FFD400] text-black border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Submitted!</h2>
        <p className="text-gray-600 mb-6 font-bold text-xs uppercase tracking-widest leading-relaxed">
          Your membership application has been received.
        </p>
        
        <div className="w-full bg-gray-100 p-4 border-2 border-black rounded mb-8 space-y-3">
          <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">App ID</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">{appId}</span>
          </div>
          <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Ward</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">112</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Status</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-black px-2 py-1 rounded">Pending Verification</span>
          </div>
        </div>
        
        <div className="w-full space-y-3">
          <Button fullWidth size="lg" onClick={() => navigate('MyMembership')} className="gap-2">
            <FileText size={18} /> View Application
          </Button>
          <Button fullWidth size="lg" variant="outline" onClick={() => navigate('Home')} className="gap-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <Home size={18} /> Go to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
