import React from 'react';
import { APP_CONFIG, VIEWS } from '../../config/constants';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-800/60 py-6 px-4 sm:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl w-full mx-auto">
      <span>
        © {APP_CONFIG.COPYRIGHT_YEAR} {APP_CONFIG.NAME} — {APP_CONFIG.TAGLINE}
      </span>
      <div className="flex items-center gap-4 text-slate-400">
        <button
          onClick={() => onNavigate(VIEWS.LANDING)}
          className="hover:text-indigo-400 transition-colors cursor-pointer text-xs"
        >
          Presentation Deck
        </button>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Emergency Helpline: {APP_CONFIG.EMERGENCY_HELPLINE}
        </span>
      </div>
    </footer>
  );
}

