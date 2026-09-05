import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { issues, currentUser } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { MapPin } from 'lucide-react';
import { cn } from '../utils';

export function MyIssues({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  const myIssues = issues.filter(i => i.reporterId === currentUser.id);

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
      <Header title="My Reported Issues" showBack onBack={() => navigate('Profile')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {myIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-[#000000] border-4 border-black rounded-xl flex items-center justify-center mb-4 shadow-[4px_4px_0_rgba(215,25,32,1)]">
              <MapPin className="text-[#FFD400]" size={24} />
            </div>
            <p className="font-bold uppercase tracking-wider text-black mb-1">No issues reported</p>
            <p className="text-[10px] uppercase tracking-wide font-bold text-gray-500">You haven't reported any issues yet.</p>
          </div>
        ) : (
          myIssues.map(issue => (
            <Card key={issue.id} onClick={() => navigate('IssueDetails', { id: issue.id })} className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white cursor-pointer active:translate-y-1 active:shadow-none transition-all">
              <div className="flex justify-between items-start mb-3 border-b-2 border-dashed border-gray-300 pb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{issue.id}</span>
                <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border-2", getStatusColor(issue.status))}>
                  {issue.status}
                </span>
              </div>
              
              <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-3 line-clamp-2 leading-tight">{issue.title}</h3>
              
              <div className="flex justify-between items-center">
                <Badge variant="black" className="border-2 border-black">{issue.category}</Badge>
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{issue.dateReported}</span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
