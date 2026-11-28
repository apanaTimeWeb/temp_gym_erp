// RESPONSIBILITY: Renders/orchestrates SuperadminBillingPlansMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useTranslations } from 'next-intl';

import SuperadminBillingPlansPlanCreateModal from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_modals/SuperadminBillingPlansManagementPlanCreateModal';
import SuperadminBillingPlansPlanEditModal from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_modals/SuperadminBillingPlansManagementPlanEditModal';
import SuperadminBillingPlansList from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_tables_and_lists/SuperadminBillingPlansManagementList';
import { useSuperadminBillingPlansManagementStore } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore';

export default function SuperadminBillingPlansManagementMain() {
  const t = useTranslations('superadmin_billing_plans');
  const openCreateModal = useSuperadminBillingPlansManagementStore((state) => state.openCreateModal);

  return (
    <div className="space-y-6" data-testid="superadmin_billing_plans-superadmin-plans-main-page">
      <section className="relative overflow-hidden rounded-2xl border border-amber-500/35 bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#FACC15] to-[#FF5A1F]" />
        <div className="min-w-0">
          <h1 className="superadmin-page-title text-primary">{t('ui.subscription_plans_220d816e')}</h1>
          <p className="text-secondary text-sm mt-1">{t('ui.manage_pricing_tiers_and_limits_for_gyms_b565ab9a')}</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="bg-gradient-to-r from-[#FF5A1F] to-[#F97316] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 shrink-0 cursor-pointer"
          data-testid="superadmin_billing_plans-superadmin-plans-main-main-create-new-plan"
        >
          {t('ui.create_new_plan_ec496c23')}
        </button>
      </section>

      <SuperadminBillingPlansList />
      <SuperadminBillingPlansPlanCreateModal />
      <SuperadminBillingPlansPlanEditModal />
    </div>
  );
}
