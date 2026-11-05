// RESPONSIBILITY: Renders ManagerExpenseRegisterAndReportingMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerExpenseRegisterAndReportingContent } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingContent';

/** @description Main container for the Expenses module. Assembles Header, Toolbar, KPIs, Table, Chart, and Modal while feature hooks own query and UI state orchestration. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerExpenseRegisterAndReportingMain() {
  return <ManagerExpenseRegisterAndReportingContent />;
}
