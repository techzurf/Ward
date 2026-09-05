import React, { useState } from 'react';
import { Search, Heart, FileText } from 'lucide-react';
import { mockDonations } from './mockAdminData';
import { cn } from '../utils';

export function DonationsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-black text-[#FFD400]';
      case 'Pending': return 'bg-[#FFD400] text-black';
      case 'Failed': return 'bg-[#D71920] text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  const filteredDonations = mockDonations.filter(d => {
    const matchesSearch = d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
          <Heart className="text-[#D71920]" size={28} />
          Donations Management
        </h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search donations..." 
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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border-4 border-black p-6 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Collections</p>
          <p className="text-3xl font-black text-[#D71920]">₹45,500</p>
        </div>
        <div className="bg-white border-4 border-black p-6 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Donors</p>
          <p className="text-3xl font-black text-black">12</p>
        </div>
        <div className="bg-white border-4 border-black p-6 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Generate Report</p>
            <p className="text-sm font-bold text-black">Monthly Statement</p>
          </div>
          <button onClick={() => alert('Report download mock started.')} className="w-12 h-12 bg-black text-white rounded flex items-center justify-center hover:bg-[#D71920] transition-colors border-2 border-black shadow-[2px_2px_0_rgba(215,25,32,1)]">
            <FileText size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
                <th className="p-4 border-b-4 border-black">ID</th>
                <th className="p-4 border-b-4 border-black">Donor</th>
                <th className="p-4 border-b-4 border-black">Amount</th>
                <th className="p-4 border-b-4 border-black">Date</th>
                <th className="p-4 border-b-4 border-black">Purpose</th>
                <th className="p-4 border-b-4 border-black">Status</th>
                <th className="p-4 border-b-4 border-black text-center">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                    No donations found.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((donation) => (
                  <tr key={donation.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-xs">{donation.id}</td>
                    <td className="p-4 font-bold text-sm text-black">{donation.donorName}</td>
                    <td className="p-4 text-base font-black text-[#D71920]">₹{donation.amount.toLocaleString()}</td>
                    <td className="p-4 text-xs font-medium text-gray-700">{donation.date}</td>
                    <td className="p-4 text-xs font-bold text-gray-700">{donation.purpose}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black",
                        getStatusColor(donation.status)
                      )}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => alert(`View receipt for ${donation.id}`)}
                        disabled={donation.status !== 'Completed'}
                        className="px-3 py-1 bg-white border-2 border-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#FFD400] transition-colors disabled:opacity-50 disabled:hover:bg-white"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
