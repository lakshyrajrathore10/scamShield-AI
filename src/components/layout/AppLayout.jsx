import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { VIEWS, SCAN_MODES } from '../../config/constants';

export default function AppLayout({ currentView, onNavigate, onStartScan, historyCount, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px]"></div>
      </div>

      <div className="flex-1 flex">
        <Sidebar
          currentView={currentView}
          onNavigate={onNavigate}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          historyCount={historyCount}
        />

        <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
          <Topbar
            currentView={currentView}
            onMenuClick={() => setIsSidebarOpen(true)}
            onQuickScan={() => onStartScan(SCAN_MODES.URL)}
            onGoToLanding={() => onNavigate(VIEWS.LANDING)}
          />

          <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
            {children}
          </main>

          <Footer onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

