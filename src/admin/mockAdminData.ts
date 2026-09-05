export interface AdminDonation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  purpose: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export const mockDonations: AdminDonation[] = [
  { id: 'DON-001', donorName: 'Ramesh K.', amount: 5000, date: '2026-09-01', purpose: 'Ward Development Fund', status: 'Completed' },
  { id: 'DON-002', donorName: 'Priya S.', amount: 1000, date: '2026-09-02', purpose: 'Community Events', status: 'Completed' },
  { id: 'DON-003', donorName: 'Anonymous', amount: 500, date: '2026-09-03', purpose: 'General Support', status: 'Pending' },
  { id: 'DON-004', donorName: 'Vijay Kumar', amount: 2000, date: '2026-09-03', purpose: 'Street Light Fixes', status: 'Completed' },
];
