// RESPONSIBILITY: Renders ManagerSalesOverviewTabs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { SALES_TABS, SALES_TAB_TO_VIEW, SALES_VIEW_TO_TAB } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_shared.constants';
import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';


/** @description Provides the implementation for ManagerSalesOverviewTabs.tsx functionality within its module. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerSalesOverviewTabs() {
 const { view, setView } = useManagerSalesOverviewLogic();
 const activeTab = SALES_VIEW_TO_TAB[view];

 return (
 <div className="border-b border-border flex overflow-x-auto bg-card">
 {SALES_TABS.map((t, mapIndex) => (
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-5 py-3.5 text-sm font-medium motion-safe:transition-all border-b-2 whitespace-nowrap ${
 activeTab === t
 ? 'text-primary bg-primary-subtle border-primary'
 : 'border-transparent text-text-secondary hover:text-primary'
 } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_sales-sales-managersalestabs-button-primary-${mapIndex}`}
 key={t}
 onClick={() => setView(SALES_TAB_TO_VIEW[t])}

  type="button">
 {t}
 </button>
 ))}
 </div>
 );
}
