// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesAffiliateStatusBadge within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the status badge pill for a single affiliate. Purely presentational — maps AffiliateStatus to design system colors.
import { useTranslations } from 'next-intl';

import { SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';

import type { SuperadminAffiliatesAffiliateStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_affiliate_status_badge.types';



/**
 * @description Renders the status badge pill for a single affiliate. Purely presentational — maps AffiliateStatus to design system colors.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAffiliatesManagementAffiliateStatusBadge({ status }: SuperadminAffiliatesAffiliateStatusBadgeProps) {
  const t = useTranslations('superadmin_affiliates');
    switch (status) {
        case SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE:
            return <span data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-status-badge-superadmin_affiliates-affiliates-superadminaffiliatestatusbadge-status" className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success">{t('ui.active_8b4e3d3')}</span>;
        case SUPERADMIN_AFFILIATE_STATUS_CODES.INACTIVE:
            return <span data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-status-badge-affiliates-superadminaffiliatestatusbadge-status-secondary" className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-highlight text-secondary">{t('ui.inactive_b59b691')}</span>;
        default:
            return null;
    }
}
