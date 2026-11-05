// RESPONSIBILITY: Renders a membership-plan summary and exposes its plan-specific actions.
'use client';

import { CheckCircle, XCircle, Send, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerMembershipLifecyclePlanFeatures from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecyclePlanFeatures';
import ManagerMembershipLifecyclePlanPricing from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/components/ManagerMembershipLifecyclePlanPricing';
import { MANAGER_MEMBERSHIP_LIFECYCLE_TIER_STYLES } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
import { useManagerMembershipLifecycleLogic } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleLogic';
import type { ManagerMembershipLifecyclePlanCardProps } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_plan_card.types';

/** @description Shows status, pricing and features for a plan, with create-contract edit/delete actions kept inside the Plans feature boundary. */
export default function ManagerMembershipLifecyclePlanCard({ plan }: ManagerMembershipLifecyclePlanCardProps) {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  const { openRequestModal, openEditPlan, deletePlan, saving } = useManagerMembershipLifecycleLogic();
  const tier = MANAGER_MEMBERSHIP_LIFECYCLE_TIER_STYLES[plan.tier.toUpperCase()];
  const features = Array.isArray(plan.features)
    ? plan.features
    : (plan.features as unknown as string).split(',').map((feature) => feature.trim()).filter(Boolean);

  return (
    <article className={`flex flex-col gap-4 rounded-xl border bg-card p-5 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-card ${plan.isActive ? 'border-border' : 'border-border opacity-60'}`}>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {tier ? (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tier.bg} ${tier.text}`}>{t(tier.labelKey)}</span>
            ) : (
              <span className="rounded-full bg-input px-2.5 py-0.5 text-xs font-semibold text-text-secondary">{plan.tier}</span>
            )}
            {plan.isActive ? (
              <span data-testid={`manager_plans-manager-plans-main-status-active-${plan.id}`} className="flex items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-xs font-semibold text-success-text"><CheckCircle size={18} strokeWidth={2} aria-hidden="true" />{t('COPY_ACTIVE_1')}</span>
            ) : (
              <span data-testid={`manager_plans-manager-plans-main-status-inactive-${plan.id}`} className="flex items-center gap-1 rounded-full bg-danger-bg px-2 py-0.5 text-xs font-semibold text-danger-text"><XCircle size={18} strokeWidth={2} aria-hidden="true" />{t('COPY_INACTIVE_1')}</span>
            )}
          </div>
          <h3 className="truncate text-base font-bold text-text-primary">{plan.name}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => openEditPlan(plan)} disabled={saving} aria-label={t('CRUD_EDIT_PLAN_TITLE')} title={t('CRUD_EDIT_PLAN_TITLE')} data-testid={`manager_plans-managerplansplancard-button-edit-${plan.id}`} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60">
            <Pencil size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => void deletePlan(plan)} disabled={saving} aria-label={t('CONFIRM_DELETE_PLAN_TITLE')} title={t('CONFIRM_DELETE_PLAN_TITLE')} data-testid={`manager_plans-managerplansplancard-button-delete-${plan.id}`} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-danger-text hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60">
            <Trash2 size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>

      <ManagerMembershipLifecyclePlanPricing plan={plan} />
      <ManagerMembershipLifecyclePlanFeatures planId={plan.id} features={features} />

      <footer className="mt-auto border-t border-border pt-3">
        <button type="button" onClick={() => openRequestModal(plan)} data-testid="manager_plans-manager-plans-main-button-action" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-focus py-2 text-xs font-semibold text-primary motion-safe:transition-all motion-safe:duration-200 hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
          <Send size={18} strokeWidth={2} aria-hidden="true" />{t('COPY_REQUEST_CHANGE')}
        </button>
      </footer>
    </article>
  );
}
