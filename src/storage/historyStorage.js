import { STORAGE_KEYS } from '../config/constants';

/**
 * Storage Abstraction for Local Scan History
 */
export const historyStorage = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.warn('Unable to read history from localStorage:', err);
      return [];
    }
  },

  save(scanItem) {
    try {
      const current = this.getAll();
      const updated = [scanItem, ...current.filter((i) => i.id !== scanItem.id)].slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('Failed to persist scan history:', err);
      return this.getAll();
    }
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEYS.SCAN_HISTORY);
      return [];
    } catch (err) {
      console.error('Failed to clear scan history:', err);
      return [];
    }
  },

  exportAsJson() {
    const list = this.getAll();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `scamshield_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },
};

