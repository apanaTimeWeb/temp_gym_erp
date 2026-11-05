import {
  MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENTS_VIEW,
  MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_SUMMARY_VIEW,
  MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS,
} from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_view.constants';
import type { ManagerFinancePaymentsAndSummaryViewId } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_view.types';

/** Resolves canonical view IDs and legacy tab bookmarks without trusting arbitrary query input. */
export function resolveManagerFinancePaymentsAndSummaryView(requestedView: string | null, legacyTab: string | null = null): ManagerFinancePaymentsAndSummaryViewId {
  if (requestedView && (MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_IDS as readonly string[]).includes(requestedView)) return requestedView as ManagerFinancePaymentsAndSummaryViewId;
  if (legacyTab === 'Summary' || legacyTab === MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_SUMMARY_VIEW) return MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_SUMMARY_VIEW;
  if (legacyTab === 'Payments' || legacyTab === MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENTS_VIEW) return MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENTS_VIEW;
  return MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENTS_VIEW;
}
