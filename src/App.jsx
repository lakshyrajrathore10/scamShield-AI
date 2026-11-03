import React, { useState, useEffect } from 'react';
import { VIEWS, SCAN_MODES } from './config/constants';
import { historyStorage } from './storage/historyStorage';

// Layout & Common
import AppLayout from './components/layout/AppLayout';
import Toast from './components/common/Toast';

// Features
import LandingPage from './features/landing/LandingPage';
import OverviewPage from './features/overview/OverviewPage';
import ScannerPage from './features/scanner/ScannerPage';
import HistoryPage from './features/history/HistoryPage';
import SafetyPage from './features/safety/SafetyPage';

export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.LANDING);
  const [scannerMode, setScannerMode] = useState(SCAN_MODES.URL);
  const [history, setHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setHistory(historyStorage.getAll());
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScan = (mode = SCAN_MODES.URL) => {
    setScannerMode(mode);
    setCurrentView(VIEWS.SCANNER);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanLogged = (newItem) => {
    setHistory((prev) => [newItem, ...prev.filter((i) => i.id !== newItem.id)].slice(0, 50));
  };

  const handleClearHistory = () => {
    if (history.length === 0) {
      showToast('No history to clear!');
      return;
    }
    if (window.confirm('Are you sure you want to clear your entire scan history?')) {
      historyStorage.clear();
      setHistory([]);
      showToast('Scan history cleared successfully!');
    }
  };

  // Fullscreen Presentation Landing View
  if (currentView === VIEWS.LANDING) {
    return (
      <>
        <LandingPage
          onLaunchApp={() => handleNavigate(VIEWS.OVERVIEW)}
          onStartScanMode={handleStartScan}
        />
        <Toast message={toastMessage} />
      </>
    );
  }

  // Enterprise Workspace Shell
  return (
    <>
      <AppLayout
        currentView={currentView}
        onNavigate={handleNavigate}
        onStartScan={handleStartScan}
        historyCount={history.length}
      >
        {currentView === VIEWS.OVERVIEW && (
          <OverviewPage
            onStartScan={handleStartScan}
            onSelectMode={handleStartScan}
            recentScans={history.slice(0, 3)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === VIEWS.SCANNER && (
          <ScannerPage
            initialMode={scannerMode}
            onScanLogged={handleScanLogged}
            showToast={showToast}
          />
        )}

        {currentView === VIEWS.HISTORY && (
          <HistoryPage
            history={history}
            onClearHistory={handleClearHistory}
            showToast={showToast}
          />
        )}

        {currentView === VIEWS.SAFETY && <SafetyPage />}
      </AppLayout>

      <Toast message={toastMessage} />
    </>
  );
}
