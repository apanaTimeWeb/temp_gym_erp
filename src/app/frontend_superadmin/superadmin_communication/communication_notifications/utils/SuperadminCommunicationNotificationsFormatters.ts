'use client';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationMessagingFormatters owned by the superadmin_communication_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: date-fns
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Feature-local display formatting required by architecture Rule 80 and Rule 24.
import { parseISO } from 'date-fns';
const getLocale = (): string => {
  if (typeof document !== 'undefined' && document.documentElement.lang) return document.documentElement.lang;
  return 'en-IN';
};
/**
 * @description Provides messaging formatting or feature utility behavior for formatNumber.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 0 }).format(value);
}
/**
 * @description Provides messaging formatting or feature utility behavior for formatPercent1dp.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatPercent1dp(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return `${new Intl.NumberFormat(getLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;
}
/**
 * @description Provides messaging formatting or feature utility behavior for formatDateTime.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDateTime(value: string | number | Date | null | undefined, locale = getLocale()): string {
  if (value == null || value === '') return '—';
  const date = (() => { if (value instanceof Date) { return (value); } if (typeof value === 'number') { return (new Date(value)); } return (parseISO(String(value))); })();
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
}
/**
 * @description Provides messaging formatting or feature utility behavior for formatDate.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDate(value: string | number | Date | null | undefined, locale = getLocale()): string {
  if (value == null || value === '') return '—';
  const date = (() => { if (value instanceof Date) { return (value); } if (typeof value === 'number') { return (new Date(value)); } return (parseISO(String(value))); })();
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}
/**
 * @description Provides messaging formatting or feature utility behavior for formatDuration.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || Number.isNaN(seconds)) return '—';
  const total = Math.max(0, Math.round(seconds)); const h = Math.floor(total/3600); const m = Math.floor((total%3600)/60); const s = total%60;
  return (() => { if (h) { return (`${h}h ${m}m`); } if (m) { return (`${m}m ${s}s`); } return (`${s}s`); })();
}
/**
 * @description Provides messaging formatting or feature utility behavior for formatKPI.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatKPI(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}
/**
 * @description Provides messaging formatting or feature utility behavior for formatDecimal.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDecimal(value: number | null | undefined, maximumFractionDigits = 2): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits }).format(value);
}

/**
 * @description Provides messaging formatting or feature utility behavior for superadminMessagingDisplayValue.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function superadminMessagingDisplayValue(value: string | number | null | undefined, fallback = '—'): string {
  if (value == null || value === '') return fallback;
  return String(value);
}

/**
 * @description Provides messaging formatting or feature utility behavior for superadminMessagingMaskPhone.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function superadminMessagingMaskPhone(value: string | null | undefined): string {
  if (!value) return '—';
  const digits = value.replace(/\D/g, '');
  if (digits.length < 8) return '—';
  const visibleStart = digits.slice(0, 2);
  const visibleEnd = digits.slice(-4);
  return `${visibleStart}${'*'.repeat(Math.max(1, digits.length - 6))}${visibleEnd}`;
}
