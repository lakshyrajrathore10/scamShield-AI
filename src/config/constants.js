/**
 * Application Constants & Configuration
 * Google/Enterprise Standard Config Directory
 */

export const APP_CONFIG = {
  NAME: 'ScamShield AI',
  TAGLINE: 'Online Safety & Digital Fraud Protection Desk',
  VERSION: '1.0.0',
  COPYRIGHT_YEAR: '2026',
  EMERGENCY_HELPLINE: '1930',
  NATIONAL_PORTAL_URL: 'https://cybercrime.gov.in',
};

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  ANALYZE_SCAM: '/scams/analyze',
};

export const SCAN_MODES = {
  URL: 'url',
  MESSAGE: 'message',
  OFFER: 'offer',
};

export const VIEWS = {
  LANDING: 'landing',
  OVERVIEW: 'home',
  SCANNER: 'scanner',
  HISTORY: 'history',
  SAFETY: 'safety',
};

export const RISK_LEVELS = {
  HIGH: 'HIGH',
  SUSPICIOUS: 'SUSPICIOUS',
  SAFE: 'SAFE',
};

export const STORAGE_KEYS = {
  SCAN_HISTORY: 'scamshield_history_v1',
};

