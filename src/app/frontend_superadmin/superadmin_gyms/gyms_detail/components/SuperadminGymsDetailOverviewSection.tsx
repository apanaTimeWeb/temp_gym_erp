// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymDetailOverviewSection within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailOverviewSection owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/lib/formatters, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/utils/SuperadminGymsDetailFormatDate, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/utils/SuperadminGymsDetailFormatNumber, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailRow, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/constants/superadmin_gyms_detail.constants, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/utils/SuperadminGymsDetailFormatCurrency, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_overview_section.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the read-only Gym Detail overview KPI, owner/contact, and location/legal sections.
import { Activity, Clock, CreditCard, MapPin, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { displayValue } from '@/lib/display_value';

import SuperadminGymsGymDetailRow from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/components/SuperadminGymsDetailRow';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/constants/superadmin_gyms_detail.constants';
import { formatCurrency as SuperadminGymsFormatCurrency } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/utils/SuperadminGymsDetailFormatCurrency';
import { formatSuperadminGymsDate } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/utils/SuperadminGymsDetailFormatDate';
import { formatSuperadminGymsNumber } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/utils/SuperadminGymsDetailFormatNumber';

import type { SuperadminGymsGymDetailOverviewSectionProps } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_overview_section.types';


/**
 * @description Renders GymsGymDetailOverviewSection within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDetailOverviewSection({ gym, locale }: SuperadminGymsGymDetailOverviewSectionProps) {
  const t = useTranslations('superadmin_gyms');
  const cards = [
    { label: t('ui.members_ef53538a'), value: formatSuperadminGymsNumber(gym.memberCount, locale), icon: User, tone: 'bg-primary-subtle text-primary' },
    { label: t('ui.monthly_revenue'), value: SuperadminGymsFormatCurrency(gym.monthlyRevenue, gym.currency, locale), icon: CreditCard, tone: 'bg-success-bg text-success' },
    { label: t('ui.plan_0b6cbdf7'), value: displayValue(gym.plan).toUpperCase(), icon: Activity, tone: 'bg-purple-bg text-purple-text' },
    { label: t('ui.database_version'), value: displayValue(gym.databaseVersion), icon: Clock, tone: 'bg-warning-bg text-warning' },
  ];
  return <div className="space-y-6"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(({ label, value, icon: Icon, tone }) => <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"><div className={`rounded-lg p-3 ${tone}`}><Icon size={18} strokeWidth={2} aria-hidden="true" /></div><div className="min-w-0"><p className="text-xs uppercase tracking-wider text-secondary">{label}</p><p className="truncate text-2xl font-bold text-primary">{value}</p></div></div>)}</div><div className="grid grid-cols-1 gap-6 md:grid-cols-2"><div className="space-y-4 rounded-xl border border-border bg-card p-6"><h2 className="flex items-center gap-2 text-base font-semibold text-primary"><User size={18} strokeWidth={2} aria-hidden="true"/> {t('ui.owner_amp_contact_c9baefc0')}</h2><div className="space-y-3 text-sm"><SuperadminGymsGymDetailRow label={t('ui.owner_b6f4a2ec')} value={gym.ownerName}/><SuperadminGymsGymDetailRow label={t('ui.email_ce8ae9da')} value={gym.adminEmail}/><SuperadminGymsGymDetailRow label={t('ui.phone_bcc254b5')} value={gym.phone}/><SuperadminGymsGymDetailRow label={t('ui.onboarded_f8e5c8ad')} value={formatSuperadminGymsDate(gym.createdAt, locale)}/></div></div><div className="space-y-4 rounded-xl border border-border bg-card p-6"><h2 className="flex items-center gap-2 text-base font-semibold text-primary"><MapPin size={18} strokeWidth={2} aria-hidden="true"/> {t('ui.location_amp_legal_1e6f050f')}</h2><div className="space-y-3 text-sm"><SuperadminGymsGymDetailRow label={t('ui.city_57d056ed')} value={gym.city}/><SuperadminGymsGymDetailRow label={t('ui.state_46a2a41c')} value={gym.state}/><SuperadminGymsGymDetailRow label={t('ui.country_59716c97')} value={gym.country}/><SuperadminGymsGymDetailRow label={t('ui.gstin_8d85d689')} value={gym.gstin} emphasis={!gym.gstin}/>{gym.status === SUPERADMIN_GYM_STATUS_CODES.TRIAL && gym.trialEndsAt ? <SuperadminGymsGymDetailRow label={t('ui.trial_ends_01354510')} value={formatSuperadminGymsDate(gym.trialEndsAt, locale)} emphasisWarning/> : null}</div></div></div></div>;
}
