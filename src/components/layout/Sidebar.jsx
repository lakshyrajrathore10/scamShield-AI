import React from 'react';
import { 
  ShieldCheck, 
  Home, 
  Search, 
  History, 
  BookOpen, 
  X, 
  CheckCircle2, 
  LayoutTemplate 
} from 'lucide-react';
import { VIEWS, APP_CONFIG } from '../../config/constants';

export default function Sidebar({ currentView, onNavigate, isOpen, onClose, historyCount }) {
  const navItems = [
    { id: VIEWS.OVERVIEW, label: 'Overview', icon: Home },
    { id: VIEWS.SCANNER, label: 'Scam Scanner', icon: Search },
    { id: VIEWS.HISTORY, label: 'Scan History', icon: History, count: historyCount },
    { id: VIEWS.SAFETY, label: 'Safety Tips', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900/95 lg:bg-slate-900/60 
        backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between 
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center">
                  scam<span className="text-indigo-400">shield</span>
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">AI</span>
                </h2>
                <small className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                  Online Safety Desk
                </small>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Presentation Switcher Button */}
          <div className="mt-6">
            <button
              onClick={() => onNavigate(VIEWS.LANDING)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-indigo-300 hover:text-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-indigo-400" />
                <span>Presentation / Pitch</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-slate-300">View ↗</span>
            </button>
          </div>

          <p className="mt-6 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            Workspace
          </p>

          {/* Navigation Links */}
          <nav className="mt-2.5 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold
                    transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span className={`
                      px-2 py-0.5 text-[10px] rounded-full font-bold
                      ${isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}
                    `}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-6 border-t border-slate-800/80 space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
            <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Stay one step ahead</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pause, check and then proceed. Your online safety starts with you.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 font-bold flex items-center justify-center text-sm shadow-inner">
              S
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-200 truncate">Student Mode</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <small className="text-[11px] text-slate-400 block truncate">Personal Workspace</small>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

