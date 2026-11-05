// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesTable within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls.
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminAffiliatesEmptyState from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_empty_state/SuperadminAffiliatesManagementEmptyState';
import SuperadminAffiliatesTableRow from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_table/SuperadminAffiliatesManagementTableRow';

import type { SuperadminAffiliatesTableProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_table.types';



/**
 * @description Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */

const MOBILE_CARD_TABLE_CLASSES = [
  'w-full text-start border-collapse max-md:block max-md:min-w-0',
  'max-md:[&_thead]:sr-only max-md:[&_tbody]:block',
  'max-md:[&_tbody_tr]:mb-3 max-md:[&_tbody_tr]:grid max-md:[&_tbody_tr]:grid-cols-1 max-md:[&_tbody_tr]:w-full',
  'max-md:[&_tbody_tr]:rounded-lg max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-card',
  'max-md:[&_tbody_td]:grid max-md:[&_tbody_td]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-md:[&_tbody_td]:gap-3',
  'max-md:[&_tbody_td]:w-full max-md:[&_tbody_td]:border-0 max-md:[&_tbody_td]:p-3',
  'max-md:[&_tbody_td::before]:content-[attr(data-mobile-label)] max-md:[&_tbody_td::before]:text-secondary',
  'max-md:[&_tbody_td::before]:text-xs max-md:[&_tbody_td::before]:font-semibold max-md:[&_tbody_td::before]:uppercase',
].join(' ');

export default function SuperadminAffiliatesManagementTable({ affiliates, onToggleStatus, onEdit, onDelete, onAddClick, onPayCommission, currentPage, totalPages, setPage }: SuperadminAffiliatesTableProps) {
  const t = useTranslations('superadmin_affiliates');
    return (<div className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className={`w-full text-start border-collapse ${MOBILE_CARD_TABLE_CLASSES}`}>
          <thead>
            <tr className="bg-primary-subtle border-b border-border" data-testid="superadmin_affiliates-superadmin-affiliates-table-affiliates-table-action-1">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.partner_name_d78e689')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.referral_code_aaebd49')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.referral_count_63d1eb0')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.join_rate_026e96a')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.commission_earned_d380da6')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.status_1b84b5c')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-end">{t('ui.actions_56ec880')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {affiliates.length === 0 ? (<tr data-testid="superadmin_affiliates-superadmin-affiliates-table-affiliates-table-action-2">
                <td colSpan={7} data-mobile-label={t('ui.mobile_partner_name')}><SuperadminAffiliatesEmptyState onAddClick={onAddClick}/></td>
              </tr>) : (affiliates.map((aff) => (<SuperadminAffiliatesTableRow key={aff.id} affiliate={aff} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} onPayCommission={onPayCommission}/>)))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} data-testid="superadmin_affiliates-superadmin-affiliates-table-superadmin-affiliates-table-pagination"/>
    </div>);
}
