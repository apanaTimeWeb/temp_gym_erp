// RESPONSIBILITY: Renders/orchestrates SuperadminBillingCouponsHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Tag, Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SuperadminBillingCouponsManagementDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_forms_and_filters/SuperadminBillingCouponsManagementDateFilterDropdown';
import { SUPERADMIN_COUPON_STATUS_OPTIONS, SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';

import type { SuperadminBillingCouponsHeaderProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_header.types';

export default function SuperadminBillingCouponsManagementHeader({ searchQuery, onSearchChange, onCreateClick, statusFilter, onStatusFilterChange }: SuperadminBillingCouponsHeaderProps) {
  const t = useTranslations('superadmin_coupons');
  return (
    <section className="relative overflow-hidden rounded-2xl border border-amber-500/35 bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col gap-4">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#FACC15] to-[#FF5A1F]" />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="superadmin-page-title text-primary flex items-center gap-2.5">
            <span className="p-2 rounded-xl border border-amber-500/35 bg-amber-500/15 text-amber-500 dark:text-amber-300 shrink-0" aria-hidden="true">
              <Tag size={18} strokeWidth={2.2} />
            </span>
            <span className="truncate">{t('ui.promotional_coupons_80d2b09d')}</span>
          </h1>
          <p className="text-sm text-secondary mt-1">{t('ui.manage_global_discount_codes_for_new_saas_su_d04eb68a')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <SuperadminBillingCouponsManagementDateFilterDropdown />
          <div className="relative flex-1 sm:flex-none min-w-[200px]">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              aria-label={t('ui.search_coupons_773b1b58')}
              placeholder={t('ui.search_coupons_773b1b58')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="ps-9 pe-4 py-2 bg-input border border-border rounded-xl text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-focus motion-safe:transition-colors w-full sm:w-56 min-h-10"
              data-testid="superadmin_coupons-superadmin-coupons-header-superadmin-coupons-header-text"
            />
          </div>
          {onStatusFilterChange && (
            <div className="w-40 border-none bg-input rounded-xl">
              <SearchableDropdown
                data-testid="superadmin_coupons-superadmin-coupons-header-status-filter"
                options={SUPERADMIN_COUPON_STATUS_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))}
                value={statusFilter || SUPERADMIN_COUPON_STATUS_CODES.ALL}
                onChange={(val) => onStatusFilterChange(String(val))}
                className="bg-transparent border-border"
              />
            </div>
          )}
          <button
            type="button"
            onClick={onCreateClick}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF5A1F] to-[#F97316] hover:brightness-110 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all motion-safe:active:scale-95 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-10 cursor-pointer"
            data-testid="superadmin_coupons-superadmin-coupons-header-coupons-header-create-coupon"
          >
            <Plus size={16} strokeWidth={2.2} />
            <span>{t('ui.create_coupon_90e43665')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
