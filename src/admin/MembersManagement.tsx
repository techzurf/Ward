import React, { useState } from 'react';
import { Search, Filter, Users, ShieldCheck } from 'lucide-react';
import { currentMembership } from '../data'; 
import { cn } from '../utils';
import { SuccessAlert } from './AdminComponents';

// Mock list based on the single currentMembership
const initialMembers = Array.from({ length: 8 }).map((_, i) => ({
  ...currentMembership!,
  memberId: `CWC-${2024000 + i}`,
  name: ['Karthik Raja', 'Anita Sharma', 'Suresh Menon', 'Priya Devi', 'Vikram Singh', 'Lakshmi N.', 'Arun Kumar', 'Meena S.'][i],
  mobile: `+91 98400 ${10000 + i}`,
  status: i % 4 === 0 ? 'Pending Verification' : 'Approved',
}));

export function MembersManagement() {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-black text-white';
      case 'Pending Verification': return 'bg-[#FFD400] text-black';
      case 'Rejected': return 'bg-[#D71920] text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  const handleApprove = (memberId: string) => {
    setMembers(members.map(m => m.memberId === memberId ? { ...m, status: 'Approved' } : m));
    showSuccess(`Member ${memberId} approved successfully.`);
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mobile.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <SuccessAlert message={successMsg} onClose={() => setSuccessMsg('')} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
          <Users className="text-[#D71920]" size={28} />
          Members Management
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded font-bold text-sm focus:outline-none focus:border-[#D71920]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black text-white text-[10px] uppercase tracking-widest">
                <th className="p-4 border-b-4 border-black">Member</th>
                <th className="p-4 border-b-4 border-black">ID & Role</th>
                <th className="p-4 border-b-4 border-black">Contact</th>
                <th className="p-4 border-b-4 border-black">Ward / Area</th>
                <th className="p-4 border-b-4 border-black">Joined</th>
                <th className="p-4 border-b-4 border-black">Status</th>
                <th className="p-4 border-b-4 border-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                    No members found.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member, idx) => (
                  <tr key={idx} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={member.profilePhoto} alt={member.name} className="w-10 h-10 rounded border-2 border-black object-cover" />
                        <p className="font-bold text-sm text-black">{member.name}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-xs">{member.memberId}</p>
                      <p className="text-[9px] uppercase tracking-widest text-[#D71920] font-bold">{member.membershipType}</p>
                    </td>
                    <td className="p-4 text-xs font-bold text-gray-700">{member.mobile}</td>
                    <td className="p-4">
                      <p className="text-xs font-bold">{member.wardNumber}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{member.area}</p>
                    </td>
                    <td className="p-4 text-xs font-medium text-gray-700">{member.joiningDate || member.submissionDate}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border-2 border-black",
                        getStatusColor(member.status)
                      )}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button 
                        className="px-3 py-1 bg-white border-2 border-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#FFD400] transition-colors"
                      >
                        View
                      </button>
                      {member.status === 'Pending Verification' && (
                        <button 
                          onClick={() => handleApprove(member.memberId)}
                          className="px-3 py-1 bg-black text-[#FFD400] border-2 border-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center gap-1"
                        >
                          <ShieldCheck size={12} /> Approve
                        </button>
                      )}
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
