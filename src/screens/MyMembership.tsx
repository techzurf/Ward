import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, User, Calendar, MapPin, Phone, CreditCard } from 'lucide-react';
import { currentMembership } from '../data';
import { cn } from '../utils';

export function MyMembership({ navigate }: { navigate: (s: Screen) => void }) {
  if (!currentMembership) {
    return (
      <div className="flex-1 bg-[#E5E5E5] flex flex-col h-full">
        <Header title="My Membership" showBack onBack={() => navigate('Profile')} />
        <div className="flex-1 flex flex-col items-center justify-center p-5 text-center">
          <div className="w-16 h-16 bg-[#000000] border-4 border-black rounded-xl flex items-center justify-center mb-4 shadow-[4px_4px_0_rgba(215,25,32,1)]">
            <User className="text-[#FFD400]" size={24} />
          </div>
          <p className="font-bold uppercase tracking-wider text-black mb-1">Not a Member Yet</p>
          <p className="text-[10px] uppercase tracking-wide font-bold text-gray-500 mb-6">You haven't applied for membership.</p>
          <Button onClick={() => navigate('MembershipForm')}>Apply Now</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Verification': return 'bg-gray-200 text-black border-black';
      case 'Approved': return 'bg-black text-white border-black';
      case 'Active': return 'bg-[#D71920] text-white border-black';
      case 'Expired': return 'bg-gray-400 text-black border-black';
      case 'Rejected': return 'bg-red-900 text-white border-black';
      default: return 'bg-gray-200 text-black border-black';
    }
  };

  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20 flex flex-col h-full">
      <Header title="My Membership" showBack onBack={() => navigate('Profile')} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        <div className="flex flex-col items-center pt-2">
          <div className="relative mb-4">
            <img src={currentMembership.profilePhoto} alt={currentMembership.name} className="w-24 h-24 rounded-xl border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] object-cover" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#FFD400] rounded flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] text-black">
              <ShieldCheck size={20} />
            </div>
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-black mt-2">{currentMembership.name}</h2>
          <span className={cn("mt-2 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border-2", getStatusColor(currentMembership.status))}>
            {currentMembership.status}
          </span>
        </div>

        <Card className="divide-y-2 divide-dashed divide-gray-300 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white">
          <div className="py-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#000000] rounded flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] shrink-0">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Member ID / App ID</p>
              <p className="font-bold text-sm text-black">{currentMembership.memberId || currentMembership.applicationId}</p>
            </div>
          </div>
          
          <div className="py-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#000000] rounded flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] shrink-0">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Membership Type</p>
              <p className="font-bold text-sm text-black uppercase">{currentMembership.membershipType}</p>
            </div>
          </div>

          <div className="py-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#000000] rounded flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] shrink-0">
              <MapPin size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Ward & Area</p>
              <p className="font-bold text-sm text-black">Ward {currentMembership.wardNumber}, {currentMembership.area}</p>
            </div>
          </div>

          <div className="py-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#000000] rounded flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] shrink-0">
              <Calendar size={18} className="text-white" />
            </div>
            <div className="flex-1 flex justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Applied On</p>
                <p className="font-bold text-sm text-black">{currentMembership.submissionDate}</p>
              </div>
              {currentMembership.joiningDate && (
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Joined On</p>
                  <p className="font-bold text-sm text-black">{currentMembership.joiningDate}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="py-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#000000] rounded flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] shrink-0">
              <Phone size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Mobile Number</p>
              <p className="font-bold text-sm text-black">{currentMembership.mobile}</p>
            </div>
          </div>
        </Card>

        <section>
          <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-3 px-1">Application Status</h3>
          <div className="bg-white border-4 border-black p-5 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#000000] border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-0.5">Application Submitted</h4>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{currentMembership.submissionDate}</p>
                </div>
              </div>
              
              <div className="w-0.5 h-6 bg-black ml-4 -my-2 border-l-2 border-dashed border-gray-400"></div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#000000] border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] flex items-center justify-center shrink-0">
                  <div className={cn("w-2 h-2 rounded-full", currentMembership.status !== 'Pending Verification' ? 'bg-green-500' : 'bg-[#FFD400]')}></div>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-0.5">Verification</h4>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                    {currentMembership.status === 'Pending Verification' ? 'In Progress' : 'Completed'}
                  </p>
                </div>
              </div>

              {(currentMembership.status === 'Approved' || currentMembership.status === 'Active') && (
                <>
                  <div className="w-0.5 h-6 bg-black ml-4 -my-2 border-l-2 border-dashed border-gray-400"></div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#000000] border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)] flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-black mb-0.5">Approved</h4>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{currentMembership.joiningDate}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#E5E5E5] border-t-4 border-black z-40 pb-safe">
        {(currentMembership.status === 'Approved' || currentMembership.status === 'Active') ? (
          <Button fullWidth size="lg" className="gap-2" onClick={() => navigate('MembershipCard')}>
            <CreditCard size={20} /> View Membership Card
          </Button>
        ) : (
          <Button fullWidth size="lg" variant="outline" className="border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]" onClick={() => navigate('Profile')}>
            Back to Profile
          </Button>
        )}
      </div>
    </div>
  );
}
