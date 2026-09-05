import React, { useState } from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { cn } from '../../utils';
import { Screen } from '../../types';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  onBack?: () => void;
  onNotification?: () => void;
  className?: string;
}

export function Header({ title, showBack, showNotification, onBack, onNotification, className }: HeaderProps) {
  const [lang, setLang] = useState<'en' | 'ta'>('en');

  return (
    <div className={cn("sticky top-0 z-40 bg-[#000000] text-white px-4 h-16 flex items-center justify-between shadow-lg border-b-4 border-[#D71920]", className)}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBack && (
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full active:bg-gray-800 text-[#FFD400] shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-bold tracking-widest uppercase truncate flex-1 min-w-0">{title}</h1>
      </div>
      
      <div className="flex items-center gap-1 shrink-0 ml-2">
        <div className="flex items-center bg-[#1a1a1a] rounded-md border border-gray-700 p-0.5 text-[10px] font-bold uppercase tracking-widest">
          <button 
            onClick={() => setLang('en')}
            className={cn("px-2 py-1 rounded transition-colors", lang === 'en' ? "bg-[#FFD400] text-black" : "text-gray-400")}
          >
            EN
          </button>
          <span className="text-gray-600 px-0.5">|</span>
          <button 
            onClick={() => setLang('ta')}
            className={cn("px-2 py-1 rounded transition-colors", lang === 'ta' ? "bg-[#D71920] text-white" : "text-gray-400")}
          >
            தமிழ்
          </button>
        </div>
        {showNotification && (
          <button 
            onClick={onNotification}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-800 relative text-[#FFD400]"
            aria-label="Notifications"
          >
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#D71920] rounded-full border-2 border-black"></span>
          </button>
        )}
      </div>
    </div>
  );
}
