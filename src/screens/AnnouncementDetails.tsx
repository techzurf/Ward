import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { announcements } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Share2, Calendar, Megaphone } from 'lucide-react';
import { cn } from '../utils';

export function AnnouncementDetails({ navigate, params }: { navigate: (s: Screen) => void, params?: any }) {
  const ann = announcements.find(a => a.id === params?.id) || announcements[0];

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="Announcement" showBack onBack={() => navigate('AnnouncementsList')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <Card className={cn("border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white", ann.isImportant && "border-t-8 border-t-[#D71920]")}>
          <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
            <Badge variant={ann.isImportant ? "red" : "black"} className="border-2 border-black">{ann.category}</Badge>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-gray-500">
              <Calendar size={14} /> {ann.date}
            </div>
          </div>
          
          <h1 className="text-xl font-bold uppercase tracking-wider text-black mb-5 flex items-start gap-3 leading-tight">
            <div className={cn("w-10 h-10 rounded flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", ann.isImportant ? "bg-[#D71920] text-white" : "bg-[#FFD400] text-black")}>
              <Megaphone size={20} />
            </div>
            {ann.title}
          </h1>
          
          <div className="prose prose-sm text-black font-bold leading-relaxed">
            <p>{ann.fullContent}</p>
          </div>
        </Card>

        <Button fullWidth size="lg" variant="outline" className="gap-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <Share2 size={18} /> Share Notice
        </Button>
      </div>
    </div>
  );
}
