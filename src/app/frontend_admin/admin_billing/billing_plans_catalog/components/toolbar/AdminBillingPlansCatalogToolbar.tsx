"use client";
// RESPONSIBILITY: Renders Plans search/filter/refresh/create controls using the single Plans logic owner supplied by the module entry point.
// DATA FLOW: feature data/state and user input → AdminBillingPlansCatalogToolbar → accessible UI/events routed to owning hooks (admin_plans/plans_catalog/components/toolbar/AdminBillingPlansCatalogToolbar.tsx)

import { useTranslations } from 'next-intl';

import { Plus, RefreshCw, Search } from 'lucide-react';
import type { PlansContextType } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
import { TIERS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.constants';
import { useAdminPlansToolbarSearch } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogToolbarSearch';
import type { AdminPlansToolbarProps } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogToolbarPropsTypes';

/**
 * AdminBillingPlansCatalogToolbar renders the admin plans toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingPlansCatalogToolbar: Renders Plans search/filter/refresh/create controls using the single Plans logic owner supplied by the module entry point.
 * @dependencies Consumes AdminPlansTypes, AdminPlansConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingPlansCatalogToolbar({ logic }: AdminPlansToolbarProps) {
  const t = useTranslations();

  const { plans, search, setSearch, tierFilter, setTierFilter, loadPlans, openAdd } = logic;
  const { localSearch, setLocalSearch } = useAdminPlansToolbarSearch(search, setSearch);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-4">
        <p className="hidden text-sm text-secondary sm:block">{t('plans.admin_plans_toolbar.text_61b770863d')}<span className="font-bold text-primary">{plans.length}</span></p>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/></span>
          <label htmlFor="admin_plans-search" className="sr-only">{t('plans.admin_plans_toolbar.text_6e18b08ca2')}</label>
          <input id="admin_plans-search" value={localSearch} onChange={(event) => setLocalSearch(event.target.value)} placeholder={t('plans.admin_plans_toolbar.text_6b5429fd0b')} className="w-48 rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-64 focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"  data-testid="admin_plans-admin_plans-toolbar-search"/>
        </div>
        <label htmlFor="admin_plans-tier" className="sr-only">{t('plans.admin_plans_toolbar.text_0e08b1c93a')}</label>
        <select id="admin_plans-tier" value={tierFilter} onChange={(event) => setTierFilter(event.target.value)} className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="admin_plans-admin_plans-toolbar-control">
          <option value="All" data-testid="admin_plans-admin_plans-toolbar-control-2">{t('plans.admin_plans_toolbar.text_bb7f93d151')}</option>
          {TIERS.map((tier , __testIdIndex47) => <option key={tier} value={tier} data-testid={`admin_plans-admin_plans-toolbar-control-3-map47-${__testIdIndex47}-1`}>{tier}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => void loadPlans()} aria-label={t('plans.admin_plans_toolbar.text_87360b6bf2')} className="min-h-11 min-w-11 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-secondary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" data-testid="admin_plans-admin_plans-toolbar-click">
          <RefreshCw size={18} aria-hidden="true"  strokeWidth={2}/>
        </button>
        <button type="button" onClick={openAdd} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_plans-admin_plans-toolbar-click-2">
          <Plus size={18} aria-hidden="true"  strokeWidth={2}/> {t('plans.admin_plans_toolbar.text_7e048e0455')}</button>
      </div>
    </div>
  );
}
