// RESPONSIBILITY: Lists subscription plans with recoverable async states and delegated mutation behavior.
'use client';
import Link from 'next/link';
import { Check, Edit2, Trash2, Loader2, Archive } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import SuperadminBillingPlansEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/components/plans_management_states_and_feedback/SuperadminBillingPlansManagementEmptyState';
import { useSuperadminBillingPlansManagementList } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementList';
import { formatCurrency as SuperadminBillingPlansFormatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFormatCurrency';

import type { SubscriptionPlan } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management.types';

export default function SuperadminBillingPlansManagementList() {
  const t = useTranslations('superadmin_billing_plans');
  const locale = useLocale();
  const { plans, isPending, isError, refetch, deleteMutation, archiveMutation, openEditModal, confirmPlanDestructiveAction, openCreateModal, search, status, sortBy, order, setSearch, setStatus, setSortBy, setOrder } = useSuperadminBillingPlansManagementList();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label={t('ui.loading_plans')} aria-busy="true">
        {[...Array(3)].map((_, index) => <div key={`skeleton-${index}`} className="h-64 rounded-2xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
      </div>
    );
  }

  if (isError) {
    return (
      <section className="rounded-2xl border border-border bg-card p-8 text-center" role="alert">
        <p className="text-danger">{t('ui.error_loading_plans_fd7909c9')}</p>
        <button type="button" onClick={() => { void refetch(); }} className="mt-4 min-h-11 rounded-xl bg-primary px-4 py-2 font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer">
          {t('ui.try_again_d876a9fe')}
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-4 shadow-card grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={t('ui.plan_filters')}>
        <label className="text-xs font-semibold text-secondary">{t('ui.search_plans')}<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} className="mt-1.5 min-h-10 w-full rounded-xl border border-border bg-input px-3 text-sm font-normal text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></label>
        <label className="text-xs font-semibold text-secondary">{t('ui.plan_status')}<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-1.5 min-h-10 w-full rounded-xl border border-border bg-input px-3 text-sm font-normal text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><option value="ALL">{t('ui.all_plans')}</option><option value="ARCHIVED">{t('ui.archived_75b8b0f4')}</option><option value="ACTIVE">{t('ui.active_plans')}</option></select></label>
        <label className="text-xs font-semibold text-secondary">{t('ui.sort_plans')}<select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="mt-1.5 min-h-10 w-full rounded-xl border border-border bg-input px-3 text-sm font-normal text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><option value="name">{t('ui.plan_name')}</option><option value="priceMonthly">{t('ui.monthly_price')}</option><option value="maxMembers">{t('ui.max_members_675c60aa')}</option></select></label>
        <button type="button" onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} className="self-end min-h-10 rounded-xl border border-border dark:border-white/15 bg-input hover:bg-surface-hover px-3 text-xs sm:text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer">{order === 'asc' ? t('ui.sort_ascending') : t('ui.sort_descending')}</button>
      </div>

      {plans.length === 0 ? (
        <SuperadminBillingPlansEmptyState onCreate={openCreateModal} />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan: SubscriptionPlan) => {
            const isDeleting = deleteMutation.isPending && deleteMutation.variables?.id === plan.id;
            const isArchivingThisPlan = archiveMutation.isPending && archiveMutation.variables?.id === plan.id;
            const busy = isDeleting || isArchivingThisPlan;
            return (
              <article key={plan.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border dark:border-amber-500/30 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-6 shadow-card motion-safe:transition-all motion-safe:duration-base hover:border-orange-500/60 hover:-translate-y-0.5">
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#FACC15] to-[#38BDF8]" />
                {plan.isArchived && <div className="absolute start-0 top-0 rounded-ee-xl bg-surface-hover px-3 py-1 text-xs font-bold text-secondary">{t('ui.archived_75b8b0f4')}</div>}
                <Link
                  href={`/frontend_superadmin/superadmin_gyms/gyms_directory?planId=${encodeURIComponent(plan.id)}`}
                  className="absolute end-0 top-0 rounded-es-xl border-b border-s border-orange-500/30 bg-primary-subtle px-3 py-1.5 text-xs font-bold text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  title="View gyms subscribed to this plan"
                >
                  {plan.activeTenants ?? 0} {t('ui.gyms_active_4920a3e4')}
                </Link>
                <div className="mb-4 pt-2">
                  <h2 className="text-xl font-extrabold text-primary">{plan.name}</h2>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-3xl font-extrabold text-primary tabular-nums">{SuperadminBillingPlansFormatCurrency(Number(plan.priceMonthly), plan.currency, locale)}</span>
                    <span className="mb-1 text-sm font-medium text-secondary">{t('ui.mo_14331570')}</span>
                  </div>
                </div>
                <div className="mb-6 flex-1 space-y-2.5">
                  <p className="border-b border-border dark:border-white/10 pb-2 text-sm font-medium text-secondary flex justify-between"><span>{t('ui.max_members_675c60aa')}</span> <span className="text-primary font-semibold tabular-nums">{plan.maxMembers}</span></p>
                  {plan.maxBranches ? (
                    <p className="border-b border-border dark:border-white/10 pb-2 text-sm font-medium text-secondary flex justify-between"><span>Max Branches</span> <span className="text-primary font-semibold tabular-nums">{plan.maxBranches}</span></p>
                  ) : null}
                  <p className="border-b border-border dark:border-white/10 pb-2 text-sm font-medium text-secondary flex justify-between"><span>{t('ui.max_staff_d35f8519')}</span> <span className="text-primary font-semibold tabular-nums">{plan.maxStaff}</span></p>
                  <p className="border-b border-border dark:border-white/10 pb-2 text-sm font-medium text-secondary flex justify-between"><span>{t('ui.db_limit_gb_8738c0c7')}</span> <span className="text-primary font-semibold tabular-nums">{plan.dbLimitGb ?? t('ui.unlimited')}</span></p>
                  <p className="border-b border-border dark:border-white/10 pb-2 text-sm font-medium text-secondary flex justify-between"><span>{t('ui.binary_limit_gb_7822511b')}</span> <span className="text-primary font-semibold tabular-nums">{plan.binaryLimitGb ?? t('ui.unlimited')}</span></p>
                  <div className="pt-2">
                    {plan.features?.map((feature, index) => <div key={`${feature}-${index}`} className="mb-2 flex items-center gap-2 text-sm text-secondary"><Check size={16} aria-hidden="true" className="shrink-0 text-success" /><span>{feature}</span></div>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEditModal(plan)} disabled={busy || deleteMutation.isPending || archiveMutation.isPending} aria-label={t('ui.edit_plan_aria', { name: plan.name })} className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border dark:border-white/15 bg-input text-primary motion-safe:transition-colors hover:bg-surface-hover disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer">
                    <Edit2 size={17} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => { void confirmPlanDestructiveAction(plan); }} disabled={busy || deleteMutation.isPending || archiveMutation.isPending} aria-label={t('ui.delete_or_archive_plan_aria', { name: plan.name })} title={(plan.activeTenants ?? 0) > 0 ? t('ui.archive_plan_title') : t('ui.delete_plan_title')} className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border dark:border-white/15 bg-input text-secondary motion-safe:transition-colors hover:bg-danger-bg hover:text-danger disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer">
                    {(() => { if (busy) return <Loader2 size={17} aria-hidden="true" className="motion-safe:animate-spin" />; if ((plan.activeTenants ?? 0) > 0) return <Archive size={17} aria-hidden="true" />; return <Trash2 size={17} aria-hidden="true" />; })()}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
