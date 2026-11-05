// RESPONSIBILITY: Server Component entry point for the Coupons page.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_coupons/coupons_management/page.tsx)

import AdminCouponsMain from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/main_view/AdminBillingCouponsManagementMain';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementConfirmProvider';

/**
 * CouponsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function CouponsPage() {
  return (
      <AdminNavigationLayoutConfirmProvider><AdminCouponsMain /></AdminNavigationLayoutConfirmProvider>
  );
}
