import React, { useState } from 'react';
import { User, MapPin } from 'lucide-react';
import { currentCouncillor, wardInfo } from '../data';
import { SuccessAlert } from './AdminComponents';

export function WardManagement() {
  const [successMsg, setSuccessMsg] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Councillor profile updated successfully.');
  };

  const handleSaveWard = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Ward information updated successfully.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <SuccessAlert message={successMsg} onClose={() => setSuccessMsg('')} />

      <div className="flex items-center gap-3">
        <User className="text-[#D71920]" size={28} />
        <h1 className="text-2xl font-black uppercase tracking-widest">Ward & Councillor</h1>
      </div>

      <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b-4 border-black pb-4 mb-6">Councillor Profile</h2>
        <form onSubmit={handleSaveProfile} className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">Profile Image</label>
            <div className="aspect-square bg-gray-100 border-4 border-black border-dashed flex flex-col items-center justify-center rounded cursor-pointer hover:bg-gray-50 overflow-hidden relative group">
              <img src={currentCouncillor.imageUrl} alt="Councillor" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white font-bold text-xs uppercase tracking-widest">Change Photo</span>
              </div>
            </div>
            <button type="button" className="w-full py-2 bg-black text-white font-bold uppercase tracking-widest text-[10px] rounded border-2 border-black hover:bg-[#D71920] transition-colors">
              Update Photo
            </button>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Name</label>
                <input required type="text" defaultValue={currentCouncillor.name} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Party</label>
                <input required type="text" defaultValue={currentCouncillor.party} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Phone</label>
                <input required type="text" defaultValue={currentCouncillor.phone} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">WhatsApp</label>
                <input type="text" defaultValue={currentCouncillor.whatsapp} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Biography</label>
              <textarea required rows={3} defaultValue={currentCouncillor.bio} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]"></textarea>
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="px-6 py-3 bg-[#FFD400] text-black font-bold uppercase tracking-widest text-xs border-2 border-black rounded hover:bg-[#D71920] hover:text-white transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)]">
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-6">
          <MapPin className="text-black" size={24} />
          <h2 className="text-lg font-bold uppercase tracking-widest">Ward Information</h2>
        </div>
        
        <form onSubmit={handleSaveWard}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Ward Number</label>
              <input required type="text" defaultValue={wardInfo.number} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Zone</label>
              <input required type="text" defaultValue={wardInfo.zone} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Population</label>
              <input required type="text" defaultValue={wardInfo.population} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Households</label>
              <input required type="text" defaultValue={wardInfo.households} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Office Location</label>
              <input required type="text" defaultValue={currentCouncillor.officeLocation} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Office Hours</label>
              <input required type="text" defaultValue={currentCouncillor.officeHours} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
          </div>
          
          <div className="flex justify-end pt-6 mt-6 border-t-2 border-dashed border-gray-300">
            <button type="submit" className="px-6 py-3 bg-[#000000] text-white font-bold uppercase tracking-widest text-xs border-2 border-black rounded hover:bg-[#D71920] transition-colors shadow-[4px_4px_0_rgba(215,25,32,1)]">
              Save Ward Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
