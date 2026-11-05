// RESPONSIBILITY: Converts API coupon dates into HTML date-input values and localized display strings.
import { format as formatDateValue, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
/** Converts an API ISO date to the yyyy-MM-dd form required by an HTML date input. */
/**
 * @description Provides coupons formatting or feature utility behavior for formatSuperadminCouponDateForInput.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
function isValidDateOnly(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, y, m, d] = match; const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  return date.getUTCFullYear() === Number(y) && date.getUTCMonth() + 1 === Number(m) && date.getUTCDate() === Number(d);
}

export function formatSuperadminCouponDateForInput(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return isValidDateOnly(value) ? value : '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Returns today's date in yyyy-MM-dd format for input min/max */
/**
 * @description Provides coupons formatting or feature utility behavior for getSuperadminBillingCouponsTodayISODate.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getSuperadminBillingCouponsTodayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Formats a coupon calendar date without shifting date-only API values through UTC. */
export function formatSuperadminBillingCouponsDisplayDate(value: string, locale: string): string {
  if (!value) return '—';
  let date: Date;
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (dateOnly) {
    if (!isValidDateOnly(value)) return '—';
    date = new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
  } else {
    date = parseISO(value);
  }
  if (Number.isNaN(date.getTime())) return '—';
  const dateFnsLocale = locale.toLowerCase().startsWith('hi') ? hi : enUS;
  return formatDateValue(date, 'dd MMM yyyy', { locale: dateFnsLocale });
}
