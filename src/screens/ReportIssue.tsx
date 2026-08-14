import React, { useState } from 'react';
import { Screen, IssueCategory } from '../types';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Camera, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ReportIssue({ navigate }: { navigate: (s: Screen) => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const categories: IssueCategory[] = ['Roads', 'Street Lights', 'Drainage', 'Garbage', 'Water', 'Traffic', 'Public Facilities', 'Other'];
  
  const [selectedCat, setSelectedCat] = useState<IssueCategory>('Roads');

  if (isSubmitted) {
    return (
      <div className="flex-1 bg-[#E5E5E5] flex flex-col items-center justify-center p-6 text-center h-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center bg-white p-6 border-4 border-black rounded-2xl w-full max-w-sm shadow-[8px_8px_0_rgba(0,0,0,1)]"
        >
          <div className="w-20 h-20 bg-[#FFD400] text-black border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Reported!</h2>
          <p className="text-gray-600 mb-4 font-bold text-xs uppercase tracking-widest">Issue submitted successfully.</p>
          <p className="text-xs font-bold text-white bg-black px-4 py-2 rounded mb-8 uppercase tracking-widest">
            ID: ISS-2026-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
          </p>
          
          <Button fullWidth onClick={() => navigate('IssuesList')}>
            Back to Issues
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#E5E5E5] flex flex-col h-full relative">
      <Header title="Report Issue" showBack onBack={() => navigate('IssuesList')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-28">
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`py-3 px-2 text-[10px] font-bold uppercase tracking-widest rounded text-center transition-colors border-2 ${
                  selectedCat === cat 
                    ? 'bg-[#000000] text-[#FFD400] border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1' 
                    : 'bg-white text-black border-black active:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Title</label>
          <input 
            type="text" 
            placeholder="E.g. Broken street light"
            className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Description</label>
          <textarea 
            rows={4}
            placeholder="Provide more details..."
            className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-[#D71920]" size={20} />
            <input 
              type="text" 
              placeholder="Select location on map"
              className="w-full bg-white border-2 border-black rounded py-3 pl-10 pr-4 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]"
              defaultValue="KB Dasan Road, Teynampet"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Add Photo</label>
          <button className="w-full h-32 bg-white border-4 border-dashed border-black rounded flex flex-col items-center justify-center text-black hover:bg-gray-100 transition-colors">
            <Camera size={28} className="mb-2 text-[#D71920]" />
            <span className="text-xs font-bold uppercase tracking-widest">Tap to take photo</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#E5E5E5] border-t-4 border-black z-40 pb-safe">
        <Button fullWidth size="lg" onClick={() => setIsSubmitted(true)}>
          Submit Issue
        </Button>
      </div>
    </div>
  );
}
