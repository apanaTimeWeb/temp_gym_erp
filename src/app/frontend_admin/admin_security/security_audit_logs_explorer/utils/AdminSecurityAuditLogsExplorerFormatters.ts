// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for audit_logs_explorer; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_audit_logs/audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerFormatters.ts)

/**
 * @description AdminAuditLogsFormatters: Owns the AdminAuditLogsFormatters responsibility for the admin_audit_logs feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
/** RESPONSIBILITY: Formats Admin Audit Logs timestamps using the active UI locale. */
import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** @description Implements formatDateTime for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @param withSeconds - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatDateTime for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. @param withSeconds - Input used according to the utility’s declared TypeScript signature. */
formatDateTime = (value: string, locale: string, withSeconds = false): string => {
  const parsed = parseISO(value);
  if (!isValid(parsed)) return '—';
  const dateLocale = locale.toLowerCase().startsWith('hi') ? hi : enUS;
  return format(parsed, withSeconds ? 'dd MMM yyyy, hh:mm:ss a' : 'dd MMM yyyy, hh:mm a', { locale: dateLocale });
};
