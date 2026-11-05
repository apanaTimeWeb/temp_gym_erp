"use client";
// RESPONSIBILITY: Renders the empty state for the Coupons table when no coupons match filters.
// DATA FLOW: feature data/state and user input → AdminBillingCouponsManagementEmptyState → accessible UI/events routed to owning hooks (admin_coupons/coupons_management/components/empty_state/AdminBillingCouponsManagementEmptyState.tsx)

import { useTranslations } from 'next-intl';

import { Tag } from 'lucide-react';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementLogic';

/**
 * AdminBillingCouponsManagementEmptyState renders the admin coupons empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingCouponsManagementEmptyState: Renders the empty state for the Coupons table when no coupons match filters.
 * @dependencies Consumes useAdminCouponsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingCouponsManagementEmptyState() {
  const t = useTranslations();

  const { openAdd } = useAdminCouponsLogic();
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-primary-subtle flex items-center justify-center">
        <Tag size={18} className="text-primary"  strokeWidth={2}/>
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-primary">{t('coupons.admin_coupons_empty_state.text_6511a4c55d')}</p>
        <p className="text-sm text-secondary mt-1">{t('coupons.admin_coupons_empty_state.text_0c9ea45172')}</p>
      </div>
      <button type="button"
        onClick={openAdd}
        className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
       data-testid="admin_coupons-admin_coupons-empty-state-state">
        {t('coupons.admin_coupons_empty_state.text_ef780dfea9')}</button>
    </div>
  );
}
