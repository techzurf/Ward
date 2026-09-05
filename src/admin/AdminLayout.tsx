import React from 'react';
import { LayoutDashboard, AlertCircle, Users, HardHat, Calendar, Bell, Heart, Home, User, Megaphone, Menu, X } from 'lucide-react';
import { cn } from '../utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function AdminLayout({ children, currentPath, onNavigate }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', path: 'dashboard', icon: LayoutDashboard },
    { name: 'Issues', path: 'issues', icon: AlertCircle },
    { name: 'Development Works', path: 'works', icon: HardHat },
    { name: 'Activities', path: 'activities', icon: Calendar },
    { name: 'Announcements', path: 'announcements', icon: Megaphone },
    { name: 'Members', path: 'members', icon: Users },
    { name: 'Donations', path: 'donations', icon: Heart },
    { name: 'Ward & Councillor', path: 'ward', icon: User },
    { name: 'Notifications', path: 'notifications', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-[#E5E5E5] font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#000000] text-white flex flex-col transition-transform duration-300 border-r-4 border-[#D71920]",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-16 flex items-center px-4 border-b-4 border-[#D71920] justify-between">
          <h1 className="font-bold text-lg uppercase tracking-widest leading-tight">
            Chennai Saidapet<br/>
            <span className="text-[#FFD400]">Ward Admin</span>
          </h1>
          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-2 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  onNavigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg uppercase tracking-widest text-xs font-bold transition-colors border-2",
                  isActive 
                    ? "bg-[#D71920] text-white border-white shadow-[4px_4px_0_rgba(255,212,0,1)]" 
                    : "border-transparent text-gray-300 hover:bg-gray-900 hover:text-white"
                )}
              >
                <Icon size={18} className={isActive ? "text-[#FFD400]" : ""} />
                {item.name}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t-2 border-gray-800">
          <a href="/" className="flex items-center justify-center gap-2 w-full py-2 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded border-2 border-black hover:bg-[#FFD400] transition-colors">
            <Home size={14} /> Back to App
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 bg-white border-b-4 border-black flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 shadow-[0_4px_0_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-lg lg:text-xl uppercase tracking-widest hidden sm:block text-black">
              {navigation.find(n => n.path === currentPath)?.name || 'Admin Panel'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-8 rounded-full bg-[#000000] text-[#FFD400] flex items-center justify-center border-2 border-[#D71920]">A</span>
              <span className="hidden sm:inline">Admin User</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 lg:p-8 relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
