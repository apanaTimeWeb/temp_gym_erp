"use client";
// RESPONSIBILITY: Renders the coupons data table with edit, delete, and toggle actions.
// DATA FLOW: feature data/state and user input → AdminBillingCouponsManagementTable → accessible UI/events routed to owning hooks (admin_coupons/coupons_management/components/table/AdminBillingCouponsManagementTable.tsx)

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { format, isValid, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import AdminNavigationLayoutProgressBar from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/progress_bar/AdminBillingCouponsManagementProgressBar';
import { AdminCouponsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementFormatCurrency';

import { Edit2, Trash2, ToggleLeft, ToggleRight, Copy } from 'lucide-react';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementLogic';
import AdminCouponsEmptyState from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/empty_state/AdminBillingCouponsManagementEmptyState';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/AdminBillingCouponsManagementPagination';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/AdminBillingCouponsManagementTableSkeleton';
import { adminToast } from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementToastService';
import type { Coupon } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';
import { COUPON_STATUS, COUPON_STATUS_STYLES, COUPON_STATUS_LABEL_KEYS, COUPON_TABLE_HEADER_KEYS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';


/**
 * AdminBillingCouponsManagementTable renders the admin coupons table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBillingCouponsManagementTable: Renders the coupons data table with edit, delete, and toggle actions.
 * @dependencies Consumes AdminNavigationLayoutProgressBar, AdminCouponsFormatCurrency, useAdminCouponsLogic, AdminCouponsEmptyState, AdminNavigationLayoutPagination.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBillingCouponsManagementTable() {
  const t = useTranslations();

  const locale = useLocale();
  const todayLocalKey = format(new Date(), 'yyyy-MM-dd');
  const { coupons, status, error, retry, openEdit, deleteCoupon, toggleCoupon, currentPage, setCurrentPage, totalPages, totalItems } = useAdminCouponsLogic();

  if (status === 'pending') return <AdminNavigationLayoutTableSkeleton rows={6} cols={COUPON_TABLE_HEADER_KEYS.length} />;
  if (status === 'error') return <div role="alert" className="rounded-lg border border-border bg-danger-bg p-4 text-danger">{t('coupons.admin_coupons_table.loadError')} <button type="button" onClick={() => void retry()} className="ml-3 min-h-11 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="coupons-management-coupons-management-table-retry">{t('coupons.admin_coupons_table.retry')}</button></div>;

  if (coupons.length === 0) return <AdminCouponsEmptyState />;

  const handleCopy = async (code: string) => {
    if (!navigator.clipboard?.writeText) {
      adminToast.error(t('coupons.admin_coupons_table.copyUnavailable'), 'admin-coupons-copy-unavailable');
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      adminToast.success(t('coupons.admin_coupons_table.copySuccess'), 'admin-coupons-copy-success');
    } catch {
      adminToast.error(t('coupons.admin_coupons_table.copyFailed'), 'admin-coupons-copy-failed');
    }
  }
  const formatDate = (value: string) => { const parsed = parseISO(value); return isValid(parsed) ? format(parsed, 'PP', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS }) : value; };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead>
            <tr className="bg-surface-highlight">
              {COUPON_TABLE_HEADER_KEYS.map((key) => (
                <th key={key} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{t(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coupons.map((coupon: Coupon , __testIdIndex54) => (
              <tr
                key={coupon.id}
                className="hover:bg-surface-highlight motion-safe:transition-colors group motion-safe:duration-base"
                data-testid={`admin_coupons-admin_coupons-table-row-${__testIdIndex54}`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => openEdit(coupon)} disabled={coupon.status === COUPON_STATUS.EXPIRED || coupon.validUntil < todayLocalKey} aria-label={t('admin_coupons_table.auto_editCoupon', { code: coupon.code })} className="font-mono text-sm font-bold text-primary bg-primary-subtle px-2 py-1 rounded min-h-11 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid={`admin_coupons-admin_coupons-table-edit-code-${__testIdIndex54}`}>{coupon.code}</button>
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); void handleCopy(coupon.code); }}
                      className="min-h-11 min-w-11 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity text-secondary hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                      aria-label={t('coupons.admin_coupons_table.text_45312a0aa0')}
                     data-testid={`admin_coupons-admin_coupons-table-click-2-map54-${__testIdIndex54}-2`}>
                      <Copy size={18}  strokeWidth={2}/>
                    </button>
                  </div>
                  <p className="text-xs text-secondary mt-1 truncate max-w-48">{coupon.description}</p>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-primary">
                  {coupon.type === 'percentage' ? `${coupon.value}% ${t('coupons.AdminCouponsCatalog.off')}` : `${AdminCouponsFormatCurrency(coupon.value, locale)} ${t('coupons.AdminCouponsCatalog.off')}`}
                  {coupon.minOrderAmount > 0 && <p className="text-xs text-secondary font-normal">{t('coupons.admin_coupons_table.text_21be6e4ee3')}{AdminCouponsFormatCurrency(coupon.minOrderAmount, locale)}</p>}
                </td>
                <td className="px-5 py-4 text-sm text-primary">
                  {coupon.assignedGymNames.join(', ')}
                </td>
                <td className="px-5 py-4">
                  {coupon.usageLimit ? (
                    <>
                      <div className="text-sm text-primary">{coupon.usedCount} / {coupon.usageLimit} {t('coupons.admin_coupons_table.text_02c0e4a1da')}</div>
                      <div className="mt-1 w-20">
                        <AdminNavigationLayoutProgressBar
                          value={coupon.usageLimit > 0 ? (coupon.usedCount / coupon.usageLimit) * 100 : 0}
                          label={t('admin_coupons_table.auto_couponUsage', { code: coupon.code })}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-primary">{coupon.usedCount} {t('coupons.admin_coupons_table.text_11f5c0dfb7')}</div>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-primary whitespace-nowrap">{formatDate(coupon.validUntil)}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${COUPON_STATUS_STYLES[coupon.status] ?? 'bg-input text-secondary'}`} data-testid="coupons-management-coupons-management-table-status-badge">
                    {t(COUPON_STATUS_LABEL_KEYS[coupon.status] as string)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-base">
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); toggleCoupon(coupon.id); }} disabled={coupon.status === COUPON_STATUS.EXPIRED || coupon.validUntil < todayLocalKey}
                      className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                      aria-label={coupon.status === COUPON_STATUS.ACTIVE ? t('coupons.admin_coupons_table.auto_de2ee1a936') : t('coupons.admin_coupons_table.auto_d4b4f4c7e6')}
                     data-testid={`admin_coupons-admin_coupons-table-click-3-map54-${__testIdIndex54}-3`}>
                      {coupon.status === COUPON_STATUS.ACTIVE ? <ToggleRight size={18} className="text-success"  strokeWidth={2}/> : <ToggleLeft size={18}  strokeWidth={2}/>}
                    </button>
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); openEdit(coupon); }} disabled={coupon.status === COUPON_STATUS.EXPIRED || coupon.validUntil < todayLocalKey}
                      className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                      aria-label={t('coupons.admin_coupons_table.text_cc2be0893e')}
                     data-testid={`admin_coupons-admin_coupons-table-click-4-map54-${__testIdIndex54}-4`}>
                      <Edit2 size={18}  strokeWidth={2}/>
                    </button>
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); deleteCoupon(coupon.id); }}
                      className="min-h-11 min-w-11 p-1.5 rounded-lg hover:bg-danger-bg text-secondary hover:text-danger motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                      aria-label={t('coupons.admin_coupons_table.text_408815991b')}
                     data-testid={`admin_coupons-admin_coupons-table-click-5-map54-${__testIdIndex54}-5`}>
                      <Trash2 size={18}  strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminNavigationLayoutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
