import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ChevronRight, Bell, Shield, HelpCircle, Info } from 'lucide-react';

export function Settings({ navigate }: { navigate: (s: Screen) => void }) {
  const settingsItems = [
    { icon: Bell, label: 'Push Notifications' },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: Info, label: 'About App' },
  ];

  return (
    <div className="flex-1 bg-gray-50 pb-20 flex flex-col h-full">
      <Header title="Settings" showBack onBack={() => navigate('Profile')} />
      
      <div className="flex-1 p-4 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 active:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                    <Icon size={16} className="text-black" />
                  </div>
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            );
          })}
        </div>

        <div className="text-center text-xs text-gray-400 font-medium">
          <p>Chennai Corporation Ward App</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
