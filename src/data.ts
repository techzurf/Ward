import { Issue, Activity, Announcement, DevelopmentWork, Area, Councillor, User, Notification, MembershipDetails } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'Karthik S',
  phone: '+91 98765 43210',
  ward: 'Ward 112',
  area: 'Teynampet',
  street: 'Poes Garden 1st Street',
  imageUrl: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1788424427/ChatGPT_Image_Sep_3_2026_02_03_33_PM_yjchfs.png'
};

export const currentMembership: MembershipDetails | null = {
  applicationId: 'APP-2026-9482',
  memberId: 'MEM-112-4029',
  name: 'Karthik S',
  mobile: '+91 98765 43210',
  wardNumber: '112',
  area: 'Teynampet',
  membershipType: 'Active Member',
  status: 'Approved',
  joiningDate: '2026-08-10',
  submissionDate: '2026-08-01',
  profilePhoto: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1788424427/ChatGPT_Image_Sep_3_2026_02_03_33_PM_yjchfs.png'
};

export const currentCouncillor: Councillor = {
  id: 'c1',
  name: 'Tmt. R. Lakshmi',
  wardNumber: '112',
  zone: 'Zone 9 (Teynampet)',
  party: 'Independent',
  bio: 'Dedicated to the systematic development of Ward 112 with a focus on sanitation, road safety, and community welfare.',
  phone: '044-2435-XXXX',
  whatsapp: '+91 98400XXXXX',
  officeLocation: 'Ward 112 Office, Eldams Road, Teynampet, Chennai 600018',
  officeHours: 'Mon - Sat: 9:00 AM - 1:00 PM',
  imageUrl: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1788424383/ChatGPT_Image_Sep_3_2026_02_02_22_PM_wfatka.png'
};

export const wardInfo = {
  number: '112',
  name: 'Teynampet',
  zone: 'Zone 9',
  population: '45,200',
  households: '12,450',
  registeredResidents: '8,300',
  openIssues: 24,
  areasCovered: ['Teynampet', 'Poes Garden', 'Vellala Teynampet', 'Seethammal Colony'],
};

export const issues: Issue[] = [
  {
    id: 'ISS-2026-081',
    title: 'Severe Waterlogging near KB Dasan Road',
    category: 'Drainage',
    description: 'The stormwater drain is blocked and sewage water is overflowing onto the street, causing severe inconvenience to pedestrians.',
    location: 'KB Dasan Road, Seethammal Colony',
    dateReported: '2026-08-12',
    status: 'In Progress',
    reporterId: 'u1',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=60',
    updates: [
      { date: '2026-08-12', status: 'Submitted', message: 'Issue reported by citizen.' },
      { date: '2026-08-13', status: 'Under Review', message: 'Assigned to Zone 9 AE (Water Board).' },
      { date: '2026-08-13', status: 'In Progress', message: 'Metrowater team is on-site with suction trucks.' }
    ]
  },
  {
    id: 'ISS-2026-079',
    title: 'Streetlight not working for 3 days',
    category: 'Street Lights',
    description: 'Pole number 44-A has a fused bulb. The street is completely dark at night.',
    location: 'Eldams Road, 2nd Cross Street',
    dateReported: '2026-08-10',
    status: 'Resolved',
    reporterId: 'u2',
    updates: [
      { date: '2026-08-10', status: 'Submitted', message: 'Issue reported.' },
      { date: '2026-08-12', status: 'Resolved', message: 'Bulb replaced by electrical department.' }
    ]
  },
  {
    id: 'ISS-2026-084',
    title: 'Garbage not collected',
    category: 'Garbage',
    description: 'Bin is overflowing since yesterday morning. stray dogs are scattering the waste.',
    location: 'Poes Road, Near Post Office',
    dateReported: '2026-08-13',
    status: 'Submitted',
    reporterId: 'u1',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&auto=format&fit=crop&q=60'
  }
];

export const activities: Activity[] = [
  {
    id: 'ACT-001',
    title: 'Dengue Awareness Campaign',
    date: '15 Aug 2026',
    time: '10:00 AM - 1:00 PM',
    location: 'Teynampet Signal junction',
    description: 'Door-to-door awareness campaign and distribution of nilavembu kashayam to residents.',
    category: 'Awareness',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'ACT-002',
    title: 'Monthly Ward Committee Meeting',
    date: '18 Aug 2026',
    time: '4:00 PM',
    location: 'Ward 112 Office',
    description: 'Public meeting to discuss ongoing development works and review resident grievances. All are welcome.',
    category: 'Meeting'
  }
];

export const announcements: Announcement[] = [
  {
    id: 'ANN-001',
    title: 'Scheduled Power Cut',
    date: '14 Aug 2026',
    category: 'Utility',
    shortDescription: 'TANGEDCO announced power cut from 9AM to 2PM for maintenance.',
    fullContent: 'TANGEDCO has scheduled a maintenance power shutdown on 14th August from 9:00 AM to 2:00 PM in the following areas: Teynampet, Seethammal Colony, and parts of Eldams Road. Please plan accordingly.',
    isImportant: true
  },
  {
    id: 'ANN-002',
    title: 'Special Medical Camp',
    date: '12 Aug 2026',
    category: 'Health',
    shortDescription: 'Free eye checkup and general health screening this Sunday.',
    fullContent: 'A free medical camp will be organized at the Corporation School this Sunday. General checkup, eye testing, and BP/Sugar screening will be available.',
    isImportant: false
  }
];

export const developmentWorks: DevelopmentWork[] = [
  {
    id: 'DEV-001',
    title: 'New Stormwater Drain Construction',
    category: 'Infrastructure',
    location: 'Seethammal Colony Main Road',
    startDate: '01 Jul 2026',
    status: 'Ongoing',
    description: 'Laying of new RCC stormwater drains to prevent monsoon flooding in low-lying areas.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'DEV-002',
    title: 'Park Renovation',
    category: 'Public Facilities',
    location: 'Sriram Nagar Park',
    startDate: '15 May 2026',
    status: 'Completed',
    description: 'Installation of new children play equipment, walking track, and high-mast lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=500&auto=format&fit=crop&q=60'
  }
];

export const areas: Area[] = [
  {
    id: 'A-01',
    name: 'Seethammal Colony',
    wardNumber: '112',
    streetsCount: 8,
    residentsCount: 3200,
    openIssuesCount: 4,
    importantLocations: ['Sriram Nagar Park', 'Corporation Clinic']
  },
  {
    id: 'A-02',
    name: 'Poes Garden',
    wardNumber: '112',
    streetsCount: 12,
    residentsCount: 2800,
    openIssuesCount: 2,
    importantLocations: ['Post Office', 'Police Booth']
  },
  {
    id: 'A-03',
    name: 'Vellala Teynampet',
    wardNumber: '112',
    streetsCount: 24,
    residentsCount: 8500,
    openIssuesCount: 15,
    importantLocations: ['Market', 'Corporation School']
  }
];

export const notifications: Notification[] = [
  {
    id: 'N-001',
    title: 'Issue Status Updated',
    body: 'Your report "Severe Waterlogging near KB Dasan Road" is now In Progress.',
    date: 'Just now',
    category: 'issue',
    isRead: false,
    linkScreen: 'IssueDetails',
    linkParams: { id: 'ISS-2026-081' }
  },
  {
    id: 'N-002',
    title: 'Important Announcement',
    body: 'Scheduled Power Cut on 14 Aug 2026.',
    date: '2 hours ago',
    category: 'announcement',
    isRead: true,
    linkScreen: 'AnnouncementDetails',
    linkParams: { id: 'ANN-001' }
  }
];
