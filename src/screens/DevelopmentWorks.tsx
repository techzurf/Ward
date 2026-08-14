import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { developmentWorks } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { MapPin, Calendar, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

export function DevelopmentWorks({ navigate }: { navigate: (s: Screen) => void }) {
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return <CheckCircle2 size={14} className="mr-1" />;
      case 'Ongoing': return <PlayCircle size={14} className="mr-1" />;
      case 'Planned': return <Clock size={14} className="mr-1" />;
      default: return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'Ongoing': return 'yellow';
      case 'Planned': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="Development Works" showBack onBack={() => navigate('WardOverview')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {developmentWorks.map(work => (
          <Card key={work.id} noPadding className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl flex flex-col bg-white">
            {work.imageUrl && (
              <img src={work.imageUrl} alt={work.title} className="w-full h-40 object-cover border-b-4 border-black" />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                <Badge variant="black" className="border-2 border-black">{work.category}</Badge>
                <Badge variant={getStatusVariant(work.status)} className="flex items-center border-2 border-black">
                  {getStatusIcon(work.status)} {work.status}
                </Badge>
              </div>
              
              <h3 className="text-sm uppercase tracking-wider font-bold text-black mb-2 leading-tight">{work.title}</h3>
              <p className="text-[10px] uppercase tracking-wide font-bold text-gray-600 mb-4 line-clamp-2">{work.description}</p>
              
              <div className="mt-auto space-y-2 pt-3 border-t-2 border-dashed border-gray-300">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-black">
                  <MapPin size={14} className="text-[#D71920]" /> {work.location}
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-black">
                  <Calendar size={14} className="text-[#FFD400]" /> Started: {work.startDate}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
