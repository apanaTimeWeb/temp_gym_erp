import { format } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import { isValidUsageDate } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/utils/SuperadminBillingUsageMetersDashboardUtils';

/** Formats a validated ISO calendar date in the active locale using the approved date-fns contract. */
export function formatSuperadminUsageMeterBillingDate(value: string, locale: string, unavailableLabel: string): string {
  if (!isValidUsageDate(value)) return unavailableLabel;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return unavailableLabel;
  try { return format(date, 'PP', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }); } catch { return unavailableLabel; }
}
