'use client';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsMigrationsFormatters owned by the superadmin_system_ops_migrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: date-fns, date-fns/locale
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Feature-local display formatting required by architecture Rule 80 and Rule 24.
import { format as formatDateValue, parseISO } from 'date-fns';
import { enIN, hi } from 'date-fns/locale';
const getLocale = (): string => {
  if (typeof document !== 'undefined' && document.documentElement.lang) return document.documentElement.lang;
  return 'en-IN';
};
/**
 * @description Provides system ops migrations formatting or feature utility behavior for formatNumber.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 0 }).format(value);
}
/**
 * @description Provides system ops migrations formatting or feature utility behavior for formatPercent1dp.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatPercent1dp(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return `${new Intl.NumberFormat(getLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;
}
/**
 * @description Provides system ops migrations formatting or feature utility behavior for formatDateTime.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDateTime(value: string | Date | null | undefined): string {
  if (value == null || value === '') return '—';
  const date = value instanceof Date ? value : parseISO(value);
  if (Number.isNaN(date.getTime())) return '—';
  return formatDateValue(date, 'dd MMM yyyy, HH:mm', { locale: getLocale().toLowerCase().startsWith('hi') ? hi : enIN });
}
/**
 * @description Provides system ops migrations formatting or feature utility behavior for formatDate.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDate(value: string | Date | null | undefined): string {
  if (value == null || value === '') return '—';
  const date = value instanceof Date ? value : parseISO(value);
  if (Number.isNaN(date.getTime())) return '—';
  return formatDateValue(date, 'dd MMM yyyy', { locale: getLocale().toLowerCase().startsWith('hi') ? hi : enIN });
}
/**
 * @description Provides system ops migrations formatting or feature utility behavior for formatDuration.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || Number.isNaN(seconds)) return '—';
  const total = Math.max(0, Math.round(seconds)); const h = Math.floor(total/3600); const m = Math.floor((total%3600)/60); const s = total%60;
  return (() => { if (h) { return (`${h}h ${m}m`); } if (m) { return (`${m}m ${s}s`); } return (`${s}s`); })();
}
/**
 * @description Provides system ops migrations formatting or feature utility behavior for formatKPI.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatKPI(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}
/**
 * @description Provides system ops migrations formatting or feature utility behavior for formatDecimal.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatDecimal(value: number | null | undefined, maximumFractionDigits = 2): string {
  if (value == null || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(getLocale(), { maximumFractionDigits }).format(value);
}
