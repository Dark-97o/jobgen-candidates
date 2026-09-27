import React, { useState } from 'react';
import Sidebar from './components/dashboard/Sidebar';
import TopHeader from './components/dashboard/TopHeader';
import OverviewView from './components/dashboard/OverviewView';
import JobSearchView from './components/dashboard/JobSearchView';
import PipelineView from './components/dashboard/PipelineView';
import ResumeStudioView from './components/dashboard/ResumeStudioView';
import CoverLetterView from './components/dashboard/CoverLetterView';
import InterviewPrepView from './components/dashboard/InterviewPrepView';
import CareerPlanView from './components/dashboard/CareerPlanView';
import CareerEventsView from './components/dashboard/CareerEventsView';
import EmmaCopilotView from './components/dashboard/EmmaCopilotView';
import AtsScanModal from './components/dashboard/AtsScanModal';
import Footer from './components/dashboard/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [atsModalOpen, setAtsModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      
      {/* Main Candidate Dashboard App */}
      <div 
        style={{ 
          display: 'flex', 
          minHeight: '100vh', 
          backgroundColor: '#F8FAFD',
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.7) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(238, 242, 255, 0.8) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(240, 249, 255, 0.6) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(224, 231, 255, 0.5) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(236, 253, 245, 0.4) 0px, transparent 50%)
          `,
          position: 'relative'
        }}
      >
        {/* Subtle Ambient Refraction Flares for Liquid Glass */}
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            right: '15%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 75%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div 
          style={{
            position: 'fixed',
            bottom: '10%',
            left: '280px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.14) 0%, rgba(167, 139, 250, 0.06) 50%, transparent 75%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        
        {/* 1. Left Sidebar Navigation */}
        <Sidebar 
          currentTab={currentTab} 
          onSelectTab={setCurrentTab}
          onOpenAtsScan={() => setAtsModalOpen(true)}
        />

        {/* 2. Main Dashboard Area (Accommodates floating left flap) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingLeft: '78px' }}>
          
          {/* Top Header */}
          <TopHeader 
            currentTab={currentTab}
            onOpenAtsScan={() => setAtsModalOpen(true)}
            onQuickAction={() => setCurrentTab('jobs')}
          />

          {/* Dynamic Content Surface */}
          <main style={{ flex: 1, padding: currentTab === 'overview' ? '0 0 4px 28px' : (currentTab === 'jobs' ? '0 28px 24px 18px' : '0 0 24px 28px'), width: '100%', maxWidth: 'none', margin: 0 }}>
            {currentTab === 'overview' && (
              <OverviewView 
                onNavigate={setCurrentTab}
                onOpenAtsScan={() => setAtsModalOpen(true)}
              />
            )}

            {currentTab === 'jobs' && (
              <JobSearchView 
                onNavigateToInterview={() => setCurrentTab('interview')}
                onNavigateToResume={() => setCurrentTab('resume')}
              />
            )}

            {currentTab === 'pipeline' && (
              <PipelineView 
                onNavigateToJobSearch={() => setCurrentTab('jobs')}
              />
            )}

            {currentTab === 'resume' && (
              <ResumeStudioView />
            )}

            {currentTab === 'coverletter' && (
              <CoverLetterView />
            )}

            {currentTab === 'interview' && (
              <InterviewPrepView />
            )}

            {currentTab === 'careerplan' && (
              <CareerPlanView />
            )}

            {currentTab === 'events' && (
              <CareerEventsView />
            )}

            {(currentTab === 'workspace' || currentTab === 'emma') && (
              <EmmaCopilotView />
            )}
          </main>

          {/* Global Footer repeated in all tabs */}
          <Footer />
        </div>

        {/* Global ATS Resume Scanner Modal */}
        <AtsScanModal 
          isOpen={atsModalOpen} 
          onClose={() => setAtsModalOpen(false)} 
        />

      </div>
    </div>
  );
}

