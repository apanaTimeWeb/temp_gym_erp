// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesTableRow within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders a single row in the Affiliates data table. Handles row-level action buttons with stopPropagation. Purely presentational.
import { Pencil, Trash2, Power, Check, Banknote } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import Tooltip from '@/components/ui/Tooltip';

import SuperadminAffiliatesAffiliateStatusBadge from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_status_badge/SuperadminAffiliatesManagementAffiliateStatusBadge';
import { SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';
import { SuperadminAffiliatesFormatCurrency } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormatCurrency';
import { superadminAffiliatesMaskEmail } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormatters';

import type { SuperadminAffiliatesTableRowProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_table_row.types';


/**
 * @description Renders a single row in the Affiliates data table. Handles row-level action buttons with stopPropagation. Purely presentational.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAffiliatesManagementTableRow({ affiliate: aff, onToggleStatus, onEdit, onDelete, onPayCommission }: SuperadminAffiliatesTableRowProps) {
  const t = useTranslations('superadmin_affiliates');
    const locale = useLocale();
    const { confirm } = useConfirm();

    return (<tr tabIndex={0} aria-label={t('ui.a11y_edit_affiliate', { name: aff.name })} data-testid={`superadmin_affiliates-table-row-${aff.id}-edit`} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset" onClick={() => onEdit(aff)} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onEdit(aff); } }}>
      <td className="px-6 py-4" data-mobile-label={t('ui.mobile_field_1')}>
        <div className="flex flex-col">
          <Tooltip content={aff.name}><span className="text-sm font-medium text-primary truncate">{aff.name}</span></Tooltip>
          <Tooltip content={superadminAffiliatesMaskEmail(aff.email)}><span className="text-xs text-secondary truncate">{superadminAffiliatesMaskEmail(aff.email)}</span></Tooltip>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm" data-mobile-label={t('ui.mobile_field_2')}>
        <span className="px-2 py-1 bg-floating rounded text-secondary font-mono">{aff.referralCode}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary" data-mobile-label={t('ui.mobile_field_3')}>
        {aff.referralCount ?? aff.totalReferred}  {t('ui.superadmin_gyms_f12fa9a')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary" data-mobile-label={t('ui.mobile_field_4')}>
        {aff.conversionRate !== undefined ? t('ui.conversion_rate_percent', { value: aff.conversionRate }) : t('ui.not_available_dash')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-medium" data-mobile-label={t('ui.mobile_field_5')}>
        {SuperadminAffiliatesFormatCurrency(aff.commissionEarned, aff.currency || 'INR', locale)}
        {aff.pendingPayout ? (<span className="ms-2 text-xs text-warning">{t('ui.text_84c40473')}{SuperadminAffiliatesFormatCurrency(aff.pendingPayout, aff.currency || 'INR', locale)}  {t('ui.pending_07d235c')}</span>) : null}
      </td>
      <td className="px-6 py-4 whitespace-nowrap" data-mobile-label={t('ui.mobile_field_6')}>
        <SuperadminAffiliatesAffiliateStatusBadge status={aff.status}/>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-end text-sm" data-mobile-label={t('ui.mobile_field_7')}>
        <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity">
          <button  type="button" onClick={(e) => { e.stopPropagation(); onToggleStatus(aff.id, aff.status); }} className="min-w-11 min-h-11 p-1.5 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={aff.status === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.suspend_affiliate_action') : t('ui.activate_affiliate_action')} aria-label={aff.status === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.a11y_suspend_affiliate', { name: aff.name }) : t('ui.a11y_activate_affiliate', { name: aff.name })} data-testid="superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-action1">
            {aff.status === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? <Power size={18}/> : <Check size={18}/>}
          </button>
          {onPayCommission && (aff.pendingPayout ?? 0) > 0 && (<button  type="button" onClick={async (e) => {
                e.stopPropagation();
                const ok = await confirm({
                    title: t('ui.confirm_pay_commission_title'),
                    message: t('ui.confirm_pay_commission_message', { amount: SuperadminAffiliatesFormatCurrency(aff.pendingPayout || 0, aff.currency || 'INR', locale), name: aff.name }),
                    type: 'warning',
                    confirmText: t('ui.pay_now_action'),
                });
                if (ok)
                    onPayCommission(aff);
            }} className="min-w-11 min-h-11 p-1.5 text-secondary hover:text-success motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.pay_commission_060eaae')} aria-label={t('ui.a11y_pay_commission', { name: aff.name })} data-testid="superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-control">
              <Banknote size={18}/>
            </button>)}
          <button  type="button" onClick={(e) => { e.stopPropagation(); onEdit(aff); }} className="min-w-11 min-h-11 p-1.5 text-secondary hover:text-info motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.edit_affiliate_9d2f00b')} aria-label={t('ui.a11y_edit', { name: aff.name })} data-testid="superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-edit">
            <Pencil size={18}/>
          </button>
          <button  type="button" onClick={(e) => { e.stopPropagation(); onDelete(aff.id); }} className="min-w-11 min-h-11 p-1.5 text-secondary hover:text-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.delete_affiliate_34eb6d1')} aria-label={t('ui.a11y_delete', { name: aff.name })} data-testid="superadmin_affiliates-superadmin-affiliates-table-row-affiliates-affiliates-table-delete">
            <Trash2 size={18}/>
          </button>
        </div>
      </td>
    </tr>);
}
