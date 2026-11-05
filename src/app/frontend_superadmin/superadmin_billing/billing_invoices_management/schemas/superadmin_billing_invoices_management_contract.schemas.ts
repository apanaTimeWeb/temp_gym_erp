/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
const supportedValuesOf = (Intl as typeof Intl & { supportedValuesOf?: (key: 'currency') => string[] }).supportedValuesOf;
const supportedCurrencyValues = new Set(
    typeof supportedValuesOf === 'function' ? supportedValuesOf('currency') : [],
);
const currencyDisplayNames = typeof Intl.DisplayNames === 'function'
    ? new Intl.DisplayNames(['en'], { type: 'currency' })
    : null;

export function isSupportedCurrencyCodeFallback(currency: string): boolean {
  if (!currencyDisplayNames) return false;
  const displayName = currencyDisplayNames.of(currency);
  return Boolean(displayName && displayName !== currency && displayName !== 'Unknown Currency');
}

function isSupportedCurrencyCode(currency: string): boolean {
  if (supportedCurrencyValues.size > 0) return supportedCurrencyValues.has(currency);
  return isSupportedCurrencyCodeFallback(currency);
}
function hasValidCalendarPrefix(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return true;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return date.getUTCFullYear() === Number(year) && date.getUTCMonth() + 1 === Number(month) && date.getUTCDate() === Number(day);
}

export const SuperadminBillingInvoicesCurrencyCodeSchema = z.string()
    .regex(/^[A-Z]{3}$/, 'Currency must be a three-letter ISO code')
    .refine(isSupportedCurrencyCode, 'Currency code is not a supported ISO currency');

export const SaaSInvoiceSchema = z.object({
    id: z.string(),
    tenantId: z.string(),
    tenantName: z.string(),
    amount: z.number().int().nonnegative(),
    currency: SuperadminBillingInvoicesCurrencyCodeSchema,
    status: z.enum(['PAID', 'PENDING', 'FAILED', 'OVERDUE']),
    issuedAt: z.string(),
    dueDate: z.string().refine((value) => value.trim().length > 0 && hasValidCalendarPrefix(value) && Number.isFinite(Date.parse(value)), 'Invoice due date must be a valid date or date-time'),
    paidAt: z.string().optional(),
    paymentMethod: z.string().optional(),
    invoiceType: z.enum(['RECURRING', 'ONE_TIME', 'SETUP_FEE']),
    planName: z.string(),
    taxId: z.string().optional(),
});
/** Existing frontend request contract: the form sends a positive major-unit amount. The backend DTO is not supplied, so wire-unit conversion remains blocked pending that contract. */
export const CreateManualPaymentDtoSchema = z.object({
    gymId: z.string().min(1),
    amount: z.number().finite().positive().refine((amount) => Math.abs(amount * 100 - Math.round(amount * 100)) <= 1e-8),
    planName: z.string().min(1),
    currency: SuperadminBillingInvoicesCurrencyCodeSchema.optional(),
});
export const InvoiceLineItemSchema = z.object({
    description: z.string(),
    amount: z.number(),
    quantity: z.number().optional(),
}).passthrough();
export const SuperadminBillingInvoicesTenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string(),
});
