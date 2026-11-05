/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingUsageMetersUtils owned by the superadmin_billing_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides presentation-safe usage meter calculations.
import { formatNumber } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/utils/SuperadminBillingUsageMetersDashboardNumberFormatter';

export const getProgressColor = (used: number, limit: number) => { const percent = limit > 0 ? (used / limit) * 100 : 0; if (percent >= 90)
    return 'fill-danger'; if (percent >= 75)
    return 'fill-warning'; return 'fill-primary'; };
/** @description Calculates bounded usage percentage for a metered resource. @dependencies Uses only numeric inputs; no server or React state. @edge-case Returns 0 when limit is zero or non-positive and clamps output to 0–100. */
export const getPercentage = (used: number, limit: number): number => Math.min(100, Math.max(0, limit > 0 ? (used / limit) * 100 : 0));
/** @description Formats storage usage using the module number formatter. @dependencies Module formatter only. @edge-case Preserves zero and finite numeric values without introducing unit labels. */
export const formatUsageStorage = (gigabytes: number): string => formatNumber(gigabytes);

/** Validates HTML date-input values before they become API query parameters. */
export const isValidUsageDate = (value: string): boolean => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
};
