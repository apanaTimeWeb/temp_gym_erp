// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for members_directory; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_members/members_directory/utils/AdminMembersDirectoryFormatters.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Locale-aware numeric/date formatters owned by the Admin Members feature. @description Implements formatNumber for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatNumber = (value: number, locale: string): string => new Intl.NumberFormat(locale).format(value);

const dateLocale = (locale: string) => locale.toLowerCase().startsWith('hi') ? hi : enUS;
/** @description Implements formatDate for the owning feature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. @returns The typed result declared by this utility’s signature. */
export const /** @description Implements formatDate for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the utility’s declared TypeScript signature. @param locale - Input used according to the utility’s declared TypeScript signature. */
formatDate = (value: Date | string | number, locale: string): string => {
  const date = typeof value === 'string' ? parseISO(value) : value instanceof Date ? value : new Date(value);
  return isValid(date) ? format(date, 'dd MMM yyyy', { locale: dateLocale(locale) }) : '—';
};
