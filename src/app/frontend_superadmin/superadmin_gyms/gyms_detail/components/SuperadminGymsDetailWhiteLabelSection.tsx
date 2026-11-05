// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymDetailWhiteLabelSection within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailWhiteLabelSection owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_white_label_section.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders read-only brand identity information and points users to the owning White-labeling feature.
import { Link as LinkIcon, Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminGymsGymDetailWhiteLabelSectionProps } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_white_label_section.types';


/**
 * @description Renders GymsGymDetailWhiteLabelSection within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDetailWhiteLabelSection({ gym }: SuperadminGymsGymDetailWhiteLabelSectionProps) {
  const t = useTranslations('superadmin_gyms');
  return <div className="space-y-6 rounded-xl border border-border bg-card p-8"><div className="flex items-start gap-3 border-b border-border pb-6"><div className="rounded-lg bg-primary-subtle p-3 text-primary"><Palette size={18} strokeWidth={2} aria-hidden="true"/></div><div><h2 className="mb-2 text-xl font-bold text-primary">{t('ui.brand_identity_a0ed68f7')}</h2><p className="text-sm text-secondary">{t('ui.branding_controls_are_intentionally_read_onl_0ae48a8c')}</p></div></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><div className="rounded-lg border border-border bg-floating p-4"><p className="text-xs uppercase tracking-wider text-secondary">{t('ui.gym_3372bcee')}</p><p className="mt-1 truncate font-semibold text-primary" title={gym.gymName}>{gym.gymName}</p></div><div className="rounded-lg border border-border bg-floating p-4"><p className="text-xs uppercase tracking-wider text-secondary">{t('ui.plan_0b6cbdf7')}</p><p className="mt-1 font-semibold text-primary">{gym.plan}</p></div><div className="rounded-lg border border-border bg-floating p-4"><p className="text-xs uppercase tracking-wider text-secondary">{t('ui.status_ec53a8c4')}</p><p className="mt-1 font-semibold text-primary">{gym.status}</p></div></div><div className="rounded-lg border border-border bg-warning-bg p-4 text-sm text-warning"><div className="flex items-center gap-2"><LinkIcon size={18} strokeWidth={2} aria-hidden="true"/><span>{t('ui.use_the_dedicated_white_labeling_module_for__cc980d72')}</span></div></div></div>;
}
