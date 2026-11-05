// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for gym_health_alerts_monitoring; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_gym_health_alerts/gym_health_alerts_monitoring/utils/AdminGymsHealthAlertsMonitoringFormatters.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Formats Gym Health Alert timestamps using date-fns and the selected UI locale. @description Implements formatDateTime for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatDateTime = (value: string, locale: string): string => {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'dd MMM yyyy, hh:mm a', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }) : '—';
};
