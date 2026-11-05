// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for blacklist_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_blacklist/blacklist_management/utils/AdminMembersBlacklistManagementDateFormatter.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Formats API ISO dates using the feature's supported locales; invalid/missing dates use a safe placeholder. @description Implements formatAdminBlacklistDate for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @param locale - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function formatAdminBlacklistDate(value: string | null | undefined, locale: string): string {
  if (!value) return '—';
  const parsed = parseISO(value);
  if (!isValid(parsed)) return '—';
  return format(parsed, 'PP', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS });
}
