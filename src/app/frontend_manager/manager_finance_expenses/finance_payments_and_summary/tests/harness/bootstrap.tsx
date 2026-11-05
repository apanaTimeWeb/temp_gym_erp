// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for finance_payments_and_summary.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerFinancePaymentsAndSummaryHarness } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/tests/harness/ManagerFinancePaymentsAndSummaryHarness';

export function renderManagerFinancePaymentsAndSummary(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerFinancePaymentsAndSummaryHarness>{children}</ManagerFinancePaymentsAndSummaryHarness> });
}
