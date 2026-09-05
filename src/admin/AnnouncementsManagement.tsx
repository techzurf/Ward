import React, { useState } from 'react';
import { Search, Plus, Megaphone, Edit2, Trash2 } from 'lucide-react';
import { announcements } from '../data';
import { Announcement } from '../types';
import { AdminModal, DeleteConfirmModal, SuccessAlert } from './AdminComponents';

export function AnnouncementsManagement() {
  const [items, setItems] = useState<Announcement[]>(announcements);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '', category: 'General', date: '', shortDescription: '', fullContent: '', isImportant: false
  });

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', category: 'General', date: '', shortDescription: '', fullContent: '', isImportant: false });
    setIsFormOpen(true);
  };

  const openEdit = (item: Announcement) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, category: item.category, date: item.date, 
      shortDescription: item.shortDescription, fullContent: item.fullContent, 
      isImportant: item.isImportant
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, ...formData } as Announcement : i));
      showSuccess('Announcement updated successfully.');
    } else {
      const newItem: Announcement = {
        ...formData,
        id: 'ANN' + Date.now()
      } as Announcement;
      setItems([newItem, ...items]);
      showSuccess('Announcement created successfully.');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      setItems(items.filter(i => i.id !== itemToDelete));
      showSuccess('Announcement deleted successfully.');
    }
    setIsDeleteOpen(false);
    setItemToDelete(null);
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SuccessAlert message={successMsg} onClose={() => setSuccessMsg('')} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
          <Megaphone className="text-[#D71920]" size={28} />
          Announcements
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search announcements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]"
            />
          </div>
          <button onClick={openAdd} className="px-4 py-2 bg-black text-[#FFD400] border-2 border-black rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#D71920] hover:text-white transition-colors">
            <Plus size={16} /> New Announcement
          </button>
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
                <th className="p-4 border-b-4 border-black">Title & Category</th>
                <th className="p-4 border-b-4 border-black">Priority</th>
                <th className="p-4 border-b-4 border-black">Date</th>
                <th className="p-4 border-b-4 border-black">Status</th>
                <th className="p-4 border-b-4 border-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                    No announcements found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((announcement) => (
                  <tr key={announcement.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-sm text-black max-w-sm truncate">{announcement.title}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{announcement.category}</p>
                    </td>
                    <td className="p-4">
                      {announcement.isImportant ? (
                        <span className="px-2 py-1 bg-[#D71920] text-white rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black">
                          Important
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-200 text-black rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-xs font-bold text-gray-700">{announcement.date}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-black text-[#FFD400] rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black">
                        Published
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(announcement)} className="p-1.5 border-2 border-black rounded hover:bg-[#FFD400] transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { setItemToDelete(announcement.id); setIsDeleteOpen(true); }} className="p-1.5 border-2 border-black rounded hover:bg-[#D71920] hover:text-white transition-colors" title="Delete">
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

      <AdminModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingItem ? 'Edit Announcement' : 'Create Announcement'}>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="Announcement Title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Category *</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]">
                    <option value="General">General</option>
                    <option value="Alert">Alert</option>
                    <option value="Notice">Notice</option>
                    <option value="Update">Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Date *</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 p-4 border-2 border-black rounded bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <input type="checkbox" checked={formData.isImportant} onChange={e => setFormData({...formData, isImportant: e.target.checked})} className="w-5 h-5 accent-[#D71920] border-2 border-black" />
                  <div>
                    <span className="block font-bold text-sm uppercase tracking-widest text-black">Mark as Important</span>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase">Displays with red highlight in frontend</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Short Description *</label>
                <textarea required rows={2} value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="Summary for list view..."></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Full Content *</label>
                <textarea required rows={5} value={formData.fullContent} onChange={e => setFormData({...formData, fullContent: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="Full detailed content..."></textarea>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t-4 border-black flex justify-end gap-4">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 border-2 border-black rounded font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 bg-black text-[#FFD400] border-2 border-black rounded font-bold uppercase tracking-widest text-xs hover:bg-[#D71920] hover:text-white transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)]">
              Save Announcement
            </button>
          </div>
        </form>
      </AdminModal>

      <DeleteConfirmModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete}
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement? This action cannot be undone."
      />
    </div>
  );
}
