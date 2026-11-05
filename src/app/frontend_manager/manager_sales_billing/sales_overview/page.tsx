// Autonomous leaf route for manager_sales.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewMain';
import Loading from '@/app/frontend_manager/manager_sales_billing/sales_overview/loading';

export const dynamic = 'force-dynamic';

export default function ManagerSalesOverviewPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}
