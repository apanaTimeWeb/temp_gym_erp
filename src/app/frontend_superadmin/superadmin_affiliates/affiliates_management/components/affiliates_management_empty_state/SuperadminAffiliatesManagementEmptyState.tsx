// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the empty state UI for the Affiliates table when no affiliates exist. Shows icon, message, and CTA to add first affiliate.
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminAffiliatesEmptyStateProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_empty_state.types';



/**
 * @description Renders the empty state UI for the Affiliates table when no affiliates exist. Shows icon, message, and CTA to add first affiliate.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAffiliatesManagementEmptyState({ onAddClick }: SuperadminAffiliatesEmptyStateProps) {
  const t = useTranslations('superadmin_affiliates');
    return (<div className="flex flex-col items-center justify-center py-16 text-center" data-testid="superadmin_affiliates-superadmin-affiliates-empty-state-affiliates-empty-state-empty">
      <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4" data-testid="superadmin_affiliates-affiliatesemptystate-state">
        <Users size={18} className="text-secondary opacity-50"/>
      </div>
      <h3 className="text-base font-semibold text-primary">{t('ui.no_affiliates_yet_87b9801')}</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">{t('ui.add_your_first_affiliate_partner_to_start_tracki_0e61f8c')}</p>
      <button type="button" onClick={onAddClick} className="min-h-11 mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary text-sm font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_affiliates-superadmin-affiliates-empty-state-affiliates-empty-state-add">
        
        {t('ui.add_first_affiliate_944fe87')}
      </button>
    </div>);
}
