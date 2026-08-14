import React, { useState } from 'react';
import { Screen, IssueCategory } from '../types';
import { Header } from '../components/layout/Header';
import { issues } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Filter, MapPin } from 'lucide-react';
import { cn } from '../utils';

export function IssuesList({ navigate }: { navigate: (s: Screen) => void }) {
  const [activeCategory, setActiveCategory] = useState<IssueCategory | 'All'>('All');
  const categories: (IssueCategory | 'All')[] = ['All', 'Roads', 'Street Lights', 'Drainage', 'Garbage', 'Water', 'Traffic', 'Public Facilities', 'Other'];

  const filteredIssues = activeCategory === 'All' ? issues : issues.filter(i => i.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-gray-200 text-black';
      case 'Under Review': return 'bg-black text-white';
      case 'In Progress': return 'bg-[#D71920] text-white';
      case 'Resolved': return 'bg-[#FFD400] text-black';
      default: return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="flex-1 pb-20 flex flex-col h-full relative">
      <Header title="Ward Issues" />
      
      {/* Category Tabs */}
      <div className="bg-[#E5E5E5] border-b-2 border-black sticky top-16 z-10">
        <div className="flex overflow-x-auto px-4 py-3 gap-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors border-2 uppercase tracking-widest",
                activeCategory === cat 
                  ? "bg-[#000000] text-[#FFD400] border-[#000000]" 
                  : "bg-white text-black border-black active:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredIssues.map(issue => {
          let borderColor = 'border-black';
          if (issue.status === 'Resolved') borderColor = 'border-[#FFD400]';
          if (issue.status === 'In Progress') borderColor = 'border-[#D71920]';
          
          return (
            <div key={issue.id} onClick={() => navigate('IssueDetails', { id: issue.id })} className={cn("border-l-8 bg-white p-3 rounded-r-xl border-y-2 border-r-2 shadow-sm cursor-pointer", borderColor)}>
              <div className="flex justify-between items-start">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{issue.id} • {issue.category}</p>
                <span className={cn("text-[9px] px-2 py-0.5 font-bold rounded uppercase tracking-widest border border-black", getStatusColor(issue.status))}>
                  {issue.status}
                </span>
              </div>
              
              <h4 className="text-sm font-bold mt-2 leading-tight uppercase tracking-wider">{issue.title}</h4>
              <p className="text-[10px] text-gray-600 mt-1 font-bold">{issue.dateReported} • {issue.location}</p>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-20 right-4 z-40">
        <button 
          onClick={() => navigate('ReportIssue')}
          className="bg-[#D71920] w-14 h-14 text-white rounded-full border-4 border-[#FFFFFF] shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        >
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
}
