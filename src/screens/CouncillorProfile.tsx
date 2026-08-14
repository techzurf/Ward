import React from 'react';
import { Screen } from '../types';
import { Header } from '../components/layout/Header';
import { currentCouncillor, activities } from '../data';
import { Card, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Phone, MessageCircle, MapPin, Clock, Calendar } from 'lucide-react';

export function CouncillorProfile({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 bg-[#E5E5E5] pb-20">
      <Header title="Ward Councillor" showBack onBack={() => navigate('WardOverview')} />
      
      <div className="bg-[#000000] text-white px-5 pt-8 pb-16 relative overflow-hidden border-b-8 border-black shadow-lg">
        <div className="flex flex-col items-center relative z-10">
          <img src={currentCouncillor.imageUrl} alt={currentCouncillor.name} className="w-28 h-28 rounded-full border-4 border-[#FFD400] mb-4 object-cover shadow-[4px_4px_0_rgba(215,25,32,1)]" />
          <h1 className="text-xl font-bold tracking-widest uppercase">{currentCouncillor.name}</h1>
          <Badge variant="yellow" className="mt-2 text-black bg-[#FFD400] border-2 border-black">{currentCouncillor.party}</Badge>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20 space-y-6">
        <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5">
          <div className="grid grid-cols-2 divide-x-4 divide-black text-center mb-5 border-b-4 border-black pb-4">
            <div>
              <p className="text-black text-[10px] font-bold uppercase tracking-widest mb-1">Ward</p>
              <p className="font-bold text-xl">{currentCouncillor.wardNumber}</p>
            </div>
            <div>
              <p className="text-black text-[10px] font-bold uppercase tracking-widest mb-1">Zone</p>
              <p className="font-bold text-xl">{currentCouncillor.zone}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button fullWidth variant="primary" onClick={() => window.open(`tel:${currentCouncillor.phone}`)}>
              <Phone size={18} /> Call
            </Button>
            <Button fullWidth variant="secondary" onClick={() => window.open(`https://wa.me/${currentCouncillor.whatsapp.replace(/[^0-9]/g, '')}`)}>
              <MessageCircle size={18} /> Chat
            </Button>
          </div>
        </Card>

        <section>
          <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-3">About</h3>
          <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5">
            <p className="text-black text-sm font-bold leading-relaxed">{currentCouncillor.bio}</p>
          </Card>
        </section>

        <section>
          <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-3">Office Details</h3>
          <Card className="border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl bg-white p-5 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#D71920] rounded flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]">
                <MapPin className="text-white" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-widest">Location</p>
                <p className="text-sm text-black font-bold">{currentCouncillor.officeLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#FFD400] rounded flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]">
                <Clock className="text-black" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-widest">Visiting Hours</p>
                <p className="text-sm text-black font-bold">{currentCouncillor.officeHours}</p>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-3 px-1">Recent Activities</h3>
          <div className="space-y-3">
            {activities.map(act => (
              <Card key={act.id} onClick={() => navigate('ActivityDetails', { id: act.id })} className="border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] rounded-xl bg-white cursor-pointer active:translate-y-1 active:shadow-none transition-all">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-[#000000] rounded-xl flex items-center justify-center shrink-0 border-2 border-black">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-black line-clamp-1">{act.title}</h4>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">{act.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
