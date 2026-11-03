import React from 'react';
import { 
  ArrowUpRight, 
  KeyRound, 
  Clock, 
  CreditCard, 
  Briefcase, 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';

export default function SafetyPage() {
  const safetyCards = [
    {
      icon: ArrowUpRight,
      title: 'Look closely at URLs & domains.',
      desc: 'Attackers create lookalike domains (e.g. sbi-secure.xyz instead of sbi.co.in). Always verify the domain name before typing credentials.',
      tip: 'Look for subtle misspellings (paytmm.com vs paytm.com) or random hyphens.',
    },
    {
      icon: KeyRound,
      title: 'Keep codes & PINs strictly private.',
      desc: 'Never share OTPs, UPI PINs, or bank passwords with anyone. Remember: Receiving money via UPI NEVER requires entering your PIN.',
      tip: 'If someone asks you to enter your UPI PIN to receive cashback or prize money, it is 100% a scam.',
    },
    {
      icon: Clock,
      title: 'Don’t rush panicked decisions.',
      desc: 'Urgent threats like "electricity disconnection in 2 hours" or "bank KYC expired today" are manufactured pressure tactics.',
      tip: 'Scammers rely on panic to bypass your logical thinking. Stop and breathe.',
    },
    {
      icon: CreditCard,
      title: 'Verify seller before payment.',
      desc: 'Unrealistic discounts (e.g., iPhone 16 for ₹999 or 90% off branded shoes) on social media ads are almost always fraudulent storefronts.',
      tip: 'Prefer Cash on Delivery (COD) or escrow payment for unfamiliar web stores.',
    },
    {
      icon: Briefcase,
      title: 'Part-Time Task & Telegram Job Scams.',
      desc: 'Offers promising ₹5,000/day for liking YouTube videos or rating hotels are investment recruitment traps.',
      tip: 'They give a small payout initially, then demand lakhs for "VIP task withdrawal" and block you.',
    },
    {
      icon: ShieldAlert,
      title: 'Beware of "Digital Arrest" Frauds.',
      desc: 'Imposters posing as Police, CBI, ED, or FedEx claiming illegal parcels in your name and putting you on Skype/video "digital arrest".',
      tip: 'No police or government agency ever conducts arrests or financial investigations via video call.',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <p className="text-[11px] font-bold tracking-widest text-indigo-400 uppercase">
          Defense Knowledge Base
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Stay scam-aware<span className="text-indigo-500">.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Small habits can make your online life dramatically safer. Keep these fundamental rules in mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safetyCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                <span className="font-bold text-indigo-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Pro Tip:
                </span>
                <p className="text-slate-400">{card.tip}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase">
              Immediate Help Desk
            </span>
            <h3 className="text-lg font-bold text-white">
              Fallen victim to online fraud? Act within the Golden Hour!
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              In India, call <b>{APP_CONFIG.EMERGENCY_HELPLINE}</b> immediately to freeze stolen funds before the scammer withdraws them, and file a formal grievance at <b>cybercrime.gov.in</b>.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={`tel:${APP_CONFIG.EMERGENCY_HELPLINE}`}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call {APP_CONFIG.EMERGENCY_HELPLINE} Helpline</span>
          </a>

          <a
            href={APP_CONFIG.NATIONAL_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <span>Visit Cybercrime Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

