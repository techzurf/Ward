import React, { useState } from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Heart, ShieldCheck, Info } from 'lucide-react';
import { cn } from '../utils';

export function Donate({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  const [selectedAmount, setSelectedAmount] = useState<string>('500');
  const amounts = ['100', '500', '1,000', '2,000'];

  return (
    <div className="flex-1 bg-[#E5E5E5] flex flex-col h-full relative">
      <Header title="Donate" showBack onBack={() => navigate('Home')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-28">
        
        <div className="text-center pt-2 pb-4">
          <div className="w-16 h-16 bg-[#D71920] rounded-full mx-auto flex items-center justify-center border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] mb-4">
            <Heart size={32} className="text-white fill-white" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-widest text-black mb-2">Support Your Ward</h2>
          <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-wider">
            Your contribution helps fund community initiatives, local events, and ward development activities.
          </p>
        </div>

        <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5">
          <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-4 flex items-center gap-2 border-b-2 border-dashed border-gray-300 pb-3">
            <Info size={16} className="text-[#D71920]" /> Select Amount
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {amounts.map(amt => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={cn(
                  "py-3 px-2 text-sm font-bold uppercase tracking-widest rounded text-center transition-colors border-2",
                  selectedAmount === amt 
                    ? "bg-[#000000] text-[#FFD400] border-black shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" 
                    : "bg-white text-black border-black active:bg-gray-200"
                )}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Custom Amount (₹)</label>
            <input 
              type="number" 
              placeholder="Enter custom amount"
              onClick={() => setSelectedAmount('custom')}
              className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]"
            />
          </div>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-[#000000] p-5 text-white">
          <h3 className="font-bold text-xs uppercase tracking-widest text-[#FFD400] mb-4 flex items-center gap-2">
            <ShieldCheck size={16} /> Secure Payment
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed text-gray-300">
            This is a secure 256-bit encrypted transaction. By proceeding, you agree to our terms and conditions for community donations.
          </p>
        </Card>

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#E5E5E5] border-t-4 border-black z-40 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
        <Button fullWidth size="lg" onClick={() => alert("Donation prototype triggered")}>
          Donate Now
        </Button>
      </div>
    </div>
  );
}
