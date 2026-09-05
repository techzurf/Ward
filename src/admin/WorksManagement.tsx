import React, { useState } from 'react';
import { Search, Plus, HardHat, Edit2, Trash2 } from 'lucide-react';
import { developmentWorks } from '../data';
import { DevelopmentWork } from '../types';
import { cn } from '../utils';
import { AdminModal, DeleteConfirmModal, SuccessAlert } from './AdminComponents';

export function WorksManagement() {
  const [works, setWorks] = useState<DevelopmentWork[]>(developmentWorks as any);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<DevelopmentWork | null>(null);
  const [workToDelete, setWorkToDelete] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '', category: 'Infrastructure', location: '', startDate: '', status: 'Planned', description: '', imageUrl: '', completionDate: ''
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Planned': return 'bg-gray-200 text-black';
      case 'Ongoing': return 'bg-[#FFD400] text-black';
      case 'Completed': return 'bg-black text-white';
      default: return 'bg-white text-black';
    }
  };

  const openAdd = () => {
    setEditingWork(null);
    setFormData({ title: '', category: 'Infrastructure', location: '', startDate: '', status: 'Planned', description: '', imageUrl: '', completionDate: '' });
    setIsFormOpen(true);
  };

  const openEdit = (work: DevelopmentWork) => {
    setEditingWork(work);
    setFormData({ 
      title: work.title, category: work.category, location: work.location, 
      startDate: work.startDate, status: work.status, description: work.description, 
      imageUrl: work.imageUrl || '', completionDate: ''
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWork) {
      setWorks(works.map(w => w.id === editingWork.id ? { ...w, ...formData } as DevelopmentWork : w));
      setSuccessMsg('Development work updated successfully.');
    } else {
      const newWork: DevelopmentWork = {
        ...formData,
        id: 'W' + Date.now()
      } as DevelopmentWork;
      setWorks([newWork, ...works]);
      setSuccessMsg('Development work added successfully.');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (workToDelete) {
      setWorks(works.filter(w => w.id !== workToDelete));
      setSuccessMsg('Development work deleted successfully.');
    }
    setIsDeleteOpen(false);
    setWorkToDelete(null);
  };

  const filteredWorks = works.filter(w => {
    const matchesSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase()) || w.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <SuccessAlert message={successMsg} onClose={() => setSuccessMsg('')} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
          <HardHat className="text-[#D71920]" size={28} />
          Development Works
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search works..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920] bg-white"
          >
            <option value="All">All Status</option>
            <option value="Planned">Planned</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={openAdd} className="px-4 py-2 bg-black text-[#FFD400] border-2 border-black rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#D71920] hover:text-white transition-colors">
            <Plus size={16} /> Add New Work
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
                <th className="p-4 border-b-4 border-black">Location</th>
                <th className="p-4 border-b-4 border-black">Start Date</th>
                <th className="p-4 border-b-4 border-black">Status</th>
                <th className="p-4 border-b-4 border-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                    No development works found.
                  </td>
                </tr>
              ) : (
                filteredWorks.map((work) => (
                  <tr key={work.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      {work.imageUrl ? (
                        <img src={work.imageUrl} alt={work.title} className="w-16 h-12 object-cover border-2 border-black rounded" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 border-2 border-black rounded flex items-center justify-center">
                          <HardHat className="text-gray-400" size={16} />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-sm text-black max-w-xs truncate">{work.title}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{work.category}</p>
                    </td>
                    <td className="p-4 text-xs font-medium text-gray-700">{work.location}</td>
                    <td className="p-4 text-xs font-bold text-gray-700">{work.startDate}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black",
                        getStatusColor(work.status)
                      )}>
                        {work.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(work)} className="p-1.5 border-2 border-black rounded hover:bg-[#FFD400] transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { setWorkToDelete(work.id); setIsDeleteOpen(true); }} className="p-1.5 border-2 border-black rounded hover:bg-[#D71920] hover:text-white transition-colors" title="Delete">
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

      <AdminModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingWork ? 'Edit Development Work' : 'Add Development Work'}>
        <p className="text-sm font-bold text-gray-600 mb-6">{editingWork ? 'Update the details for this development work.' : 'Create and publish a new development work for the ward.'}</p>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Work Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="e.g. New Stormwater Drain Construction" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Category *</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]">
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Public Facilities">Public Facilities</option>
                  <option value="Roads">Roads</option>
                  <option value="Drainage">Drainage</option>
                  <option value="Water">Water</option>
                  <option value="Street Lighting">Street Lighting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Location *</label>
                <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="Location/area name" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Description *</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" placeholder="Detailed description of the work"></textarea>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Start Date *</label>
                  <input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Expected Completion</label>
                  <input type="date" value={formData.completionDate} onChange={e => setFormData({...formData, completionDate: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Status *</label>
                <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]">
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Work Image URL</label>
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
              Save Work
            </button>
          </div>
        </form>
      </AdminModal>

      <DeleteConfirmModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete}
        title="Delete Development Work"
        message="Are you sure you want to delete this development work? This action cannot be undone."
      />
    </div>
  );
}
