import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { wardInfo, currentCouncillor, areas } from '../data';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Map, Users, Home as HomeIcon, MapPin, Navigation } from 'lucide-react';

export function WardOverview({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20">
      <Header title="Ward Overview" />
      
      <div className="p-4 space-y-4">
        {/* Map Placeholder */}
        <div className="w-full h-48 bg-white rounded-xl overflow-hidden relative border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Map className="text-black w-12 h-12 opacity-50" />
          </div>
          <div className="absolute bottom-3 right-3 bg-[#FFD400] px-3 py-1.5 rounded shadow-sm font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 border-2 border-black">
            <Navigation size={14} className="text-black" /> View Map
          </div>
        </div>

        <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-black">Ward {wardInfo.number}</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center shrink-0 border-2 border-black">
                <Users size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest break-words">Population</p>
                <p className="font-bold text-sm text-black">{wardInfo.population}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D71920] flex items-center justify-center shrink-0 border-2 border-black">
                <HomeIcon size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest break-words">Households</p>
                <p className="font-bold text-sm text-black">{wardInfo.households}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFD400] flex items-center justify-center shrink-0 border-2 border-black">
                <MapPin size={16} className="text-black" />
              </div>
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest break-words">Zone</p>
                <p className="font-bold text-sm text-black">{wardInfo.zone}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xs uppercase tracking-widest text-black">Areas Covered</h3>
            <button onClick={() => navigate('AreasList')} className="text-[10px] font-bold text-[#D71920] uppercase tracking-wider">View All</button>
          </div>
          <div className="space-y-2">
            {areas.slice(0, 3).map(area => (
              <div key={area.id} onClick={() => navigate('AreaDetails', { id: area.id })} className="bg-white p-3 rounded-lg border-2 border-black flex justify-between items-center active:bg-gray-100 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                <span className="font-bold text-xs uppercase tracking-wider text-black">{area.name}</span>
                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{area.streetsCount} streets</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button fullWidth size="lg" onClick={() => navigate('CouncillorProfile')}>
            Councillor Profile
          </Button>
          <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('DevelopmentWorks')}>
            Development Works
          </Button>
        </div>
      </div>
    </div>
  );
}
