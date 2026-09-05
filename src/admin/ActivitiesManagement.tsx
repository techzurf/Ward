import React, { useState } from 'react';
import { Search, Plus, Calendar, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { activities } from '../data';
import { Activity } from '../types';
import { AdminModal, DeleteConfirmModal, SuccessAlert } from './AdminComponents';

export function ActivitiesManagement() {
  const [items, setItems] = useState<Activity[]>(activities);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Activity | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '', category: 'Community', date: '', time: '', location: '', description: '', imageUrl: ''
  });

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', category: 'Community', date: '', time: '', location: '', description: '', imageUrl: '' });
    setIsFormOpen(true);
  };

  const openEdit = (item: Activity) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, category: item.category, date: item.date, 
      time: item.time, location: item.location, description: item.description, 
      imageUrl: item.imageUrl || ''
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, ...formData } as Activity : i));
      showSuccess('Activity updated successfully.');
    } else {
      const newItem: Activity = {
        ...formData,
        id: 'A' + Date.now()
      } as Activity;
      setItems([newItem, ...items]);
      showSuccess('Activity added successfully.');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      setItems(items.filter(i => i.id !== itemToDelete));
      showSuccess('Activity deleted successfully.');
    }
    setIsDeleteOpen(false);
    setItemToDelete(null);
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SuccessAlert message={successMsg} onClose={() => setSuccessMsg('')} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
          <Calendar className="text-[#D71920]" size={28} />
          Activities Management
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search activities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]"
            />
          </div>
          <button onClick={openAdd} className="px-4 py-2 bg-black text-[#FFD400] border-2 border-black rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#D71920] hover:text-white transition-colors">
            <Plus size={16} /> Add Activity
          </button>
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
                <th className="p-4 border-b-4 border-black">Image</th>
                <th className="p-4 border-b-4 border-black">Title & Category</th>
                <th className="p-4 border-b-4 border-black">Date & Time</th>
                <th className="p-4 border-b-4 border-black">Location</th>
                <th className="p-4 border-b-4 border-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                    No activities found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((activity) => (
                  <tr key={activity.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      {activity.imageUrl ? (
                        <img src={activity.imageUrl} alt={activity.title} className="w-16 h-12 object-cover border-2 border-black rounded" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 border-2 border-black rounded flex items-center justify-center">
                          <ImageIcon className="text-gray-400" size={16} />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-sm text-black max-w-xs truncate">{activity.title}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{activity.category}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-xs font-bold text-black">{activity.date}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{activity.time}</p>
                    </td>
                    <td className="p-4 text-xs font-medium text-gray-700">{activity.location}</td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(activity)} className="p-1.5 border-2 border-black rounded hover:bg-[#FFD400] transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { setItemToDelete(activity.id); setIsDeleteOpen(true); }} className="p-1.5 border-2 border-black rounded hover:bg-[#D71920] hover:text-white transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingItem ? 'Edit Activity' : 'Add Activity'}>
        <p className="text-sm font-bold text-gray-600 mb-6">{editingItem ? 'Update the details for this activity.' : 'Create a new community activity or event.'}</p>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="e.g. Free Medical Camp" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Category *</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]">
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Community">Community</option>
                  <option value="Sports">Sports</option>
                  <option value="Meeting">Meeting</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Location *</label>
                <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="Location" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Description *</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="Detailed description"></textarea>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Date *</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Time *</label>
                  <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Image URL</label>
                <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="https://..." />
                {formData.imageUrl && (
                  <div className="mt-2 h-32 rounded border-2 border-black overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.target as any).style.display = 'none'} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pt-6 border-t-4 border-black flex justify-end gap-4">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 border-2 border-black rounded font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 bg-black text-[#FFD400] border-2 border-black rounded font-bold uppercase tracking-widest text-xs hover:bg-[#D71920] hover:text-white transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)]">
              Save Activity
            </button>
          </div>
        </form>
      </AdminModal>

      <DeleteConfirmModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete}
        title="Delete Activity"
        message="Are you sure you want to delete this activity? This action cannot be undone."
      />
    </div>
  );
}
