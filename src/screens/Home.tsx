import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { currentUser, currentCouncillor, wardInfo, announcements, activities } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Phone, MessageCircle, AlertTriangle, Info, Bell, ChevronRight, CheckCircle2, Users, Heart } from 'lucide-react';

export function Home({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="bg-[#000000] text-white px-5 pt-8 pb-6 border-b-8 border-black relative z-10 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[#FFD400] text-[10px] uppercase font-bold tracking-widest mb-1">Vanakkam / Welcome</p>
            <h1 className="text-xl font-bold tracking-tight">Citizen Dashboard</h1>
          </div>
          <button onClick={() => navigate('Notifications')} className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center text-[#FFD400] relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#D71920] rounded-full border border-black"></span>
          </button>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-3 flex gap-4 items-center border-l-4 border-[#D71920]">
          <img src={currentCouncillor.imageUrl} alt="Councillor" className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD400] shrink-0" />
          <div className="flex-1">
            <p className="text-[#FFFFFF] text-xs font-bold uppercase tracking-wider">{currentCouncillor.name}</p>
            <p className="text-[#FFD400] text-[10px] mb-1.5 uppercase font-bold">Ward Councillor ({currentCouncillor.zone})</p>
            <div className="flex gap-2">
              <button className="px-2 py-0.5 bg-[#D71920] text-white text-[9px] font-bold rounded uppercase tracking-wider">Contact</button>
              <button className="px-2 py-0.5 bg-white text-black text-[9px] font-bold rounded uppercase tracking-wider">WhatsApp</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#000000] p-4 rounded-xl flex flex-col items-center border-2 border-black shadow-md">
            <p className="text-[#FFD400] text-sm font-bold">{wardInfo.population}</p>
            <p className="text-white text-[9px] font-bold uppercase tracking-widest mt-1">Population</p>
          </div>
          <div className="bg-[#D71920] p-4 rounded-xl flex flex-col items-center border-2 border-black shadow-md">
            <p className="text-white text-sm font-bold">{wardInfo.openIssues} Active</p>
            <p className="text-white text-[9px] font-bold uppercase tracking-widest mt-1">Open Issues</p>
          </div>
        </div>

        {/* Quick Actions */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-black">Quick Services</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <button 
              onClick={() => navigate('ReportIssue')}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 bg-[#FFD400] rounded-full flex items-center justify-center shadow-md border-2 border-black">
                <AlertTriangle className="text-black" size={20} />
              </div>
              <span className="text-[9px] text-center font-bold uppercase tracking-widest text-black">Report</span>
            </button>
            
            <button 
              onClick={() => navigate('WardOverview')}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center shadow-md border-2 border-black">
                <Info className="text-white" size={20} />
              </div>
              <span className="text-[9px] text-center font-bold uppercase tracking-widest text-black">Ward</span>
            </button>

            <button 
              onClick={() => navigate('DevelopmentWorks')}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 bg-[#D71920] rounded-full flex items-center justify-center shadow-md border-2 border-black">
                <CheckCircle2 className="text-white" size={20} />
              </div>
              <span className="text-[9px] text-center font-bold uppercase tracking-widest text-black">Works</span>
            </button>

            <button 
              onClick={() => navigate('Donate')}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-black">
                <Heart className="text-black" size={20} />
              </div>
              <span className="text-[9px] text-center font-bold uppercase tracking-widest text-black">Donate</span>
            </button>
          </div>

          <div 
            onClick={() => navigate('MembershipHome')}
            className="bg-[#000000] rounded-xl border-4 border-black p-4 flex items-center gap-4 cursor-pointer shadow-[4px_4px_0_rgba(215,25,32,1)] active:translate-y-1 active:shadow-none transition-all"
          >
            <div className="w-12 h-12 bg-[#FFD400] rounded-full flex items-center justify-center border-2 border-black shrink-0">
              <Users className="text-black" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-[#FFFFFF] font-bold text-sm uppercase tracking-wider mb-0.5">Become a Member</h4>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Join the organization today</p>
            </div>
            <ChevronRight className="text-[#FFD400]" size={20} />
          </div>
        </section>

        {/* Announcements */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black">Announcements</h2>
            <button onClick={() => navigate('AnnouncementsList')} className="text-[10px] text-[#D71920] font-bold uppercase tracking-wider">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {announcements.slice(0, 2).map(ann => (
              <div key={ann.id} onClick={() => navigate('AnnouncementDetails', { id: ann.id })} className="bg-gray-50 border-2 border-black p-3 rounded-lg flex gap-3 cursor-pointer active:bg-gray-200">
                <div className="w-1.5 bg-[#FFD400]"></div>
                <div>
                  <h3 className="text-[11px] font-bold uppercase text-black leading-tight mb-1">{ann.title}</h3>
                  <p className="text-[10px] text-gray-600 font-bold tracking-wide">{ann.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activities */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black">Recent Activities</h2>
            <button onClick={() => navigate('ActivitiesList')} className="text-[10px] text-[#D71920] font-bold uppercase tracking-wider">
              View All
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x no-scrollbar">
            {activities.map(act => (
              <Card key={act.id} noPadding className="min-w-[220px] snap-center shrink-0 border-4 border-black rounded-2xl" onClick={() => navigate('ActivityDetails', { id: act.id })}>
                {act.imageUrl && (
                  <img src={act.imageUrl} alt={act.title} className="w-full h-28 object-cover border-b-2 border-black" />
                )}
                <div className="p-3 bg-white">
                  <Badge variant="black" className="mb-2">{act.category}</Badge>
                  <h3 className="font-bold text-xs uppercase tracking-wide mb-1 truncate text-black">{act.title}</h3>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{act.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
