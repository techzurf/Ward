import React, { useState } from 'react';
import { Search, Plus, Bell, Send } from 'lucide-react';
import { AdminModal, SuccessAlert } from './AdminComponents';

export function NotificationsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({ titleEN: '', titleTA: '', body: '' });

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Road Maintenance Work', body: 'The road work on Poes Garden 1st street has started today.', date: 'Today, 10:00 AM', status: 'Sent' },
    { id: '2', title: 'Community Meeting', body: 'Join us for the monthly ward meeting this Sunday.', date: 'Yesterday, 04:30 PM', status: 'Sent' },
    { id: '3', title: 'Water Supply Issue', body: 'Water supply will be affected tomorrow between 10 AM and 2 PM due to main line repair.', date: 'Pending', status: 'Draft' },
  ]);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEN || !formData.body) {
      alert('Please fill required fields.');
      return;
    }
    const newNotif = {
      id: Date.now().toString(),
      title: formData.titleEN,
      body: formData.body,
      date: 'Just Now',
      status: 'Sent'
    };
    setNotifications([newNotif, ...notifications]);
    showSuccess('Push notification sent successfully!');
    setIsFormOpen(false);
  };

  const filteredItems = notifications.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SuccessAlert message={successMsg} onClose={() => setSuccessMsg('')} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
          <Bell className="text-[#D71920]" size={28} />
          Push Notifications
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]"
            />
          </div>
          <button onClick={() => { setFormData({ titleEN: '', titleTA: '', body: '' }); setIsFormOpen(true); }} className="px-4 py-2 bg-[#FFD400] text-black border-2 border-black rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-black hover:text-white transition-colors">
            <Plus size={16} /> Compose Push
          </button>
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
                <th className="p-4 border-b-4 border-black">Notification Details</th>
                <th className="p-4 border-b-4 border-black">Date</th>
                <th className="p-4 border-b-4 border-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                    No notifications found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((notif) => (
                  <tr key={notif.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-sm text-black">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notif.body}</p>
                    </td>
                    <td className="p-4 text-xs font-bold text-gray-700">{notif.date}</td>
                    <td className="p-4">
                      {notif.status === 'Sent' ? (
                        <span className="px-2 py-1 bg-[#000000] text-white rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black">
                          Sent
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-[#FFD400] text-black rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black">
                          Draft
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Compose Push Notification">
        <form onSubmit={handleSend} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Title (EN) *</label>
              <input required type="text" value={formData.titleEN} onChange={e => setFormData({...formData, titleEN: e.target.value})} placeholder="Notification Title" className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Title (TA) - Optional</label>
              <input type="text" value={formData.titleTA} onChange={e => setFormData({...formData, titleTA: e.target.value})} placeholder="அறிவிப்பு தலைப்பு" className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Message Body *</label>
            <textarea required rows={3} value={formData.body} onChange={e => setFormData({...formData, body: e.target.value})} placeholder="Enter the main message body..." className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]"></textarea>
          </div>
          <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-300">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Estimated Reach: 1,245 Members
            </div>
            <button type="submit" className="px-6 py-3 bg-black text-white font-bold uppercase tracking-widest text-xs border-2 border-black rounded hover:bg-[#D71920] transition-colors shadow-[4px_4px_0_rgba(215,25,32,1)] flex items-center gap-2">
              <Send size={16} /> Send Notification
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
