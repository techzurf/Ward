import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ShieldCheck, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { currentMembership } from '../data';

export function MembershipHome({ navigate }: { navigate: (s: Screen, params?: any) => void }) {
  // If already applied/approved, skip to MyMembership or allow viewing status
  // For prototype, we'll just allow them to apply again or see their status via Profile.

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full relative">
      <Header title="Join Us" showBack onBack={() => navigate('Home')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-28">
        
        <div className="bg-[#000000] text-white p-6 rounded-xl border-4 border-black shadow-[4px_4px_0_rgba(215,25,32,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D71920] rounded-full opacity-30 -mr-10 -mt-10 blur-xl"></div>
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-2 relative z-10">Become a Member</h2>
          <p className="text-[#FFD400] text-[10px] font-bold uppercase tracking-widest relative z-10">Make a difference in your ward</p>
        </div>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-3">Why Join?</h3>
          <div className="space-y-3">
            <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-4 flex gap-4 items-center">
              <div className="w-12 h-12 bg-[#FFD400] rounded flex items-center justify-center shrink-0 border-2 border-black">
                <Users className="text-black" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-1">Community Power</h4>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Connect with local leaders and citizens.</p>
              </div>
            </Card>

            <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-4 flex gap-4 items-center">
              <div className="w-12 h-12 bg-[#D71920] rounded flex items-center justify-center shrink-0 border-2 border-black">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-1">Drive Development</h4>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Participate in ward improvement works.</p>
              </div>
            </Card>

            <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-4 flex gap-4 items-center">
              <div className="w-12 h-12 bg-[#000000] rounded flex items-center justify-center shrink-0 border-2 border-black">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-1">Official ID Card</h4>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Receive a recognized digital membership card.</p>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-3">Eligibility</h3>
          <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5 space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-[#D71920]" />
              <span className="text-sm font-bold text-black uppercase tracking-wider">Must be 18+ years old</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-[#D71920]" />
              <span className="text-sm font-bold text-black uppercase tracking-wider">Resident of the Ward</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-[#D71920]" />
              <span className="text-sm font-bold text-black uppercase tracking-wider">Valid ID Proof</span>
            </div>
          </Card>
        </section>

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#E5E5E5] border-t-4 border-black z-40 pb-safe space-y-3">
        <Button fullWidth size="lg" onClick={() => navigate('MembershipForm')}>
          Join Now
        </Button>
        <Button fullWidth size="lg" variant="outline" className="border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]" onClick={() => navigate('MyMembership')}>
          View My Membership
        </Button>
      </div>
    </div>
  );
}
