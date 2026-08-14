/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, AppState } from './types';
import { BottomNav } from './components/layout/BottomNav';
import { Splash } from './screens/Splash';
import { Welcome } from './screens/Welcome';
import { Home } from './screens/Home';
import { WardOverview } from './screens/WardOverview';
import { AreasList } from './screens/AreasList';
import { AreaDetails } from './screens/AreaDetails';
import { CouncillorProfile } from './screens/CouncillorProfile';
import { DevelopmentWorks } from './screens/DevelopmentWorks';
import { IssuesList } from './screens/IssuesList';
import { IssueDetails } from './screens/IssueDetails';
import { ReportIssue } from './screens/ReportIssue';
import { ActivitiesList } from './screens/ActivitiesList';
import { ActivityDetails } from './screens/ActivityDetails';
import { AnnouncementsList } from './screens/AnnouncementsList';
import { AnnouncementDetails } from './screens/AnnouncementDetails';
import { Notifications } from './screens/Notifications';
import { Profile } from './screens/Profile';
import { MyIssues } from './screens/MyIssues';
import { Language } from './screens/Language';
import { Settings } from './screens/Settings';
import { MembershipHome } from './screens/MembershipHome';
import { MembershipForm } from './screens/MembershipForm';
import { MembershipSuccess } from './screens/MembershipSuccess';
import { MyMembership } from './screens/MyMembership';
import { MembershipCard } from './screens/MembershipCard';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'Splash',
    language: 'en'
  });

  const navigate = (screen: Screen, params?: any) => {
    setState(prev => ({ ...prev, currentScreen: screen, screenParams: params }));
  };

  const renderScreen = () => {
    const props = { navigate, params: state.screenParams, language: state.language };
    
    switch (state.currentScreen) {
      case 'Splash': return <Splash {...props} />;
      case 'Welcome': return <Welcome {...props} />;
      case 'Home': return <Home {...props} />;
      case 'WardOverview': return <WardOverview {...props} />;
      case 'AreasList': return <AreasList {...props} />;
      case 'AreaDetails': return <AreaDetails {...props} />;
      case 'CouncillorProfile': return <CouncillorProfile {...props} />;
      case 'DevelopmentWorks': return <DevelopmentWorks {...props} />;
      case 'IssuesList': return <IssuesList {...props} />;
      case 'IssueDetails': return <IssueDetails {...props} />;
      case 'ReportIssue': return <ReportIssue {...props} />;
      case 'ActivitiesList': return <ActivitiesList {...props} />;
      case 'ActivityDetails': return <ActivityDetails {...props} />;
      case 'AnnouncementsList': return <AnnouncementsList {...props} />;
      case 'AnnouncementDetails': return <AnnouncementDetails {...props} />;
      case 'Notifications': return <Notifications {...props} />;
      case 'Profile': return <Profile {...props} />;
      case 'MyIssues': return <MyIssues {...props} />;
      case 'Language': return <Language {...props} />;
      case 'Settings': return <Settings {...props} />;
      case 'MembershipHome': return <MembershipHome {...props} />;
      case 'MembershipForm': return <MembershipForm {...props} />;
      case 'MembershipSuccess': return <MembershipSuccess {...props} />;
      case 'MyMembership': return <MyMembership {...props} />;
      case 'MembershipCard': return <MembershipCard {...props} />;
      default: return <Home {...props} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#E5E5E5] flex flex-col font-sans text-black pb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentScreen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col w-full h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <BottomNav currentScreen={state.currentScreen} navigate={navigate} />
    </div>
  );
}

