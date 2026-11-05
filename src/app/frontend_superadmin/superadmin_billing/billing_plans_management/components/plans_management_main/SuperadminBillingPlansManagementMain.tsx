// RESPONSIBILITY: Renders/orchestrates SuperadminBillingPlansMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingPlansMain owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Feature-local Zustand UI state only
 * MODULE DEPENDENCIES: next-intl, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_tables_and_lists/SuperadminBillingPlansManagementList, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_modals/SuperadminBillingPlansManagementPlanCreateModal, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_modals/SuperadminBillingPlansManagementPlanEditModal, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: SuperadminBillingPlansMain.tsx is the root client entry for the Plans page. Reads the feature-local Zustand store to open the create-plan modal.
import { useTranslations } from 'next-intl';

import SuperadminBillingPlansPlanCreateModal from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_modals/SuperadminBillingPlansManagementPlanCreateModal';
import SuperadminBillingPlansPlanEditModal from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_modals/SuperadminBillingPlansManagementPlanEditModal';
import SuperadminBillingPlansList from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_tables_and_lists/SuperadminBillingPlansManagementList';
import { useSuperadminBillingPlansManagementStore } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore';


/**
 * @description SuperadminBillingPlansMain.tsx is the root client entry for the Plans page. Reads the feature-local Zustand store to open the create-plan modal.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
/**
 * @description Renders PlansMain within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminBillingPlansManagementMain() {
  const t = useTranslations('superadmin_billing_plans');
    const openCreateModal = useSuperadminBillingPlansManagementStore(state => state.openCreateModal);
    return (<div className="space-y-8" data-testid="superadmin_billing_plans-superadmin-plans-main-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">{t('ui.subscription_plans_220d816e')}</h1>
          <p className="text-secondary mt-1">{t('ui.manage_pricing_tiers_and_limits_for_gyms_b565ab9a')}</p>
        </div>
        <button type="button" onClick={openCreateModal} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-colors motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_billing_plans-superadmin-plans-main-main-create-new-plan">
          {t('ui.create_new_plan_ec496c23')}</button>
      </div>

      <SuperadminBillingPlansList />
      <SuperadminBillingPlansPlanCreateModal />
      <SuperadminBillingPlansPlanEditModal />
    </div>);
}
