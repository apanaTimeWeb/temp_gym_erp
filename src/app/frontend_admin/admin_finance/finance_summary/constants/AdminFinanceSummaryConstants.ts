// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: AdminFinanceConstants → useAdminFinancePnlLogic → P&L components

// period labels, and table headers. Replace with API calls here when backend is ready.


export const FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI: { bg: 'bg-pay-upi-bg', text: 'text-pay-upi-text' },
  Cash: { bg: 'bg-pay-cash-bg', text: 'text-pay-cash-text' },
  Card: { bg: 'bg-pay-card-bg', text: 'text-pay-card-text' },
  NetBanking: { bg: 'bg-pay-bank-bg', text: 'text-pay-bank-text' },
};

export const FINANCE_PAYMENT_STATUS_LABEL_KEYS: Record<string, string> = { PAID: 'finance.AdminAuditRepair.paid', DUE: 'finance.AdminAuditRepair.due', REFUNDED: 'finance.AdminAuditRepair.refunded' };

export const FINANCE_PAYMENT_METHOD_LABEL_KEYS: Record<string, string> = { UPI: 'finance.AdminAuditRepair.upi', Cash: 'finance.AdminAuditRepair.cash', Card: 'finance.AdminAuditRepair.card', NetBanking: 'finance.AdminAuditRepair.netBanking' };

export const FINANCE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PAID: { bg: 'bg-success-bg', text: 'text-success' },
  DUE: { bg: 'bg-danger-bg', text: 'text-danger' },
  REFUNDED: { bg: 'bg-warning-bg', text: 'text-warning' },
};



export const FINANCE_RECORD_STATUSES = { COMPLETED: 'COMPLETED', PENDING: 'PENDING' } as const;

export const FINANCE_PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking'] as const;

export const FINANCE_PAYMENT_STATUSES = ['PAID', 'DUE', 'REFUNDED'] as const;

export const PAYMENTS_TABLE_HEADERS = ['invoiceNo', 'member', 'amount', 'method', 'status', 'paidAt'] as const;
export const FINANCE_PAYMENT_TABLE_HEADER_LABEL_KEYS: Record<(typeof PAYMENTS_TABLE_HEADERS)[number], string> = {
  invoiceNo: 'finance.AdminAuditRepair.invoiceNo',
  member: 'finance.AdminAuditRepair.member',
  amount: 'finance.AdminAuditRepair.amount',
  method: 'finance.AdminAuditRepair.method',
  status: 'finance.AdminAuditRepair.status',
  paidAt: 'finance.AdminAuditRepair.paidAt',
};
export const FINANCE_TABS = ['Payments', 'Expenses', 'Summary'] as const;

export const EXPENSE_CATEGORIES = ['Rent', 'Salaries', 'Utilities', 'Equipment', 'Marketing', 'Maintenance', 'Supplies', 'Other'] as const;

export const FINANCE_ITEMS_PER_PAGE = 10;

export const FINANCE_DATE_FILTER_PRESETS = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'] as const;
export const FINANCE_TAB_LABEL_KEYS: Record<(typeof FINANCE_TABS)[number], string> = {
  Payments: 'finance.admin_finance_tabs.payments',
  Expenses: 'finance.admin_finance_tabs.expenses',
  Summary: 'finance.admin_finance_tabs.summary',
};
export const FINANCE_PAYMENT_METHOD_OPTIONS = [
  { value: 'All', labelKey: 'finance.admin_finance_tabs.remaining_allMethods' },
  { value: 'UPI', labelKey: 'finance.AdminAuditRepair.upi' },
  { value: 'Cash', labelKey: 'finance.AdminAuditRepair.cash' },
  { value: 'Card', labelKey: 'finance.AdminAuditRepair.card' },
  { value: 'NetBanking', labelKey: 'finance.AdminAuditRepair.netBanking' },
] as const;
export const FINANCE_PAYMENT_STATUS_OPTIONS = [
  { value: 'All', labelKey: 'finance.admin_finance_tabs.remaining_allStatuses' },
  { value: 'PAID', labelKey: 'finance.AdminAuditRepair.paid' },
  { value: 'DUE', labelKey: 'finance.AdminAuditRepair.due' },
  { value: 'REFUNDED', labelKey: 'finance.AdminAuditRepair.refunded' },
] as const;
export const FINANCE_EXPENSE_CATEGORY_LABEL_KEYS: Record<(typeof EXPENSE_CATEGORIES)[number], string> = {
  Rent: 'finance.AdminAuditRepair.rent',
  Salaries: 'finance.AdminAuditRepair.salaries',
  Utilities: 'finance.AdminAuditRepair.utilities',
  Equipment: 'finance.AdminAuditRepair.equipment',
  Marketing: 'finance.AdminAuditRepair.marketing',
  Maintenance: 'finance.AdminAuditRepair.maintenance',
  Supplies: 'finance.AdminAuditRepair.supplies',
  Other: 'finance.AdminAuditRepair.other',
};

export const FINANCE_DATE_FILTER_OPTION_LABEL_KEYS = [
  { value: 'this_month', labelKey: 'finance.AdminAuditRepair.thisMonth' },
  { value: 'last_month', labelKey: 'finance.AdminAuditRepair.lastMonth' },
  { value: 'last_3_months', labelKey: 'finance.AdminAuditRepair.last3Months' },
  { value: 'last_6_months', labelKey: 'finance.AdminAuditRepair.last6Months' },
  { value: 'this_year', labelKey: 'finance.AdminAuditRepair.thisYear' },
  { value: 'monthly', labelKey: 'finance.AdminAuditRepair.monthlyAllTime' },
  { value: 'yearly', labelKey: 'finance.AdminAuditRepair.yearlyAllTime' },
  { value: 'custom', labelKey: 'finance.AdminAuditRepair.customRange' },
] as const;

export const FINANCE_EXPENSE_ITEMS_PER_PAGE = 8;
export const FINANCE_EXPENSE_CATEGORY_STYLES: Record<(typeof EXPENSE_CATEGORIES)[number], string> = {
  Rent: 'bg-info text-on-info',
  Salaries: 'bg-warning-bg text-warning',
  Utilities: 'bg-primary-subtle text-primary',
  Equipment: 'bg-purple-bg text-purple-text',
  Marketing: 'bg-success-bg text-success',
  Maintenance: 'bg-danger-bg text-danger',
  Supplies: 'bg-info text-on-info',
  Other: 'bg-input text-secondary',
};
