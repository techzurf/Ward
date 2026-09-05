import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { issues } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Calendar, CheckCircle2, Clock, PlayCircle, Share2, Phone } from 'lucide-react';
import { cn } from '../utils';

export function IssueDetails({ navigate, params }: { navigate: (s: Screen, params?: any) => void, params?: any }) {
  const issue = issues.find(i => i.id === params?.id) || issues[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-gray-200 text-black border-black';
      case 'Under Review': return 'bg-black text-white border-black';
      case 'In Progress': return 'bg-[#D71920] text-white border-black';
      case 'Resolved': return 'bg-[#FFD400] text-black border-black';
      default: return 'bg-gray-200 text-black border-black';
    }
  };

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="Issue Details" showBack onBack={() => navigate('IssuesList')} />
      
      <div className="flex-1 overflow-y-auto">
        {issue.imageUrl && (
          <div className="w-full h-48 bg-black relative border-b-8 border-black">
            <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-5 space-y-5">
          <Card className={cn("border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5", issue.imageUrl ? "-mt-10 relative z-10" : "")}>
            <div className="flex justify-between items-start mb-4 border-b-2 border-dashed border-gray-300 pb-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{issue.id}</span>
              <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border-2", getStatusColor(issue.status))}>
                {issue.status}
              </span>
            </div>
            
            <h1 className="text-xl font-bold uppercase tracking-wider text-black mb-4">{issue.title}</h1>
            
            <div className="flex gap-4 items-center mb-5 pb-5 border-b-2 border-dashed border-gray-300">
              <Badge variant="black" className="border-2 border-black">{issue.category}</Badge>
              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-gray-600">
                <Calendar size={12} className="text-[#D71920]" /> {issue.dateReported}
              </div>
            </div>

            <p className="text-black text-sm font-bold leading-relaxed mb-5">
              {issue.description}
            </p>

            <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]">
              <MapPin size={20} className="text-[#D71920] shrink-0 mt-0.5" />
              <span className="text-sm font-bold text-black uppercase tracking-wider">{issue.location}</span>
            </div>
          </Card>

          {issue.updates && issue.updates.length > 0 && (
            <section>
              <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-4">Status Timeline</h3>
              <div className="space-y-4">
                {issue.updates.map((update, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#000000] border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D71920]"></div>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-xl border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] relative">
                      <div className="flex items-center justify-between mb-2 border-b-2 border-dashed border-gray-200 pb-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-black">{update.status}</span>
                        <time className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{update.date}</time>
                      </div>
                      <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide leading-relaxed">{update.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex gap-4 pt-4">
            <Button variant="outline" fullWidth size="lg" className="gap-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
              <Share2 size={18} /> Share
            </Button>
            <Button variant="outline" fullWidth size="lg" className="gap-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
              <Phone size={18} /> Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
