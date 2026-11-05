// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerFinancePaymentsAndSummaryContent } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryContent';

/** @description Orchestrator for the Finance module — KPIs, tabbed Payments table + Summary chart. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerFinancePaymentsAndSummaryMain() {
  return <ManagerFinancePaymentsAndSummaryContent />;
}
