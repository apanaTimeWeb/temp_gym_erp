// RESPONSIBILITY: Lists subscription plans with recoverable async states and delegated mutation behavior.
'use client';
import { Check, Edit2, Trash2, Loader2, Archive } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import SuperadminBillingPlansEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_states_and_feedback/SuperadminBillingPlansManagementEmptyState';
import { useSuperadminBillingPlansManagementList } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementList';
import { formatCurrency as SuperadminBillingPlansFormatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFormatCurrency';

import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';


/** Lists subscription plans with recoverable async states and delegated mutation behavior. */
export default function SuperadminBillingPlansManagementList() {
  const t = useTranslations('superadmin_billing_plans');
  const locale = useLocale();
  const { plans, isPending, isError, refetch, deleteMutation, archiveMutation, openEditModal, confirmPlanDestructiveAction, openCreateModal, search, status, sortBy, order, setSearch, setStatus, setSortBy, setOrder } = useSuperadminBillingPlansManagementList();

  if (isPending) return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label={t('ui.loading_plans')} aria-busy="true">
      {[...Array(3)].map((_, index) => <div key={`skeleton-${index}`} className="h-64 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
    </div>
  );

  if (isError) return (
    <section className="rounded-xl border border-border bg-card p-8 text-center" role="alert">
      <p className="text-danger">{t('ui.error_loading_plans_fd7909c9')}</p>
      <button type="button" onClick={() => { void refetch(); }} className="mt-4 min-h-11 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        {t('ui.try_again_d876a9fe')}
      </button>
    </section>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4" aria-label={t('ui.plan_filters')}>
        <label className="text-sm text-secondary">{t('ui.search_plans')}<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-border bg-input px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></label>
        <label className="text-sm text-secondary">{t('ui.plan_status')}<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-border bg-input px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><option value="ALL">{t('ui.all_plans')}</option><option value="ARCHIVED">{t('ui.archived_75b8b0f4')}</option><option value="ACTIVE">{t('ui.active_plans')}</option></select></label>
        <label className="text-sm text-secondary">{t('ui.sort_plans')}<select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-border bg-input px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><option value="name">{t('ui.plan_name')}</option><option value="priceMonthly">{t('ui.monthly_price')}</option><option value="maxMembers">{t('ui.max_members_675c60aa')}</option></select></label>
        <button type="button" onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} className="self-end min-h-11 rounded-lg border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{order === 'asc' ? t('ui.sort_ascending') : t('ui.sort_descending')}</button>
      </div>
      {plans.length === 0 ? <SuperadminBillingPlansEmptyState onCreate={openCreateModal} /> : <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan: SubscriptionPlan) => {
        const isDeleting = deleteMutation.isPending && deleteMutation.variables?.id === plan.id;
        const isArchivingThisPlan = archiveMutation.isPending && archiveMutation.variables?.id === plan.id;
        const busy = isDeleting || isArchivingThisPlan;
        return (
          <article key={plan.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 motion-safe:transition-colors motion-safe:duration-base hover:border-focus">
            {plan.isArchived && <div className="absolute start-0 top-0 rounded-ee-lg bg-surface-hover px-3 py-1 text-xs font-bold text-secondary">{t('ui.archived_75b8b0f4')}</div>}
            <div className="absolute end-0 top-0 rounded-es-lg bg-primary-subtle px-3 py-1 text-xs font-bold text-primary">{plan.activeTenants ?? 0} {t('ui.gyms_active_4920a3e4')}</div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-primary">{plan.name}</h2>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-3xl font-extrabold text-primary">{SuperadminBillingPlansFormatCurrency(Number(plan.priceMonthly), plan.currency, locale)}</span>
                <span className="mb-1 font-medium text-secondary">{t('ui.mo_14331570')}</span>
              </div>
            </div>
            <div className="mb-6 flex-1 space-y-3">
              <p className="border-b border-border pb-2 text-sm font-medium text-secondary">{t('ui.max_members_675c60aa')} <span className="text-primary">{plan.maxMembers}</span></p>
              <p className="border-b border-border pb-2 text-sm font-medium text-secondary">{t('ui.max_staff_d35f8519')} <span className="text-primary">{plan.maxStaff}</span></p>
              <p className="border-b border-border pb-2 text-sm font-medium text-secondary">{t('ui.db_limit_gb_8738c0c7')} <span className="text-primary">{plan.dbLimitGb ?? t('ui.unlimited')}</span></p>
              <p className="border-b border-border pb-2 text-sm font-medium text-secondary">{t('ui.binary_limit_gb_7822511b')} <span className="text-primary">{plan.binaryLimitGb ?? t('ui.unlimited')}</span></p>
              <div className="pt-2">
                {plan.features?.map((feature, index) => <div key={`${feature}-${index}`} className="mb-2 flex items-center gap-2 text-sm text-secondary"><Check size={18} aria-hidden="true" className="shrink-0 text-success" />{feature}</div>)}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => openEditModal(plan)} disabled={busy || deleteMutation.isPending || archiveMutation.isPending} aria-label={t('ui.edit_plan_aria', { name: plan.name })} className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border bg-input text-primary motion-safe:transition-colors hover:bg-primary-subtle hover:text-on-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                <Edit2 size={18} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => { void confirmPlanDestructiveAction(plan); }} disabled={busy || deleteMutation.isPending || archiveMutation.isPending} aria-label={t('ui.delete_or_archive_plan_aria', { name: plan.name })} title={(plan.activeTenants ?? 0) > 0 ? t('ui.archive_plan_title') : t('ui.delete_plan_title')} className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border bg-input text-secondary motion-safe:transition-colors hover:bg-danger-bg disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                {(() => { if (busy) { return (<Loader2 size={18} aria-hidden="true" className="motion-safe:animate-spin" />); } if ((plan.activeTenants ?? 0) > 0) { return (<Archive size={18} aria-hidden="true" />); } return (<Trash2 size={18} aria-hidden="true" />); })()}
              </button>
            </div>
          </article>
        );
      })}
      </div>}
    </div>
  );
}
