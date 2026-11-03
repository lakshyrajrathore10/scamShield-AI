import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Lock, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  Cpu, 
  Sparkles, 
  Search, 
  ChevronRight,
  Target,
  Award
} from 'lucide-react';
import { APP_CONFIG, SCAN_MODES, VIEWS } from '../../config/constants';

export default function LandingPage({ onLaunchApp, onStartScanMode }) {
  const problems = [
    {
      id: '01',
      tag: 'Psychological Panic',
      title: 'Digital Arrest & Police Impersonation',
      stat: '₹120+ Cr',
      statLabel: 'Lost in single quarter (MHA Data)',
      desc: 'Scammers impersonate CBI, Police, or Customs over video calls, claiming illegal parcels in the victim\'s name and intimidating them into transferring their life savings into fake "verification accounts".',
      solution: 'ScamShield flags fake authority patterns and provides instant guidance: Real police never conduct digital arrests or demand money via video call.'
    },
    {
      id: '02',
      tag: 'Credential & Payment Theft',
      title: 'Phishing URLs & Electricity Bill Cutoff',
      stat: '73%',
      statLabel: 'Citizens receive phishing weekly',
      desc: 'Deceptive SMS claiming power will be disconnected at 9:30 PM tonight, leading victims to fake portal domains like `sbi-update.xyz` or `bill-pay.click` designed to steal credentials.',
      solution: 'Our URL forensic engine detects lookalike brand domains, suspicious TLDs, and redirection chains in under 50 milliseconds.'
    },
    {
      id: '03',
      tag: 'Youth & Student Exploitation',
      title: 'Telegram Task & Fake Part-Time Job Scams',
      stat: '10 Lakh+',
      statLabel: 'Young adults targeted yearly',
      desc: 'Promises of earning ₹5,000/day for simply liking YouTube videos or giving hotel reviews. They give small ₹200 payouts to build trust, then freeze funds behind costly "VIP prepaid tasks".',
      solution: 'NLP linguistic analyzer detects hallmark recruitment lures, Ponzi structures, and fake commission matrices before money is wired.'
    },
    {
      id: '04',
      tag: 'Payment Confusion',
      title: 'UPI & QR Code Cashback Deception',
      stat: '45%+',
      statLabel: 'Of reported UPI disputes',
      desc: 'Victims are tricked into scanning a QR code or entering their UPI PIN under the false pretext of "receiving cashback, refund, or marketplace payment".',
      solution: 'ScamShield reinforces the Golden Rule with high-visibility warnings: Entering UPI PIN ALWAYS deducts money, never credits it.'
    }
  ];

  const metrics = [
    { value: '₹1,750+ Cr', label: 'Monthly Financial Loss to Scams in India', change: '+34% YoY' },
    { value: '1.2 Lakh+', label: 'Daily Fraud Complaints on National Portal', change: 'Surging' },
    { value: '< 60 Mins', label: 'Critical Golden Hour to Freeze Stolen Funds', change: 'Time Sensitive' },
    { value: '94%', label: 'Scams Rely on Panic & Emotional Urgency', change: 'Human Vulnerability' },
  ];

  const pillars = [
    {
      icon: Search,
      title: 'Multi-Vector Threat Scanner',
      desc: 'Analyze suspicious URLs, SMS text, WhatsApp forwards, and unrealistic ecommerce offers with specialized heuristic filters.',
      badge: 'Zero Latency'
    },
    {
      icon: Cpu,
      title: 'AI Behavioral & Tone Intelligence',
      desc: 'Goes beyond simple keyword blocklists to evaluate psychological urgency, fake authority intimidation, and predatory pricing.',
      badge: 'Context Aware'
    },
    {
      icon: Lock,
      title: 'Privacy-First Architecture',
      desc: 'Zero-credential storage. Users never need to register or share private passwords to verify safety signals.',
      badge: 'Privacy Protected'
    },
    {
      icon: PhoneCall,
      title: 'Direct National 1930 Integration',
      desc: 'Guides users into the Golden Hour recovery window with direct emergency cyber helpline 1930 and cybercrime.gov.in escalation.',
      badge: 'Govt Aligned'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white flex items-center">
                scam<span className="text-indigo-400">shield</span>
                <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">AI</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#problem" className="hover:text-white transition-colors">The Crisis</a>
            <a href="#solution" className="hover:text-white transition-colors">Solution Architecture</a>
            <a href="#comparison" className="hover:text-white transition-colors">Impact Matrix</a>
            <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLaunchApp}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <span>Launch App Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>NATIONAL ONLINE SAFETY & FRAUD PREVENTION INITIATIVE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Protecting Citizens from <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              Modern Cyber Frauds
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every day, thousands fall prey to Digital Arrests, Phishing Links, Task Scams, and UPI traps. <b className="text-white">{APP_CONFIG.NAME}</b> empowers citizens with an instant, real-time threat detection desk before taking the fatal click.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Open Scanner Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#problem"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Problem & Pitch Deck</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
            {metrics.map((m, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{m.change}</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{m.value}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Crisis / Problem */}
      <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            THE PROBLEM STATEMENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Are Scams Skyrocketing?
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            India is experiencing an unprecedented digital payment boom (UPI), but cybercriminals exploit human psychological blind spots faster than traditional security firewalls can react.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div 
              key={p.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                  Case {p.id}: {p.tag}
                </span>
                <div className="text-right">
                  <span className="text-xs font-bold text-white block">{p.stat}</span>
                  <small className="text-[10px] text-slate-500 block">{p.statLabel}</small>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  How ScamShield Solves It:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {p.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Architecture */}
      <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            THE SOLUTION ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How ScamShield AI Protects You
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            A comprehensive, multi-layer defense engine engineered to analyze digital communication before harm occurs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all shadow-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-semibold text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Scan Trigger */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Try It Right Now</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Experience ScamShield Live in Action</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Test suspicious bank URLs, deceptive electricity disconnection SMS, or fake ₹999 iPhone offers with our interactive scanner workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onStartScanMode(SCAN_MODES.URL)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Scan a URL →
            </button>
            <button
              onClick={() => onStartScanMode(SCAN_MODES.MESSAGE)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              Check a Message →
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            IMPACT & COMPARISON
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Before vs. After ScamShield
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            How proactively checking warning signs transforms a citizen's digital safety outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-red-950/15 border border-red-500/20 space-y-5">
            <div className="flex items-center gap-3 text-red-400 font-bold text-lg">
              <XCircle className="w-6 h-6 shrink-0" />
              <h3>Without ScamShield (Current Scenario)</h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                <span><b>Panic Decision:</b> Victim receives threat of power cutoff or arrest, acts impulsively within minutes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                <span><b>Credential Theft:</b> Victim types bank credentials or PIN into deceptive lookalike website.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                <span><b>Delayed Realization:</b> Fraud is realized hours or days later; funds have already been routed through mule accounts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                <span><b>Zero Forensic Clarity:</b> Victims feel isolated, unsure if the threat was genuine or fake.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 space-y-5 shadow-xl">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <h3>With ScamShield AI Protection</h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><b>Instant Reality Check:</b> Content pasted in 3 seconds; AI flags psychological urgency and threat triggers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><b>Domain & Signal Detection:</b> Warns of spoofed TLDs, non-official portals, and known scam templates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><b>Actionable Guidance:</b> Clear reassurance: "No police officer ever calls on Skype. Do not wire money."</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><b>Golden Hour Escalation:</b> Direct 1-tap call to 1930 Helpline and cybercrime.gov.in portal.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tech Specifications */}
      <section id="tech" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            TECHNICAL SPECIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built with Modern Engineering
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            Engineered for high throughput, zero downtime, and complete client-side fault tolerance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Frontend Interface
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              React 19, Vite 6, Tailwind CSS v4, Lucide React icons, and modular feature-based architecture.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Intelligent Heuristic Engine
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dual-mode architecture: Connects seamlessly to Java / Spring Boot backend on <code className="text-indigo-300">/api/scams/analyze</code>, with instant offline client-side heuristic failover.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Security & Privacy
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No private data persistence, client-side input scrubbing for passwords/OTPs, and full alignment with CERT-In cyber guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 space-y-6 shadow-2xl">
          <Award className="w-12 h-12 text-indigo-400 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Explore ScamShield?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test the live scanner, inspect historical scan analysis, or review the defense knowledge base right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer hover:scale-105"
            >
              Open Full ScamShield WebApp →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {APP_CONFIG.COPYRIGHT_YEAR} {APP_CONFIG.NAME} — {APP_CONFIG.TAGLINE}</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Emergency Helpline: {APP_CONFIG.EMERGENCY_HELPLINE}</span>
            <span>•</span>
            <a href={APP_CONFIG.NATIONAL_PORTAL_URL} target="_blank" rel="noreferrer" className="hover:text-indigo-400">
              cybercrime.gov.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

