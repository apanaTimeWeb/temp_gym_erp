// RESPONSIBILITY: Guards Sales Pending Payments WhatsApp destinations and message encoding.
import { describe, expect, it } from 'vitest';
import { buildAdminSalesWhatsAppWebUrl, normalizeAdminSalesPendingPaymentsWhatsAppNumber } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsExternalUrlConstants';

describe('Sales Pending Payments WhatsApp destination', () => {
  it('uses the existing 91 prefix exactly once for national and prefixed input', () => {
    expect(buildAdminSalesWhatsAppWebUrl('9876543210', 'Pay now')).toBe('https://wa.me/919876543210?text=Pay%20now');
    expect(buildAdminSalesWhatsAppWebUrl('+91 98765 43210', 'Pay now')).toBe('https://wa.me/919876543210?text=Pay%20now');
    expect(buildAdminSalesWhatsAppWebUrl('919876543210', '₹ 10 & more')).toBe('https://wa.me/919876543210?text=%E2%82%B9%2010%20%26%20more');
  });
  it.each(['', '123', '12345678', '987654321012345', 'ab9876543210', '+1 9876543210', 'https://evil.example', '+91+9876543210'])('refuses invalid phone input %s', (value) => {
    expect(normalizeAdminSalesPendingPaymentsWhatsAppNumber(value)).toBe('');
    expect(buildAdminSalesWhatsAppWebUrl(value, 'Reminder')).toBe('');
  });
});
