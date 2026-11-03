import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  MessageSquare, 
  Percent, 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Loader2, 
  Lock 
} from 'lucide-react';
import { scamService } from '../../services/scamService';
import { historyStorage } from '../../storage/historyStorage';
import { classifyRisk } from '../../utils/riskClassifier';
import { isValidUrl } from '../../utils/validators';
import { SCAN_MODES } from '../../config/constants';

export default function ScannerPage({ initialMode = SCAN_MODES.URL, onScanLogged, showToast }) {
  const [mode, setMode] = useState(initialMode);
  const [inputContent, setInputContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  const modeConfigs = {
    [SCAN_MODES.URL]: {
      label: 'Paste the website URL',
      placeholder: 'https://example.com or suspicious domain...',
      hint: 'Include the complete link starting with https:// or http://',
      examples: [
        { label: 'Phishing Bank Link', text: 'http://sbi-secure-banking-update.xyz/login' },
        { label: 'Shortened Suspicious Link', text: 'https://bit.ly/claim-free-iphone-reward' },
        { label: 'Legitimate Site', text: 'https://www.google.com' },
      ],
    },
    [SCAN_MODES.MESSAGE]: {
      label: 'Paste the suspicious message',
      placeholder: 'Paste SMS, WhatsApp message, email, or DM here...',
      hint: 'Remove your real OTPs and private sensitive information first.',
      examples: [
        { label: 'Urgent Electricity Bill SMS', text: 'Dear Customer, your electricity power will be disconnected tonight 9:30 PM due to unpaid bill. Immediately contact officer at 9876543210 to update KYC.' },
        { label: 'Part-Time Work Scam', text: 'Earn Rs 5000 daily working from home! Just like 5 YouTube videos and get instant cash transfer in bank. Telegram @jobmanager now.' },
        { label: 'Friendly Normal Message', text: 'Hey, are we still meeting for lunch tomorrow at 1 PM?' },
      ],
    },
    [SCAN_MODES.OFFER]: {
      label: 'Describe the online offer',
      placeholder: 'Paste details of the offer, discounted product, or investment scheme...',
      hint: 'Include product price, discount claims, and website link if available.',
      examples: [
        { label: 'Fake iPhone ₹999 Deal', text: 'Exclusive Festival Deal: Brand New Apple iPhone 16 Pro Max only for Rs 999! Limited stock, 100% free shipping. Hurry only 2 units left!' },
        { label: 'Crypto Guaranteed 10% Return', text: 'Deposit $100 in our automated crypto bot and get guaranteed 10% daily ROI. Zero risk, double your money in 7 days!' },
      ],
    },
  };

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleTabChange = (newMode) => {
    setMode(newMode);
    setInputContent('');
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = inputContent.trim();

    if (!content) {
      showToast('Please enter content to analyze!');
      return;
    }

    if (mode === SCAN_MODES.URL && !isValidUrl(content)) {
      showToast('Enter a valid URL starting with http:// or https://');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const data = await scamService.analyze({ type: mode, content });
      setResult(data);

      const historyItem = {
        id: Date.now(),
        type: mode,
        preview: content.slice(0, 90),
        risk: data.riskLevel,
        summary: data.summary,
        reasons: data.reasons,
        recommendation: data.recommendation,
        date: new Date().toISOString(),
      };

      historyStorage.save(historyItem);
      if (onScanLogged) onScanLogged(historyItem);

      showToast('Analysis completed successfully!');
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } catch (err) {
      console.error(err);
      showToast('Failed to complete scan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    const textToCopy = `ScamShield AI Report\nRisk: ${result.riskLevel}\nSummary: ${result.summary}\nRecommendation: ${result.recommendation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Report copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputContent('');
    setResult(null);
  };

  const currentConfig = modeConfigs[mode];
  const riskClass = result ? classifyRisk(result.riskLevel) : null;
  const RiskIcon = riskClass ? riskClass.icon : null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <p className="text-[11px] font-bold tracking-widest text-indigo-400 uppercase">
          AI Scam Scanner
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Let's check that<span className="text-indigo-500">.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Paste the link, message or offer you want to review. ScamShield analyzes danger patterns in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Scanner Form */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => handleTabChange(SCAN_MODES.URL)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === SCAN_MODES.URL
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Website Link</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange(SCAN_MODES.MESSAGE)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === SCAN_MODES.MESSAGE
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message / SMS</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange(SCAN_MODES.OFFER)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === SCAN_MODES.OFFER
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Percent className="w-4 h-4" />
              <span>Offer / Deal</span>
            </button>
          </div>

          {/* Quick Examples */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400">Quick Test Examples:</span>
            <div className="flex flex-wrap gap-2">
              {currentConfig.examples.map((ex, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setInputContent(ex.text)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 hover:border-slate-600 text-[11px] text-slate-300 border border-slate-700/80 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{ex.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                {currentConfig.label}
              </label>

              <textarea
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder={currentConfig.placeholder}
                rows={5}
                maxLength={5000}
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-y font-mono"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{currentConfig.hint}</span>
                <span>{inputContent.length} / 5000</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-400">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Never paste real bank passwords, live OTPs, or debit card CVVs.</span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputContent.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning with ScamShield AI...</span>
                </>
              ) : (
                <>
                  <span>Analyze with ScamShield</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              What happens next?
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                  01
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Share content</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Paste suspicious URL or text above.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                  02
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">AI Threat Evaluation</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">ScamShield matches against known fraud signatures.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                  03
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Understand the result</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Review actionable risk rating and safety next steps.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs text-red-200/90 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-red-300 font-bold mb-1">Golden Safety Rule</strong>
              <p className="text-[11px] text-red-200/80 leading-relaxed">
                Legitimate banks and government officials will <b>NEVER</b> demand OTPs, UPI PINs, or urgent remote screen-share app installations (e.g. AnyDesk/TeamViewer).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Result */}
      {result && riskClass && (
        <div
          ref={resultRef}
          className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${riskClass.bgGlow} via-slate-900 to-slate-950 border ${riskClass.cardBorder} shadow-2xl space-y-6 animate-fade-in`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${riskClass.badgeClass} border flex items-center justify-center shadow-lg`}>
                <RiskIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Analysis Complete
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-black border ${riskClass.badgeClass}`}>
                    {riskClass.label}
                  </span>
                  {result.isLocalFallback && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      Smart AI Heuristic
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyResult}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Report'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Another</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluation Summary</h4>
            <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {result.reasons && result.reasons.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detected Signals & Warning Signs</h4>
              <ul className="space-y-2">
                {result.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Recommended Action
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {result.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

