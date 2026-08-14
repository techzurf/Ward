import React from 'react';
import { Home, Map, AlertTriangle, Calendar, User } from 'lucide-react';
import { Screen } from '../../types';
import { cn } from '../../utils';

interface BottomNavProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, navigate }: BottomNavProps) {
  const tabs = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'WardOverview', icon: Map, label: 'Ward' },
    { id: 'IssuesList', icon: AlertTriangle, label: 'Issues' },
    { id: 'ActivitiesList', icon: Calendar, label: 'Activities' },
    { id: 'Profile', icon: User, label: 'Profile' }
  ];

  const hiddenScreens: Screen[] = ['Splash', 'Welcome'];
  if (hiddenScreens.includes(currentScreen)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#000000] border-t-4 border-[#D71920] z-50 px-2 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
      <div className="flex justify-between items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          // Determine if tab is active (some logic to map sub-screens to main tabs)
          let isActive = false;
          if (tab.id === 'Home' && currentScreen === 'Home') isActive = true;
          if (tab.id === 'WardOverview' && ['WardOverview', 'AreasList', 'AreaDetails', 'CouncillorProfile', 'DevelopmentWorks'].includes(currentScreen)) isActive = true;
          if (tab.id === 'IssuesList' && ['IssuesList', 'IssueDetails', 'ReportIssue'].includes(currentScreen)) isActive = true;
          if (tab.id === 'ActivitiesList' && ['ActivitiesList', 'ActivityDetails'].includes(currentScreen)) isActive = true;
          if (tab.id === 'Profile' && ['Profile', 'MyIssues', 'Language', 'Settings'].includes(currentScreen)) isActive = true;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id as Screen)}
              className="flex-1 flex flex-col items-center justify-center space-y-1 h-full min-w-0"
              aria-label={tab.label}
            >
              <div className={cn(
                "p-1.5 rounded-full transition-colors",
                isActive ? "bg-[#FFD400]" : "bg-transparent"
              )}>
                <Icon size={20} className={cn(
                  isActive ? "text-black" : "text-white opacity-60"
                )} />
              </div>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-wider",
                isActive ? "text-[#FFD400]" : "text-white opacity-60"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
