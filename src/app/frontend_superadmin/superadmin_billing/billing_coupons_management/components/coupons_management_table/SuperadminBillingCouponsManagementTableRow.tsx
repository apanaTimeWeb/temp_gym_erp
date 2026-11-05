// RESPONSIBILITY: Renders/orchestrates SuperadminBillingCouponsTableRow within its owning Superadmin feature module; no direct backend implementation.
'use client';


import { Trash2, RefreshCw, MessageCircle, Edit2, ToggleLeft, ToggleRight, History } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import SuperadminBillingCouponsStatusBadge from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_status_badge/SuperadminBillingCouponsManagementStatusBadge';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
// RESPONSIBILITY: Renders and composes SuperadminBillingCouponsTableRow for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import { SUPERADMIN_BILLING_COUPONS_MANAGEMENT_EXTERNAL } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { formatSuperadminBillingCouponsDisplayDate } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementDateUtils';
import { SuperadminBillingCouponsFormatCurrency } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementFormatCurrency';
import { SuperadminBillingCouponsWhatsAppReceiptFormatter } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementWhatsappReceiptFormatter';

import type { SuperadminBillingCouponsTableRowProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_table_row.types';
import type { Coupon } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';
import type { MouseEvent } from 'react';

/** @description Renders one coupon row with navigation-safe inline actions. @dependencies Receives one feature-owned coupon record and mutation callbacks. @edge-case Edit/delete/toggle actions stop row propagation so row navigation is not triggered accidentally. */
export default function SuperadminBillingCouponsManagementTableRow({ coupon, onToggleStatus, onEdit, onDelete, onRestore }: SuperadminBillingCouponsTableRowProps) {
  const t = useTranslations('superadmin_coupons');
  const locale = useLocale();

    const cpn = coupon;
    const { confirm } = useConfirm();
    const handleShareWhatsApp = (e: MouseEvent, cpn: Coupon) => {
        e.stopPropagation();
        const dateStr = formatSuperadminBillingCouponsDisplayDate(cpn.expiryDate, locale);
        const discountStr = cpn.discountType === 'PERCENTAGE'
            ? `${cpn.discountValue}${t('ui.off_22958f9a')}`
            : `${SuperadminBillingCouponsFormatCurrency(cpn.discountValue, cpn.currency || 'INR', locale)} ${t('ui.off_88559a0c')}`;
        const waText = SuperadminBillingCouponsWhatsAppReceiptFormatter({
            dateLabel: t('ui.whatsapp_date_label'),
            customerInfoTitle: t('ui.whatsapp_customer_info'),
            title: t('ui.whatsapp_coupon_title'),
            subtitle: t('ui.whatsapp_coupon_subtitle'),
            sections: [
                {
                    items: {
                        [t('ui.whatsapp_coupon_code')]: cpn.code,
                        [t('ui.whatsapp_discount')]: discountStr,
                    }
                },
                {
                    title: t('ui.whatsapp_coupon_details'),
                    items: {
                        [t('ui.whatsapp_valid_until')]: dateStr,
                        [t('ui.whatsapp_remaining')]: t('ui.whatsapp_remaining_count', { count: Math.max(0, cpn.maxUses - cpn.currentUses) }),
                    }
                }
            ],
            footer: t('ui.whatsapp_apply_footer')
        });
        window.open(SUPERADMIN_BILLING_COUPONS_MANAGEMENT_EXTERNAL.WHATSAPP_SHARE(waText), '_blank', 'noopener,noreferrer');
    };
    return (<tr tabIndex={0} aria-label={t('ui.edit_coupon_aria', { code: cpn.code })} className={`hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${cpn.isDeleted ? 'opacity-50 grayscale' : ''}`} onClick={() => { if (!cpn.isDeleted)
        onEdit(cpn); }} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (!cpn.isDeleted && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onEdit(cpn); } }} data-testid={`superadmin_coupons-table-row-${cpn.id}`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary tracking-wide">
        {cpn.code}
        {cpn.isDeleted && <span className="ms-2 text-xs bg-danger-bg text-danger px-2 py-0.5 rounded-full">{t('ui.deleted_63c2867f')}</span>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
        {cpn.discountType === 'PERCENTAGE'
            ? <span className="font-semibold text-success">{cpn.discountValue}{t('ui.off_22958f9a')}</span>
            : <span className="font-semibold text-success">{SuperadminBillingCouponsFormatCurrency(cpn.discountValue, cpn.currency || 'INR', locale)} {t('ui.off_88559a0c')}</span>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">{cpn.currentUses} {t('ui.text_6666cd76')}{cpn.maxUses}</td>
      <td className="px-6 py-4 whitespace-nowrap"><SuperadminBillingCouponsStatusBadge status={coupon.status}/></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">{formatSuperadminBillingCouponsDisplayDate(cpn.expiryDate, locale)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-end flex items-center justify-end gap-2">
        {cpn.isDeleted ? (<button type="button" title={t('ui.restore_coupon_01ab5a58')} aria-label={t('ui.restore_coupon_01ab5a58')} onClick={(e) => { e.stopPropagation(); onRestore(cpn.id); }} className="inline-flex min-h-11 min-w-11 items-center justify-center text-secondary hover:text-success motion-safe:transition-colors p-1.5 bg-input hover:bg-success-bg rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-table-row-table-row-restore-coupon">
            <RefreshCw size={18}/>
          </button>) : (<>
            <button type="button" title={t('ui.share_coupon_7875bd43')} aria-label={t('ui.share_coupon_7875bd43')} onClick={(e) => handleShareWhatsApp(e, cpn)} className="inline-flex min-h-11 min-w-11 items-center justify-center text-secondary hover:text-success motion-safe:transition-colors p-1.5 bg-input hover:bg-success-bg rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-table-row-table-row-share-coupon">
              <MessageCircle size={18}/>
            </button>
            <button type="button" title={cpn.status === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE ? t('ui.deactivate_coupon_2e7b1c3d') : t('ui.activate_coupon_4d9a2f1b')} aria-label={cpn.status === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE ? t('ui.deactivate_coupon_2e7b1c3d') : t('ui.activate_coupon_4d9a2f1b')} onClick={(e) => { e.stopPropagation(); onToggleStatus(cpn.id, cpn.status); }} disabled={cpn.status === SUPERADMIN_COUPON_STATUS_CODES.EXPIRED || cpn.status === SUPERADMIN_COUPON_STATUS_CODES.DEPLETED} className={`inline-flex min-h-11 min-w-11 items-center justify-center p-1.5 rounded-md border border-border motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out ${(() => { if (cpn.status === SUPERADMIN_COUPON_STATUS_CODES.EXPIRED || cpn.status === SUPERADMIN_COUPON_STATUS_CODES.DEPLETED) { return ('opacity-30 cursor-not-allowed bg-input'); } if (cpn.status === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE) { return ('text-success hover:text-success'); } return ('text-secondary hover:text-primary bg-input hover:bg-surface-hover'); })()} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`} data-testid="superadmin_coupons-superadmin-coupons-table-row-coupons-table-row-button">
              {cpn.status === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE ? <ToggleRight size={18}/> : <ToggleLeft size={18}/>}
            </button>
            <button type="button" title={t('ui.edit_coupon_5a092977')} aria-label={t('ui.edit_coupon_5a092977')} onClick={(e) => { e.stopPropagation(); onEdit(cpn); }} className="inline-flex min-h-11 min-w-11 items-center justify-center text-secondary hover:text-primary motion-safe:transition-colors p-1.5 bg-input hover:bg-primary-subtle rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-table-row-table-row-edit-coupon">
              <Edit2 size={18}/>
            </button>
            <button type="button" title={t('ui.view_history_db9c40b5')} aria-label={t('ui.view_history_db9c40b5')} onClick={(e) => {
                e.stopPropagation();
                // Custom event to trigger drawer in Client
                document.dispatchEvent(new CustomEvent('open-coupon-history', { detail: cpn }));
            }} className="inline-flex min-h-11 min-w-11 items-center justify-center text-secondary hover:text-info motion-safe:transition-colors p-1.5 bg-input hover:bg-info-bg rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-table-row-table-row-view-history">
              <History size={18}/>
            </button>
            <button type="button" title={t('ui.delete_coupon_7f246b13')} aria-label={t('ui.delete_coupon_7f246b13')} onClick={async (e) => {
                e.stopPropagation();
                const ok = await confirm({
                    title: t('ui.confirm_delete_coupon_title_repair'),
                    message: t('ui.confirm_delete_coupon_message_repair', { code: cpn.code }),
                    type: 'danger',
                    confirmText: t('ui.delete_action_repair')
                });
                if (ok) {
                    onDelete(cpn.id);
                }
            }} className="inline-flex min-h-11 min-w-11 items-center justify-center text-secondary hover:text-danger motion-safe:transition-colors p-1.5 bg-input hover:bg-danger-bg rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-table-row-table-row-delete-coupon">
              <Trash2 size={18}/>
            </button>
          </>)}
      </td>
    </tr>);
}

