import React, { useState } from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../utils';

export function Language({ navigate, language }: { navigate: (s: Screen) => void, language: string }) {
  const [selectedLang, setSelectedLang] = useState(language);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    // In a real app, this would update global state/context
    setTimeout(() => {
      navigate('Profile');
    }, 300);
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20 flex flex-col h-full">
      <Header title="App Language" showBack onBack={() => navigate('Profile')} />
      
      <div className="flex-1 p-4 space-y-4">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">Select Language / மொழி</p>
        
        <Card 
          className={cn("active:bg-gray-50 transition-colors flex justify-between items-center", selectedLang === 'en' ? 'border-[#D71920]' : '')}
          onClick={() => handleSelect('en')}
        >
          <div>
            <h3 className="font-bold text-lg">English</h3>
            <p className="text-sm text-gray-500">English</p>
          </div>
          {selectedLang === 'en' && <CheckCircle2 className="text-[#D71920]" size={24} />}
        </Card>

        <Card 
          className={cn("active:bg-gray-50 transition-colors flex justify-between items-center", selectedLang === 'ta' ? 'border-[#D71920]' : '')}
          onClick={() => handleSelect('ta')}
        >
          <div>
            <h3 className="font-bold text-lg">தமிழ்</h3>
            <p className="text-sm text-gray-500">Tamil</p>
          </div>
          {selectedLang === 'ta' && <CheckCircle2 className="text-[#D71920]" size={24} />}
        </Card>
      </div>
    </div>
  );
}
