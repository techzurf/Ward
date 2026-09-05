import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Dashboard } from './Dashboard';
import { IssuesManagement } from './IssuesManagement';
import { WorksManagement } from './WorksManagement';
import { ActivitiesManagement } from './ActivitiesManagement';
import { AnnouncementsManagement } from './AnnouncementsManagement';
import { MembersManagement } from './MembersManagement';
import { DonationsManagement } from './DonationsManagement';
import { WardManagement } from './WardManagement';
import { NotificationsManagement } from './NotificationsManagement';

export function AdminApp() {
  const [currentPath, setCurrentPath] = useState('dashboard');

  const renderContent = () => {
    switch (currentPath) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPath} />;
      case 'issues': return <IssuesManagement />;
      case 'works': return <WorksManagement />;
      case 'activities': return <ActivitiesManagement />;
      case 'announcements': return <AnnouncementsManagement />;
      case 'members': return <MembersManagement />;
      case 'donations': return <DonationsManagement />;
      case 'ward': return <WardManagement />;
      case 'notifications': return <NotificationsManagement />;
      default: return <Dashboard onNavigate={setCurrentPath} />;
    }
  };

  return (
    <AdminLayout currentPath={currentPath} onNavigate={setCurrentPath}>
      {renderContent()}
    </AdminLayout>
  );
}
