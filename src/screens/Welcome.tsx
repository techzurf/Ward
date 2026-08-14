import React from 'react';
import { Screen } from '../types';
import { Button } from '../components/ui/Button';
import { Users, MapPin, AlertCircle } from 'lucide-react';

export function Welcome({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 bg-[#E5E5E5] flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920] opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="flex-1 p-8 flex flex-col justify-center relative z-10">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-black mb-4 uppercase tracking-tighter">Chennai<br/><span className="text-[#D71920]">Ward</span></h1>
          <p className="text-black font-bold text-sm uppercase tracking-widest bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">Civic Engagement</p>
        </div>

        <div className="space-y-4 mb-12">
          <div className="bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-4">
            <div className="w-12 h-12 bg-[#000000] rounded flex items-center justify-center shrink-0 border-2 border-black">
              <Users className="text-[#FFD400]" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-black text-sm uppercase tracking-widest mb-1">Know Leaders</h3>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider">Direct access to Councillor.</p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-4">
            <div className="w-12 h-12 bg-[#D71920] rounded flex items-center justify-center shrink-0 border-2 border-black">
              <AlertCircle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-black text-sm uppercase tracking-widest mb-1">Report Issues</h3>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider">Quick civic issue tracking.</p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFD400] rounded flex items-center justify-center shrink-0 border-2 border-black">
              <MapPin className="text-black" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-black text-sm uppercase tracking-widest mb-1">Track Progress</h3>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wider">Monitor local works.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#000000] border-t-8 border-[#D71920] space-y-4 pb-safe relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <Button fullWidth size="lg" onClick={() => navigate('Home')}>
          Get Started
        </Button>
        <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-widest">
          <button className="text-[#FFD400]">English</button>
          <span className="text-gray-600">|</span>
          <button className="text-white">தமிழ்</button>
        </div>
      </div>
    </div>
  );
}
