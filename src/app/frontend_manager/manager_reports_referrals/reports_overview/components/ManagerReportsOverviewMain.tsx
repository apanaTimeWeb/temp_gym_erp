// RESPONSIBILITY: Renders ManagerReportsOverviewMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerReportsOverviewContent } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewContent';

/** @description Orchestrator for the Reports module — KPIs, tab switcher, charts, table, and refresh-only summary controls. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsOverviewMain() {
  return <ManagerReportsOverviewContent />;
}
