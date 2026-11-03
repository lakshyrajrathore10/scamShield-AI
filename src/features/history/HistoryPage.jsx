import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Search, 
  Download, 
  Clock, 
  X 
} from 'lucide-react';
import { classifyRisk } from '../../utils/riskClassifier';
import { formatDate } from '../../utils/formatters';
import { historyStorage } from '../../storage/historyStorage';

export default function HistoryPage({ history, onClearHistory, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [selectedScan, setSelectedScan] = useState(null);

  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      item.preview?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterRisk === 'ALL') return matchesSearch;
    const details = classifyRisk(item.risk);
    if (filterRisk === 'HIGH') return matchesSearch && details.level === 'HIGH';
    if (filterRisk === 'CAUTION') return matchesSearch && details.level === 'SUSPICIOUS';
    if (filterRisk === 'SAFE') return matchesSearch && details.level === 'SAFE';
    return matchesSearch;
  });

  const handleExport = () => {
    if (history.length === 0) {
      showToast('No history to export!');
      return;
    }
    historyStorage.exportAsJson();
    showToast('Scan history exported successfully!');
  };

  const selectedDetails = selectedScan ? classifyRisk(selectedScan.risk) : null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Scan History<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your previous threat assessments recorded in this browser session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={onClearHistory}
                className="px-3 py-1.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 text-xs font-semibold border border-red-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search preview or summary..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'HIGH', 'CAUTION', 'SAFE'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterRisk(type)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterRisk === type
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              {type === 'ALL' ? 'All Scans' : type}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
        {filteredHistory.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {filteredHistory.map((item) => {
              const details = classifyRisk(item.risk);
              const Icon = details.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedScan(item)}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-800/30 px-3 rounded-2xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className={`p-2 rounded-xl ${details.badgeClass} border mt-0.5 shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                          {item.type || 'URL'}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.date)}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate group-hover:text-indigo-300 transition-colors font-mono">
                        {item.preview}
                      </p>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${details.badgeClass}`}>
                      {details.label}
                    </span>
                    <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                      Details →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-500 flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No scan records found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm || filterRisk !== 'ALL'
                ? 'No scans match your current filter or search keyword.'
                : 'Start a scan from the Scam Scanner tab to populate your history log.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedScan && selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedScan(null)}
              className="absolute top-6 right-6 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Historical Scan Record
              </span>
              <h3 className="text-xl font-bold text-white">Threat Assessment Report</h3>
              <p className="text-xs text-slate-500">
                Logged on {formatDate(selectedScan.date)}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Analyzed Content</span>
              <p className="text-xs font-mono text-slate-200 break-all leading-relaxed">
                {selectedScan.preview}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Assessed Risk:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedDetails.badgeClass}`}>
                {selectedDetails.label}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Summary</span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedScan.summary}
              </p>
            </div>

            {selectedScan.reasons && selectedScan.reasons.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Warning Signs</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedScan.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedScan.recommendation && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase">Recommendation</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedScan.recommendation}
                </p>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setSelectedScan(null)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

