import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_view.constants';

// RESPONSIBILITY: Provides UI-safe constants and semantic style maps for Finance.
/**
 * @description Provides the ManagerFinancePaymentsAndSummarySharedConstants implementation for the finance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const FINANCE_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI: { bg: 'bg-primary-subtle', text: 'text-primary' },
  Cash: { bg: 'bg-success-bg', text: 'text-success-text' },
  Card: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  NetBanking: { bg: 'bg-input', text: 'text-text-secondary' },
};

export const FINANCE_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PAID: { bg: 'bg-success-bg', text: 'text-success-text' },
  DUE: { bg: 'bg-danger-bg', text: 'text-danger-text' },
  PENDING: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  PARTIAL: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  REFUNDED: { bg: 'bg-warning-bg', text: 'text-warning-text' },
};

export const FINANCE_PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'NetBanking', 'Cheque', 'Other'] as const;
export const PAYMENTS_TABLE_HEADERS = ['Invoice No', 'Member', 'Plan', 'Amount', 'Method', 'Status', 'Date', 'Actions'] as const;
export const FINANCE_TABS = MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS;
export const FINANCE_ALL_FILTER = 'ALL' as const;

export const FINANCE_PAYMENT_STATUS_VALUES = ['PAID', 'PENDING', 'DUE', 'REFUNDED', 'PARTIAL'] as const;

export const FINANCE_PENDING_STATUS = 'PENDING' as const;

export const FINANCE_STATUS_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_STATUS' },
  { value: 'PAID', labelKey: 'COPY_PAID' },
  { value: FINANCE_PENDING_STATUS, labelKey: 'COPY_PENDING' },
  { value: 'DUE', labelKey: 'COPY_DUE' },
  { value: 'PARTIAL', labelKey: 'COPY_PARTIAL' },
  { value: 'REFUNDED', labelKey: 'COPY_REFUNDED' },
] as const;

export const FINANCE_METHOD_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_METHODS' },
  { value: 'UPI', labelKey: 'COPY_UPI' },
  { value: 'Cash', labelKey: 'COPY_CASH' },
  { value: 'Card', labelKey: 'COPY_CARD' },
  { value: 'NetBanking', labelKey: 'COPY_NETBANKING' },
  { value: 'Cheque', labelKey: 'TEXT_CHEQUE' },
  { value: 'Other', labelKey: 'TEXT_OTHER' },
] as const;

export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI: { bg: 'bg-primary-subtle', text: 'text-primary' },
  Cash: { bg: 'bg-success-bg', text: 'text-success-text' },
  Card: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  NetBanking: { bg: 'bg-input', text: 'text-text-secondary' },
};

export const FINANCE_PAYMENT_METHOD_VALUES = ['UPI', 'Cash', 'Card', 'NetBanking', 'Cheque', 'Other'] as const;
