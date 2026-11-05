// RESPONSIBILITY: Renders ManagerMembershipLifecycleToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_FILTER_OPTIONS, MANAGER_MEMBERSHIP_LIFECYCLE_TIER_FILTER_OPTIONS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
import { useManagerMembershipLifecycleLogic } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleLogic';


/** @description Renders search and filter controls for the plans list. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembershipLifecycleToolbar() {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');

  const { plans, search, setSearch, tierFilter, setTierFilter, statusFilter, setStatusFilter, openCreatePlan, saving } = useManagerMembershipLifecycleLogic();
  const dynamicTierOptions = Array.from(new Set([...plans.map((plan) => plan.tier), ...(tierFilter && tierFilter !== 'ALL' ? [tierFilter] : [])]))
    .filter((tier) => tier.trim().length > 0 && tier.toUpperCase() !== 'ALL' && !MANAGER_MEMBERSHIP_LIFECYCLE_TIER_FILTER_OPTIONS.some((option) => option.value.toUpperCase() === tier.toUpperCase()))
    .map((value) => ({ value, labelKey: null as string | null }));

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 max-w-xs">
        <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
        <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-input-text"
          type="text"
          placeholder={t("COPY_SEARCH_PLANS")}
          value={search}
          onChange={e => setSearch(e.target.value)}
          
         aria-label={t("COPY_SEARCH_PLANS")}/>
      </div>
      <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 min-h-11 py-2 bg-input border border-border rounded-lg text-sm text-text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-select-option-1"
        value={tierFilter}
        onChange={e => setTierFilter(e.target.value)}
        
       aria-label={t("TEXT_FILTER_PLAN_TIER")}>
        {MANAGER_MEMBERSHIP_LIFECYCLE_TIER_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="manager_plans-managerplanstoolbar-section-filters">{t(option.labelKey)}</option>)}
        {dynamicTierOptions.map((option) => <option key={option.value} value={option.value}>{option.value}</option>)}
      </select>
      <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 min-h-11 py-2 bg-input border border-border rounded-lg text-sm text-text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-select-option-2"
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        
       aria-label={t("TEXT_FILTER_PLAN_STATUS")}>
        {MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="manager_plans-managerplanstoolbar-section-actions">{t(option.labelKey)}</option>)}
      </select>
      <button
        type="button"
        onClick={openCreatePlan}
        disabled={saving}
        data-testid="manager_plans-managerplanstoolbar-button-create-plan"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={18} strokeWidth={2} aria-hidden="true" />
        {t('CRUD_ADD_PLAN_TITLE')}
      </button>
    </div>
  );
}
