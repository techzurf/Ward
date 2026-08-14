import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { areas } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Search, MapPin, AlertCircle } from 'lucide-react';

export function AreasList({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="Areas & Streets" showBack onBack={() => navigate('WardOverview')} />
      
      <div className="p-5 bg-[#000000] border-b-8 border-black">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search areas, localities..."
            className="w-full bg-white border-4 border-black rounded py-3 pl-10 pr-4 text-sm font-bold uppercase tracking-wider placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {areas.map(area => (
          <Card key={area.id} className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white active:translate-y-1 active:shadow-none transition-all cursor-pointer" onClick={() => navigate('AreaDetails', { id: area.id })}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg uppercase tracking-wider text-black">{area.name}</h3>
              {area.openIssuesCount > 0 && (
                <Badge variant="red" className="flex items-center gap-1 border-2 border-black">
                  <AlertCircle size={10} /> {area.openIssuesCount} Issues
                </Badge>
              )}
            </div>
            
            <div className="flex gap-4 text-sm text-gray-600 mt-4 pt-3 border-t-2 border-dashed border-gray-300">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#D71920]" />
                <span className="font-bold text-[10px] uppercase tracking-widest text-black">{area.streetsCount} Streets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[10px] uppercase tracking-widest text-black">{area.residentsCount.toLocaleString()} Residents</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
