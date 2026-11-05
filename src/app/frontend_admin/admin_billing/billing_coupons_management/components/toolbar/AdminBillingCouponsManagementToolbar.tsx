"use client";
// RESPONSIBILITY: Renders the search + status filter toolbar for the Coupons module.
// DATA FLOW: feature data/state and user input → AdminBillingCouponsManagementToolbar → accessible UI/events routed to owning hooks (admin_coupons/coupons_management/components/toolbar/AdminBillingCouponsManagementToolbar.tsx)

import { useTranslations } from 'next-intl';

import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminCouponsStore } from '@/app/frontend_admin/admin_billing/billing_coupons_management/state/useAdminBillingCouponsManagementStore';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementLogic';
import { COUPON_DATE_RANGE_OPTIONS, COUPON_STATUS_OPTIONS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/searchable_dropdown/AdminBillingCouponsManagementSearchableDropdown';

/**
 * AdminBillingCouponsManagementToolbar renders the admin coupons toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingCouponsManagementToolbar: Renders the search + status filter toolbar for the Coupons module.
 * @dependencies Consumes useAdminCouponsStore, useAdminCouponsLogic, AdminCouponsConstants, AdminNavigationLayoutSearchableDropdown.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingCouponsManagementToolbar() {
  const t = useTranslations();

  const { statusFilter, setStatusFilter, setSearch, dateRange, setDateRange, setCurrentPage } = useAdminCouponsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const updateDate = (key: 'startDate' | 'endDate', value: string) => { const params = new URLSearchParams(searchParams.toString()); if (value) params.set(key, value); else params.delete(key); params.set('dateRange', 'custom'); params.delete('page'); setCurrentPage(1); router.replace(`${pathname}?${params.toString()}`, { scroll: false }); };
  const changeDateRange = (value: string) => { setDateRange(value); const params = new URLSearchParams(searchParams.toString()); if (value !== 'custom') { params.delete('startDate'); params.delete('endDate'); } else { params.set('dateRange', 'custom'); } params.delete('page'); router.replace(`${pathname}?${params.toString()}`, { scroll: false }); setCurrentPage(1); };
  const { openAdd } = useAdminCouponsLogic();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary"  strokeWidth={2}/></span>
          <input
            type="text"
            placeholder={t('coupons.admin_coupons_toolbar.text_9932ce7a96')}
            value={localSearch}
            onChange={handleSearchChange}
            className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-64 motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
            aria-label={t('coupons.admin_coupons_toolbar.text_eabec7e58d')}
           data-testid="admin_coupons-admin_coupons-toolbar-control"/>
        </div>
        <div className="w-40">
          <AdminNavigationLayoutSearchableDropdown
            options={COUPON_STATUS_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as string)}
            placeholder={t('coupons.admin_coupons_toolbar.text_6b308de777')}
           testId="admin_coupons-admin_coupons-toolbar-change"/>
        </div>
        <div className="w-40 bg-input rounded-lg border-none">
          <AdminNavigationLayoutSearchableDropdown
            options={COUPON_DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))}
            value={dateRange}
            onChange={(v) => changeDateRange(String(v))}
           testId="admin_coupons-admin_coupons-toolbar-change-2"/>
        </div>
        {dateRange === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full" aria-label={t('coupons.admin_coupons_toolbar.customRangeLabel')}>
            <div className="space-y-1"><label htmlFor="admin-coupons-start-date" className="text-xs text-secondary">{t('coupons.admin_coupons_toolbar.customStartDate')}</label><input id="admin-coupons-start-date" type="date" value={startDate} max={endDate || undefined} onChange={(event) => updateDate('startDate', event.target.value)} className="min-h-11 rounded-lg border border-border bg-input px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"  data-testid="coupons-management-coupons-management-toolbar-admin-coupons-start-date"/></div>
            <div className="space-y-1"><label htmlFor="admin-coupons-end-date" className="text-xs text-secondary">{t('coupons.admin_coupons_toolbar.customEndDate')}</label><input id="admin-coupons-end-date" type="date" value={endDate} min={startDate || undefined} onChange={(event) => updateDate('endDate', event.target.value)} className="min-h-11 rounded-lg border border-border bg-input px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"  data-testid="coupons-management-coupons-management-toolbar-admin-coupons-end-date"/></div>
            {(!startDate || !endDate || startDate > endDate) && <p role="status" className="text-xs text-secondary sm:col-span-2" data-testid="coupons-management-coupons-management-toolbar-status-region">{t('coupons.admin_coupons_toolbar.customRangeHelp')}</p>}
          </div>
        )}
      </div>
      <button type="button"
        onClick={openAdd}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:active:scale-95 whitespace-nowrap motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11"
       data-testid="admin_coupons-admin_coupons-toolbar-click">
        <Plus size={18}  strokeWidth={2}/>
        {t('coupons.admin_coupons_toolbar.text_521f58fd09')}</button>
    </div>
  );
}
