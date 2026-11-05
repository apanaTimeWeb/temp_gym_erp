// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for subscriptions_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_subscription_invoices/utils/AdminSubscriptionsManagementFormatters.ts)

import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Formats Admin Subscriptions date values using date-fns and the selected UI locale. @description Implements formatDate for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatDate = (value: string, locale: string): string => {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'dd MMM yyyy', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }) : '—';
};
