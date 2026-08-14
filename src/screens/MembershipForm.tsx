import React, { useState } from 'react';
import { Screen, MembershipType } from '../types';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Camera, ChevronRight, Check } from 'lucide-react';
import { cn } from '../utils';

export function MembershipForm({ navigate }: { navigate: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [membershipType, setMembershipType] = useState<MembershipType>('General Member');

  const types: MembershipType[] = ['General Member', 'Active Member', 'Volunteer'];

  const renderStep1 = () => (
    <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Full Name</label>
        <input type="text" placeholder="Enter your full name" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Father's / Mother's Name</label>
        <input type="text" placeholder="Parent's name" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Date of Birth</label>
          <input type="date" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold text-black focus:outline-none focus:border-[#D71920]" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Gender</label>
          <select className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold focus:outline-none focus:border-[#D71920]">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Mobile Number</label>
        <input type="tel" placeholder="+91" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Ward Number</label>
        <input type="text" defaultValue="112" readOnly className="w-full bg-gray-200 border-2 border-black rounded p-3 text-sm font-bold focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Area / Locality</label>
        <input type="text" placeholder="E.g. Teynampet" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Street Name</label>
        <input type="text" placeholder="E.g. Poes Garden 1st St" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Door No.</label>
          <input type="text" placeholder="12/A" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Pincode</label>
          <input type="text" placeholder="600018" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">WhatsApp Number (Optional)</label>
        <input type="tel" placeholder="+91" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-3">Membership Type</label>
        <div className="space-y-3">
          {types.map(t => (
            <div 
              key={t}
              onClick={() => setMembershipType(t)}
              className={cn(
                "p-4 border-2 border-black rounded cursor-pointer transition-all",
                membershipType === t 
                  ? "bg-[#000000] text-white shadow-[4px_4px_0_rgba(215,25,32,1)]" 
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm uppercase tracking-wider">{t}</span>
                {membershipType === t && <Check className="text-[#FFD400]" size={20} />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">ID Proof Type</label>
        <select className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold focus:outline-none focus:border-[#D71920]">
          <option>Aadhaar Card</option>
          <option>Voter ID</option>
          <option>Driving License</option>
          <option>Passport</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">ID Proof Number</label>
        <input type="text" placeholder="Enter ID number" className="w-full bg-white border-2 border-black rounded p-3 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#D71920]" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Profile Photo</label>
        <button className="w-full h-24 bg-white border-2 border-dashed border-black rounded flex flex-col items-center justify-center text-black hover:bg-gray-100 transition-colors">
          <Camera size={24} className="mb-2 text-[#D71920]" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Upload Photo</span>
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-white border-4 border-black p-5 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
        <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-4">Declaration</h3>
        <p className="text-sm font-bold text-gray-700 leading-relaxed mb-6">
          I declare that I am a citizen of India above 18 years of age. I subscribe to the values and constitution of the organization. The information provided by me is true to the best of my knowledge.
        </p>
        
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input 
              type="checkbox" 
              className="peer appearance-none w-6 h-6 border-2 border-black rounded bg-white checked:bg-[#D71920] transition-colors"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <Check size={16} className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-black leading-tight pt-1">
            I confirm that the information provided is correct and accept the Terms & Conditions.
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-[#E5E5E5] flex flex-col h-full relative">
      <Header title="Membership Form" showBack onBack={() => {
        if (step > 1) setStep(step - 1);
        else navigate('MembershipHome');
      }} />
      
      <div className="bg-[#000000] p-4 border-b-4 border-black sticky top-16 z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#FFD400] text-[9px] font-bold uppercase tracking-widest">Step {step} of 4</span>
          <span className="text-white text-[9px] font-bold uppercase tracking-widest">
            {step === 1 && "Personal Info"}
            {step === 2 && "Address Details"}
            {step === 3 && "Identity"}
            {step === 4 && "Declaration"}
          </span>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden border border-black">
          <div 
            className="h-full bg-[#D71920] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-28">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#E5E5E5] border-t-4 border-black z-40 pb-safe">
        {step < 4 ? (
          <Button fullWidth size="lg" onClick={() => setStep(step + 1)}>
            Next Step
          </Button>
        ) : (
          <Button fullWidth size="lg" disabled={!agreed} onClick={() => navigate('MembershipSuccess')}>
            Submit Application
          </Button>
        )}
      </div>
    </div>
  );
}
