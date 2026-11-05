import {
  MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_LEGACY_TAB_QUERY_PARAM,
  MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_QUERY_PARAM,
} from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_view.constants';
import type { ManagerFinancePaymentsAndSummaryViewId } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_view.types';

/** Updates only the screen selector while retaining unrelated query state and removing the legacy alias. */
export function ManagerFinancePaymentsAndSummaryBuildViewSearchParams(currentSearch: string, nextView: ManagerFinancePaymentsAndSummaryViewId): string {
  const params = new URLSearchParams(currentSearch);
  params.set(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_VIEW_QUERY_PARAM, nextView);
  params.delete(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_LEGACY_TAB_QUERY_PARAM);
  return params.toString();
}
