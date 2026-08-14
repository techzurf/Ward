import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { activities } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Calendar, Clock, Share2 } from 'lucide-react';

export function ActivityDetails({ navigate, params }: { navigate: (s: Screen) => void, params?: any }) {
  const act = activities.find(a => a.id === params?.id) || activities[0];

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="Activity Details" showBack onBack={() => navigate('ActivitiesList')} />
      
      <div className="flex-1 overflow-y-auto">
        {act.imageUrl && (
          <div className="w-full h-56 bg-black relative border-b-8 border-black">
            <img src={act.imageUrl} alt={act.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        )}

        <div className="p-5 space-y-5">
          <Card className={cn("border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5", act.imageUrl ? "-mt-12 relative z-10" : "")}>
            <Badge variant="yellow" className="mb-4 border-2 border-black">{act.category}</Badge>
            <h1 className="text-xl font-bold uppercase tracking-wider text-black mb-5">{act.title}</h1>
            
            <div className="space-y-4 mb-5 pb-5 border-b-4 border-black">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#D71920] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  <Calendar size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Date</p>
                  <p className="font-bold text-sm text-black">{act.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#FFD400] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  <Clock size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Time</p>
                  <p className="font-bold text-sm text-black">{act.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#000000] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Location</p>
                  <p className="font-bold text-sm text-black">{act.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-3">About Activity</h3>
              <p className="text-black text-sm font-bold leading-relaxed">
                {act.description}
              </p>
            </div>
          </Card>

          <Button fullWidth size="lg" className="gap-2">
            Register to Volunteer
          </Button>
          <Button fullWidth size="lg" variant="outline" className="gap-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <Share2 size={18} /> Share Activity
          </Button>
        </div>
      </div>
    </div>
  );
}
