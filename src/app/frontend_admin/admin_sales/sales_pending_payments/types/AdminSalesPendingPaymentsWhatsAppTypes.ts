// RESPONSIBILITY: Defines the receipt payload contract consumed by the Admin Sales WhatsApp formatter.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_pending_sales_payments/types/AdminSalesAnalyticsWhatsAppTypes.ts)

export interface AdminSalesWhatsAppReceiptData {
  title: string;
  subtitle: string;
  date: string;
  customerInfo: Record<string, string>;
  sections: Array<{
    title: string;
    items: Record<string, string>;
  }>;
  footer: string;
}

