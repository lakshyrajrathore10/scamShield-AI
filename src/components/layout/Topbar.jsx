import React from 'react';
import { Menu, PlusCircle, LayoutTemplate } from 'lucide-react';
import { VIEWS } from '../../config/constants';

export default function Topbar({ currentView, onMenuClick, onQuickScan, onGoToLanding }) {
  const titles = {
    [VIEWS.OVERVIEW]: 'Overview',
    [VIEWS.SCANNER]: 'Scam Scanner',
    [VIEWS.HISTORY]: 'Scan History',
    [VIEWS.SAFETY]: 'Safety Tips',
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5 font-medium">
          <span className="hidden sm:inline">Workspace</span>
          <span className="hidden sm:inline text-slate-600">/</span>
          <b className="text-white font-semibold">{titles[currentView] || 'Overview'}</b>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Presentation Switcher */}
        <button
          onClick={onGoToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all cursor-pointer"
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Presentation Deck</span>
          <span className="sm:hidden">Pitch</span>
        </button>

        {/* Protection Active Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Protection Active</span>
        </div>

        {/* Quick Scan Action */}
        {currentView !== VIEWS.SCANNER && (
          <button
            onClick={onQuickScan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>
        )}
      </div>
    </header>
  );
}

