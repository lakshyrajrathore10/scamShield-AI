import React from 'react';
import { 
  ArrowUpRight, 
  MessageSquare, 
  Percent, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import { classifyRisk } from '../../utils/riskClassifier';
import { formatDate } from '../../utils/formatters';
import { APP_CONFIG, SCAN_MODES, VIEWS } from '../../config/constants';

export default function OverviewPage({ onStartScan, onSelectMode, recentScans, onNavigate }) {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Title */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold tracking-widest text-indigo-400 uppercase">
          Your Digital Safety Desk
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Think before you click<span className="text-indigo-500">.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          A quick check today can save you from a costly mistake tomorrow.
        </p>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/70 border border-indigo-500/20 p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ✦ Smarter Online Decisions
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Not sure about that<br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              link, message or offer?
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Drop it here. ScamShield helps you spot common warning signs, deceptive psychological tricks, and phishing patterns before you take the next step.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onStartScan(SCAN_MODES.URL)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Check something now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shadow-2xl backdrop-blur-md">
              <ShieldCheck className="w-16 h-16 text-indigo-400" />
            </div>
            <div className="absolute -bottom-3 -right-4 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-[11px] font-semibold text-white shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI Shield Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Category Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">What would you like to check?</h3>
          <p className="text-xs text-slate-400">Choose a scan category to get started.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onSelectMode(SCAN_MODES.URL)}
            className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all cursor-pointer shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Suspicious URL</h4>
                <p className="text-xs text-slate-400">Check a website or link</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </div>

          <div
            onClick={() => onSelectMode(SCAN_MODES.MESSAGE)}
            className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/90 transition-all cursor-pointer shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Text or Message</h4>
                <p className="text-xs text-slate-400">Review SMS, DM or email</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </div>

          <div
            onClick={() => onSelectMode(SCAN_MODES.OFFER)}
            className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Online Offer</h4>
                <p className="text-xs text-slate-400">Check suspicious deals</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Activity & Safety Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Recent Activity</h3>
              <p className="text-xs text-slate-400">Your latest checks appear here.</p>
            </div>
            <button
              onClick={() => onNavigate(VIEWS.HISTORY)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              View History →
            </button>
          </div>

          {recentScans && recentScans.length > 0 ? (
            <div className="divide-y divide-slate-800/60">
              {recentScans.map((item) => {
                const riskDetails = classifyRisk(item.risk);
                const RiskIcon = riskDetails.icon;
                return (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-slate-200 truncate font-mono">
                        {item.preview}
                      </p>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {formatDate(item.date)} • Mode: {String(item.type).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${riskDetails.badgeClass}`}>
                        <RiskIcon className="w-3 h-3" /> {riskDetails.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-500 flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-300">No scans yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Your recent checks will appear here once you scan a link or message.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/40 to-slate-900/60 border border-indigo-500/20 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              ✦ Quick Safety Note
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Urgency is a red flag.
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scam messages often pressure you to act immediately (e.g., "Electricity cut off today", "Account will be suspended in 2 hours"). Take a breath and verify through an official channel.
            </p>
          </div>

          <button
            onClick={() => onNavigate(VIEWS.SAFETY)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-indigo-300 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>More Safety Tips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              Emergency Cyber Fraud Helpline (India)
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Report financial cyber fraud immediately by dialing <b className="text-white">{APP_CONFIG.EMERGENCY_HELPLINE}</b> or visiting <b className="text-indigo-400">{APP_CONFIG.NATIONAL_PORTAL_URL.replace('https://', '')}</b>.
            </p>
          </div>
        </div>

        <a 
          href={APP_CONFIG.NATIONAL_PORTAL_URL}
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <span>cybercrime.gov.in</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

