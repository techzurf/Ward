import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { currentMembership } from '../data';
import { Download, Share2, ShieldCheck, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

export function MembershipCard({ navigate }: { navigate: (s: Screen) => void }) {
  if (!currentMembership) {
    return null;
  }

  return (
    <div className="flex-1 bg-[#E5E5E5] flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920] opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD400] opacity-20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <Header title="Membership Card" showBack onBack={() => navigate('MyMembership')} />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        <motion.div 
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full max-w-[340px] aspect-[5/8] bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden flex flex-col relative"
        >
          {/* Card Header */}
          <div className="bg-[#D71920] p-4 text-center border-b-4 border-black relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -mt-8 -mr-8"></div>
            <div className="w-10 h-10 bg-[#FFD400] rounded-full mx-auto mb-2 border-2 border-black flex items-center justify-center shadow-[2px_2px_0_rgba(0,0,0,1)]">
              <ShieldCheck size={20} className="text-black" />
            </div>
            <h2 className="text-white font-bold text-[15px] uppercase tracking-widest leading-tight">Chennai Ward<br/>Organization</h2>
          </div>

          {/* Card Body */}
          <div className="flex-1 p-5 flex flex-col items-center relative">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] bg-[length:10px_10px]"></div>
            
            <img src={currentMembership.profilePhoto} alt={currentMembership.name} className="w-24 h-24 rounded-lg border-4 border-black shadow-[4px_4px_0_rgba(215,25,32,1)] object-cover mb-4 relative z-10" />
            
            <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-1 relative z-10">{currentMembership.name}</h3>
            <p className="text-[#D71920] font-bold text-[10px] uppercase tracking-widest mb-4 bg-red-50 px-2 py-0.5 rounded border border-red-200 relative z-10">{currentMembership.membershipType}</p>
            
            <div className="w-full space-y-3 relative z-10">
              <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Member ID</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">{currentMembership.memberId}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Ward</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">{currentMembership.wardNumber} ({currentMembership.area})</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Mobile</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">{currentMembership.mobile}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Joined</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">{currentMembership.joiningDate}</span>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-[#000000] p-4 flex items-center justify-between border-t-4 border-black">
            <div className="w-12 h-12 bg-white rounded border-2 border-black flex items-center justify-center shadow-[2px_2px_0_rgba(255,212,0,1)]">
              <QrCode size={24} className="text-black" />
            </div>
            <div className="text-right">
              <p className="text-white text-[9px] font-bold uppercase tracking-widest opacity-80">Valid Till</p>
              <p className="text-[#FFD400] text-sm font-bold uppercase tracking-widest">Dec 2028</p>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-4 mt-8 w-full max-w-[340px]">
          <Button fullWidth size="lg" className="gap-2 text-[10px]">
            <Download size={16} /> Download
          </Button>
          <Button fullWidth size="lg" variant="secondary" className="gap-2 text-[10px]">
            <Share2 size={16} /> Share Card
          </Button>
        </div>

      </div>
    </div>
  );
}
