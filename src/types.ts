export type Screen = 
  | 'Splash'
  | 'Welcome'
  | 'Home'
  | 'WardOverview'
  | 'AreasList'
  | 'AreaDetails'
  | 'CouncillorProfile'
  | 'DevelopmentWorks'
  | 'IssuesList'
  | 'IssueDetails'
  | 'ReportIssue'
  | 'ActivitiesList'
  | 'ActivityDetails'
  | 'AnnouncementsList'
  | 'AnnouncementDetails'
  | 'Notifications'
  | 'Profile'
  | 'MyIssues'
  | 'Language'
  | 'Settings'
  | 'MembershipHome'
  | 'MembershipForm'
  | 'MembershipSuccess'
  | 'MyMembership'
  | 'MembershipCard';

export interface AppState {
  currentScreen: Screen;
  screenParams?: any;
  language: 'en' | 'ta';
}

export type IssueStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';
export type IssueCategory = 'Roads' | 'Street Lights' | 'Drainage' | 'Garbage' | 'Water' | 'Traffic' | 'Public Facilities' | 'Other';

export interface Issue {
  id: string;
  title: string;
  category: IssueCategory;
  description: string;
  location: string;
  dateReported: string;
  status: IssueStatus;
  imageUrl?: string;
  reporterId: string;
  updates?: IssueUpdate[];
}

export interface IssueUpdate {
  date: string;
  status: IssueStatus;
  message: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
  category: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  shortDescription: string;
  fullContent: string;
  isImportant: boolean;
}

export interface DevelopmentWork {
  id: string;
  title: string;
  category: string;
  location: string;
  startDate: string;
  status: 'Planned' | 'Ongoing' | 'Completed';
  description: string;
  imageUrl?: string;
}

export interface Area {
  id: string;
  name: string;
  wardNumber: string;
  streetsCount: number;
  residentsCount: number;
  openIssuesCount: number;
  importantLocations: string[];
}

export interface Councillor {
  id: string;
  name: string;
  wardNumber: string;
  zone: string;
  party: string;
  bio: string;
  phone: string;
  whatsapp: string;
  officeLocation: string;
  officeHours: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  ward: string;
  area: string;
  street: string;
  imageUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  category: 'issue' | 'announcement' | 'activity' | 'general';
  isRead: boolean;
  linkScreen?: Screen;
  linkParams?: any;
}

export type MembershipStatus = 'Pending Verification' | 'Approved' | 'Active' | 'Expired' | 'Rejected';
export type MembershipType = 'General Member' | 'Active Member' | 'Volunteer';

export interface MembershipDetails {
  applicationId: string;
  memberId?: string;
  name: string;
  mobile: string;
  wardNumber: string;
  area: string;
  membershipType: MembershipType;
  status: MembershipStatus;
  joiningDate?: string;
  submissionDate: string;
  profilePhoto?: string;
}
