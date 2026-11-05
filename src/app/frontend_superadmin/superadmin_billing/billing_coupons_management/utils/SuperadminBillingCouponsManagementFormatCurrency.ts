/**
 * Formats a monetary amount from its smallest unit to a locale-aware display string.
 * @param amount  Integer in smallest unit (e.g., 9999 for ₹99.99)
 * @param currency ISO 4217 currency code (e.g., 'INR', 'USD', 'EUR')
 * @param locale  BCP 47 locale string (e.g., 'en-IN', 'nl-NL', 'en-US')
 */
import { getSuperadminBillingCouponsCurrencyDivisor } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDiscountValueUtils';

export const SuperadminBillingCouponsFormatCurrency = (amount: number, currency: string, locale: string): string => {
  if (!Number.isFinite(amount)) return '—';
  try {
    const divisor = getSuperadminBillingCouponsCurrencyDivisor(currency);
    const digits = Math.round(Math.log10(divisor));
    return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(amount / divisor);
  } catch { return '—'; }
};
