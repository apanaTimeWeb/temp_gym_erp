// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for expense_register_and_reporting.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerExpenseRegisterAndReportingHarness } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/tests/harness/ManagerExpenseRegisterAndReportingHarness';

export function renderManagerExpenseRegisterAndReporting(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerExpenseRegisterAndReportingHarness>{children}</ManagerExpenseRegisterAndReportingHarness> });
}
