import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { activities } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function ActivitiesList({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="Ward Activities" />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {activities.map(act => (
          <Card key={act.id} noPadding className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl flex flex-col bg-white active:translate-y-1 active:shadow-none transition-all cursor-pointer" onClick={() => navigate('ActivityDetails', { id: act.id })}>
            {act.imageUrl ? (
              <img src={act.imageUrl} alt={act.title} className="w-full h-40 object-cover border-b-4 border-black" />
            ) : (
              <div className="w-full h-10 border-b-4 border-black bg-[#FFD400]"></div>
            )}
            
            <div className="p-4 relative">
              <div className="absolute right-4 -top-6 bg-white p-2 rounded-lg border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex flex-col items-center justify-center min-w-[50px]">
                <span className="text-[#D71920] font-bold text-sm leading-none">{act.date.split(' ')[0]}</span>
                <span className="text-black font-bold text-[9px] uppercase tracking-widest leading-none mt-1">{act.date.split(' ')[1]}</span>
              </div>
              
              <Badge variant="black" className="mb-3 border-2 border-black">{act.category}</Badge>
              <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-2 pr-16 leading-tight">{act.title}</h3>
              <p className="text-[10px] uppercase tracking-wide font-bold text-gray-600 mb-4 line-clamp-2">{act.description}</p>
              
              <div className="space-y-2 pt-3 border-t-2 border-dashed border-gray-300">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-black">
                  <Clock size={14} className="text-[#FFD400]" /> {act.time}
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-black">
                  <MapPin size={14} className="text-[#D71920]" /> {act.location}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
