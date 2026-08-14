import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { currentUser } from '../data';
import { Card } from '../components/ui/Card';
import { ChevronRight, FileText, Bell, Globe, Settings as SettingsIcon, LogOut, Calendar, Users } from 'lucide-react';

export function Profile({ navigate }: { navigate: (s: Screen) => void }) {
  const menuItems = [
    { icon: Users, label: 'My Membership', screen: 'MyMembership' as Screen },
    { icon: FileText, label: 'My Reported Issues', screen: 'MyIssues' as Screen },
    { icon: Calendar, label: 'My Activities', screen: 'ActivitiesList' as Screen },
    { icon: Bell, label: 'Notifications', screen: 'Notifications' as Screen },
    { icon: Globe, label: 'Language', screen: 'Language' as Screen },
    { icon: SettingsIcon, label: 'Settings', screen: 'Settings' as Screen },
  ];

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="My Profile" />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="flex flex-col items-center pt-4 pb-2">
          <div className="relative mb-4">
            <img src={currentUser.imageUrl} alt={currentUser.name} className="w-24 h-24 rounded-xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] object-cover" />
            <button className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#FFD400] rounded flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] text-black active:translate-y-px active:shadow-none transition-all">
              <SettingsIcon size={18} />
            </button>
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-black mt-2">{currentUser.name}</h2>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">{currentUser.phone}</p>
        </div>

        <Card className="divide-y-2 divide-dashed divide-gray-300 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white">
          <div className="py-4 flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Ward</span>
            <span className="text-sm font-bold text-black">{currentUser.ward}</span>
          </div>
          <div className="py-4 flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Area</span>
            <span className="text-sm font-bold text-black">{currentUser.area}</span>
          </div>
          <div className="py-4 flex justify-between items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 shrink-0">Street</span>
            <span className="text-sm font-bold text-black truncate flex-1 text-right">{currentUser.street}</span>
          </div>
        </Card>

        <div className="bg-white rounded-xl border-4 border-black overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,1)] divide-y-2 divide-black">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.screen)}
                className="w-full flex items-center justify-between p-4 active:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-[#000000] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_rgba(215,25,32,1)]">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider text-black">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-black" />
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => navigate('Welcome')}
          className="w-full flex items-center justify-center gap-3 p-4 bg-[#D71920] text-white font-bold uppercase tracking-wider active:translate-y-1 active:shadow-none border-4 border-black rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}
