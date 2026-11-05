// RESPONSIBILITY: Builds feature-owned WhatsApp web destinations for Sales follow-up actions.
// DATA FLOW: feature recipient phone/message → validated India WhatsApp number → external URL.
import { ADMIN_SALES_EXTERNAL_URLS } from '@/app/frontend_admin/admin_sales/sales_pending_payments/config/admin_sales_pending_payments.url_config';

/** The configured wa.me base already contains country prefix 91. Reject unknown country numbers. */
export function normalizeAdminSalesPendingPaymentsWhatsAppNumber(phone: string): string {
  if (typeof phone !== 'string' || !/^\+?[0-9\s().-]+$/.test(phone.trim())) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return '';
}

export function buildAdminSalesWhatsAppWebUrl(phone: string, message: string): string {
  const localNumber = normalizeAdminSalesPendingPaymentsWhatsAppNumber(phone);
  return localNumber ? `${ADMIN_SALES_EXTERNAL_URLS.whatsappWeb}${localNumber}?text=${encodeURIComponent(message)}` : '';
}
