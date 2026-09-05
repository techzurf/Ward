import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { announcements } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Megaphone, Calendar } from 'lucide-react';
import { cn } from '../utils';

export function AnnouncementsList({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="Announcements" showBack onBack={() => navigate('Home')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {announcements.map(ann => (
          <Card key={ann.id} onClick={() => navigate('AnnouncementDetails', { id: ann.id })} className={cn("border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white cursor-pointer active:translate-y-1 active:shadow-none transition-all", ann.isImportant && "border-l-8 border-l-[#D71920]")}>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#000000] rounded-xl flex items-center justify-center shrink-0 border-2 border-black">
                <Megaphone size={20} className={ann.isImportant ? "text-[#D71920]" : "text-[#FFD400]"} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={ann.isImportant ? "red" : "black"} className="border-2 border-black">
                    {ann.category}
                  </Badge>
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1">
                    <Calendar size={10} /> {ann.date}
                  </span>
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-1 leading-tight">{ann.title}</h3>
                <p className="text-[10px] uppercase tracking-wide font-bold text-gray-600 line-clamp-2">{ann.shortDescription}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
