import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export function AdminModal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-4 border-black rounded-xl shadow-[12px_12px_0_rgba(0,0,0,1)] w-full max-w-4xl my-8 flex flex-col relative">
        <div className="p-6 border-b-4 border-black flex justify-between items-center bg-[#FFD400] sticky top-0 z-10 rounded-t-lg">
          <h2 className="text-xl font-black uppercase tracking-widest">{title}</h2>
          <button onClick={onClose} className="font-bold text-2xl hover:text-[#D71920] transition-colors">&times;</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] w-full max-w-md">
        <div className="p-6 border-b-4 border-black bg-[#D71920] text-white">
          <h2 className="text-xl font-black uppercase tracking-widest">{title || 'Confirm Delete'}</h2>
        </div>
        <div className="p-6">
          <p className="font-bold mb-6">{message || 'Are you sure you want to delete this item?'}</p>
          <div className="flex gap-4 justify-end">
            <button type="button" onClick={onClose} className="px-6 py-2 border-2 border-black rounded font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="button" onClick={onConfirm} className="px-6 py-2 bg-[#D71920] text-white border-2 border-black rounded font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)]">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SuccessAlert({ message, onClose }: any) {
  useEffect(() => {
    if (message) {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [message, onClose]);

  if (!message) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl border-4 border-[#FFD400] shadow-[8px_8px_0_rgba(215,25,32,1)] animate-bounce">
      <CheckCircle2 className="text-[#FFD400]" size={24} />
      <span className="font-bold uppercase tracking-widest text-sm">{message}</span>
      <button onClick={onClose} className="ml-4 hover:text-[#D71920]"><X size={18} /></button>
    </div>
  );
}
