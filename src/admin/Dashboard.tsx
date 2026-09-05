import React from 'react';
import { Users, AlertCircle, HardHat, Calendar, Megaphone, Heart } from 'lucide-react';
import { cn } from '../utils';

export function Dashboard({ onNavigate }: { onNavigate: (path: string) => void }) {
  const stats = [
    { label: 'Total Members', value: '1,245', icon: Users, color: 'bg-black text-white border-black', path: 'members' },
    { label: 'Active Issues', value: '28', icon: AlertCircle, color: 'bg-[#D71920] text-white border-black', path: 'issues' },
    { label: 'Ongoing Works', value: '5', icon: HardHat, color: 'bg-[#FFD400] text-black border-black', path: 'works' },
    { label: 'Upcoming Activities', value: '3', icon: Calendar, color: 'bg-white text-black border-black', path: 'activities' },
    { label: 'Active Announcements', value: '2', icon: Megaphone, color: 'bg-white text-black border-black', path: 'announcements' },
    { label: 'Total Donations', value: '₹45,500', icon: Heart, color: 'bg-black text-[#FFD400] border-black', path: 'donations' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              onClick={() => onNavigate(stat.path)}
              className={cn(
                "p-6 rounded-xl border-4 shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-4 cursor-pointer hover:-translate-y-1 transition-transform",
                stat.color
              )}
            >
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center shrink-0 border-2 border-current">
                <Icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b-4 border-black pb-4 mb-4">Recent Issues</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-sm">Street light not working in Poes Garden</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Reported Today • Street Lights</p>
                </div>
                <span className="bg-[#D71920] text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border-2 border-black">
                  New
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate('issues')} className="mt-4 w-full py-3 border-2 border-black font-bold uppercase tracking-widest text-xs hover:bg-[#FFD400] transition-colors rounded">
            View All Issues
          </button>
        </div>

        <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b-4 border-black pb-4 mb-4">Recent Donations</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-sm">Ramesh K.</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Ward Development Fund</p>
                </div>
                <span className="text-lg font-black text-[#D71920]">
                  ₹5,000
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate('donations')} className="mt-4 w-full py-3 border-2 border-black font-bold uppercase tracking-widest text-xs hover:bg-[#FFD400] transition-colors rounded">
            View All Donations
          </button>
        </div>
      </div>
    </div>
  );
}
