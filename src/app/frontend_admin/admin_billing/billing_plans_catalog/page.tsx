// RESPONSIBILITY: Server route entry point for Admin Plans. Data is owned by the client TanStack Query layer.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_plans/plans_catalog/page.tsx)

import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/feedback/AdminBillingPlansCatalogConfirmProvider';
import AdminPlansMain from '@/app/frontend_admin/admin_billing/billing_plans_catalog/components/main_view/AdminBillingPlansCatalogMain';

/** Plans route entry point. Server rendering intentionally does not prefetch because no server-compatible module mock transport is supplied. */
export default function PlansPage() {
  return <AdminNavigationLayoutConfirmProvider><AdminPlansMain /></AdminNavigationLayoutConfirmProvider>;
}
