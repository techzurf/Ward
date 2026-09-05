import React, { useState } from 'react';
import { Search, Filter, Eye, Edit2, AlertCircle } from 'lucide-react';
import { issues } from '../data';
import { Issue, IssueStatus } from '../types';
import { cn } from '../utils';
import { SuccessAlert } from './AdminComponents';

export function IssuesManagement() {
  const [items, setItems] = useState<Issue[]>(issues);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [editingStatus, setEditingStatus] = useState<IssueStatus>('Submitted');
  const [successMsg, setSuccessMsg] = useState('');

  const getStatusColor = (status: IssueStatus) => {
    switch(status) {
      case 'Submitted': return 'bg-[#D71920] text-white';
      case 'Under Review': return 'bg-[#FFD400] text-black';
      case 'In Progress': return 'bg-blue-600 text-white';
      case 'Resolved': return 'bg-black text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openView = (issue: Issue) => {
    setSelectedIssue(issue);
    setEditingStatus(issue.status);
  };

  const handleUpdateStatus = () => {
    if (selectedIssue) {
      setItems(items.map(i => i.id === selectedIssue.id ? { ...i, status: editingStatus } : i));
      showSuccess(`Issue status updated to ${editingStatus}.`);
      setSelectedIssue(null);
    }
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || i.location.toLowerCase().includes(searchTerm.toLowerCase()) || i.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <SuccessAlert message={successMsg} onClose={() => setSuccessMsg('')} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
          <AlertCircle className="text-[#D71920]" size={28} />
          Issues Management
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search issues..." 
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
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
                <th className="p-4 border-b-4 border-black">ID</th>
                <th className="p-4 border-b-4 border-black">Title & Category</th>
                <th className="p-4 border-b-4 border-black">Location</th>
                <th className="p-4 border-b-4 border-black">Date Reported</th>
                <th className="p-4 border-b-4 border-black">Status</th>
                <th className="p-4 border-b-4 border-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                    No issues found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((issue) => (
                  <tr key={issue.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-xs">{issue.id.substring(0,8)}</td>
                    <td className="p-4">
                      <p className="font-bold text-sm text-black">{issue.title}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{issue.category}</p>
                    </td>
                    <td className="p-4 text-xs font-medium text-gray-700">{issue.location}</td>
                    <td className="p-4 text-xs font-medium text-gray-700">{issue.dateReported}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black",
                        getStatusColor(issue.status)
                      )}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openView(issue)}
                        className="p-1.5 border-2 border-black rounded hover:bg-[#FFD400] transition-colors"
                        title="View / Update Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedIssue && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-xl shadow-[12px_12px_0_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b-4 border-black flex justify-between items-center bg-[#FFD400] shrink-0">
              <h2 className="text-xl font-black uppercase tracking-widest">Update Issue</h2>
              <button onClick={() => setSelectedIssue(null)} className="font-bold text-2xl hover:text-[#D71920]">&times;</button>
            </div>
            <div className="p-6 space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Title</label>
                  <p className="font-bold text-base">{selectedIssue.title}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Category</label>
                  <p className="font-bold text-base">{selectedIssue.category}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Description</label>
                  <p className="text-sm font-medium leading-relaxed bg-gray-50 p-4 rounded border-2 border-black">{selectedIssue.description}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Location</label>
                  <p className="font-bold text-sm">{selectedIssue.location}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Date Reported</label>
                  <p className="font-bold text-sm">{selectedIssue.dateReported}</p>
                </div>
              </div>
              
              {selectedIssue.imageUrl && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Attached Image</label>
                  <img src={selectedIssue.imageUrl} alt="Issue" className="w-full max-w-md h-auto rounded border-4 border-black object-cover" />
                </div>
              )}

              <div className="pt-6 border-t-4 border-black flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Update Status</label>
                  <select value={editingStatus} onChange={(e) => setEditingStatus(e.target.value as IssueStatus)} className="w-full p-3 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]">
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={handleUpdateStatus} className="px-6 py-3 bg-black text-white font-bold uppercase tracking-widest text-xs border-2 border-black rounded hover:bg-[#D71920] transition-colors shadow-[4px_4px_0_rgba(215,25,32,1)] w-full sm:w-auto">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
