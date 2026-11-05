// RESPONSIBILITY: Renders ManagerSalesOverviewMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerSalesOverviewContent } from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewContent';

/** @description Provides the implementation for ManagerSalesOverviewMain.tsx functionality within its module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerSalesOverviewMain() {
  return <ManagerSalesOverviewContent />;
}
