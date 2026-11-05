// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for sales_analytics; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_pending_sales_payments/utils/AdminSalesAnalyticsWhatsAppFormatter.ts)

import type { AdminSalesWhatsAppReceiptData } from '@/app/frontend_admin/admin_sales/sales_pending_payments/types/AdminSalesPendingPaymentsWhatsAppTypes';

/**
 * Builds a plain-text WhatsApp payment reminder from the exact fields used by the Sales pending-payment flow.
 * @remarks The formatter stays inside the Sales feature so message composition cannot create a global business dependency.
 */
/** Formats the supplied receipt payload as readable plain text for the WhatsApp handoff. */
export const AdminSalesWhatsAppFormatter = {
  formatReceipt(payload: AdminSalesWhatsAppReceiptData): string {
    const lines = [payload.title, payload.subtitle, payload.date, ''];
    Object.entries(payload.customerInfo).forEach(([label, value]) => lines.push(`${label}: ${value}`));
    payload.sections.forEach((section) => {
      lines.push('', section.title);
      Object.entries(section.items).forEach(([label, value]) => lines.push(`${label}: ${value}`));
    });
    lines.push('', payload.footer);
    return lines.join('\n');
  },
} as const;
