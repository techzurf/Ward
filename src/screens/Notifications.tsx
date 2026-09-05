import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { notifications } from '../data';
import { Card } from '../components/ui/Card';
import { AlertCircle, Megaphone, Calendar as CalendarIcon, Info } from 'lucide-react';
import { cn } from '../utils';

export function Notifications({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'issue': return <AlertCircle size={20} className="text-white" />;
      case 'announcement': return <Megaphone size={20} className="text-black" />;
      case 'activity': return <CalendarIcon size={20} className="text-white" />;
      default: return <Info size={20} className="text-white" />;
    }
  };

  const getBg = (category: string) => {
    switch (category) {
      case 'issue': return 'bg-[#D71920] border-2 border-black';
      case 'announcement': return 'bg-[#FFD400] border-2 border-black';
      case 'activity': return 'bg-[#000000] border-2 border-black';
      default: return 'bg-gray-400 border-2 border-black';
    }
  };

  return (
    <div className="flex-1 bg-[#E5E5E5] flex flex-col h-full">
      <Header title="Notifications" showBack onBack={() => navigate('Home')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {notifications.map(notif => (
          <Card 
            key={notif.id} 
            className={cn("transition-all cursor-pointer", !notif.isRead ? "bg-white border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl" : "bg-gray-100 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.5)] rounded-lg opacity-80")}
            onClick={() => {
              if (notif.linkScreen) {
                navigate(notif.linkScreen, notif.linkParams);
              }
            }}
          >
            <div className="flex gap-4">
              <div className={cn("w-12 h-12 rounded flex flex-col items-center justify-center shrink-0 shadow-[2px_2px_0_rgba(0,0,0,1)]", getBg(notif.category))}>
                {getIcon(notif.category)}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={cn("text-sm uppercase tracking-wider", !notif.isRead ? "font-bold text-black" : "font-bold text-gray-700")}>
                    {notif.title}
                  </h3>
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap ml-2">{notif.date}</span>
                </div>
                <p className={cn("text-[10px] font-bold uppercase tracking-wide leading-relaxed", !notif.isRead ? "text-gray-800" : "text-gray-500")}>
                  {notif.body}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
