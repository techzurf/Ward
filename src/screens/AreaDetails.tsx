import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { areas } from '../data';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Users, AlertTriangle, Building } from 'lucide-react';

export function AreaDetails({ navigate, params }: { navigate: (s: Screen) => void, params?: any }) {
  const area = areas.find(a => a.id === params?.id) || areas[0];

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20">
      <Header title={area.name} showBack onBack={() => navigate('AreasList')} />
      
      <div className="p-5 space-y-5">
        <div className="bg-[#000000] text-white p-5 rounded-xl border-4 border-[#000000] shadow-[4px_4px_0_rgba(215,25,32,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#D71920] rounded-full opacity-30 -mr-6 -mt-6"></div>
          <h2 className="text-2xl font-bold mb-1 uppercase tracking-wider">{area.name}</h2>
          <p className="text-[#FFD400] font-bold text-[10px] uppercase tracking-widest">Ward {area.wardNumber}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6 border-t-2 border-dashed border-gray-600 pt-4">
            <div>
              <p className="text-[#FFD400] text-[9px] font-bold uppercase tracking-widest mb-1">Streets</p>
              <p className="font-bold text-xl">{area.streetsCount}</p>
            </div>
            <div>
              <p className="text-[#FFD400] text-[9px] font-bold uppercase tracking-widest mb-1">Residents</p>
              <p className="font-bold text-xl">{area.residentsCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5">
          <div className="flex justify-between items-center mb-5 border-b-4 border-black pb-4">
            <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D71920] rounded flex items-center justify-center border-2 border-black">
                <AlertTriangle className="text-white" size={20} />
              </div>
              Reported Issues
            </h3>
            <span className="text-3xl font-bold text-black">{area.openIssuesCount}</span>
          </div>
          <Button fullWidth size="lg" variant="outline" onClick={() => navigate('IssuesList')} className="shadow-[4px_4px_0_rgba(0,0,0,1)]">View Issues</Button>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-3 border-b-4 border-black pb-4">
            <div className="w-10 h-10 bg-[#FFD400] rounded flex items-center justify-center border-2 border-black">
              <Building className="text-black" size={20} />
            </div>
            Important Locations
          </h3>
          <ul className="space-y-4">
            {area.importantLocations.map((loc, idx) => (
              <li key={idx} className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg border-2 border-black">
                <div className="w-8 h-8 rounded bg-[#000000] border-2 border-black flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-white" />
                </div>
                <span className="font-bold text-xs uppercase tracking-wide text-black">{loc}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
