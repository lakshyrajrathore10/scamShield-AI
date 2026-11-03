import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import { RISK_LEVELS } from '../config/constants';

export function classifyRisk(risk) {
  const normalized = String(risk || '').toUpperCase();

  if (normalized.includes('SAFE') || normalized.includes('LOW')) {
    return {
      level: RISK_LEVELS.SAFE,
      label: 'LOW RISK',
      color: 'emerald',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      cardBorder: 'border-emerald-500/30',
      bgGlow: 'from-emerald-950/40',
      icon: ShieldCheck,
    };
  }

  if (
    normalized.includes('HIGH') ||
    normalized.includes('DANGER') ||
    normalized.includes('SCAM') ||
    normalized.includes('MALICIOUS')
  ) {
    return {
      level: RISK_LEVELS.HIGH,
      label: 'HIGH RISK',
      color: 'red',
      badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20',
      cardBorder: 'border-red-500/30',
      bgGlow: 'from-red-950/40',
      icon: AlertTriangle,
    };
  }

  return {
    level: RISK_LEVELS.SUSPICIOUS,
    label: 'NEEDS CAUTION',
    color: 'amber',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    cardBorder: 'border-amber-500/30',
    bgGlow: 'from-amber-950/40',
    icon: Info,
  };
}

