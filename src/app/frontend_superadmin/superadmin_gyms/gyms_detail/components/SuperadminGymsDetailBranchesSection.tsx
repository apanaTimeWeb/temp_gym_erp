// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymDetailBranchesSection within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailBranchesSection owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders read-only branch and franchise visibility for one Gym Detail record.
import { Building2, MapPin, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';


/**
 * @description Renders GymsGymDetailBranchesSection within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDetailBranchesSection() {
  const t = useTranslations('superadmin_gyms');
  const cards = [
    { labelKey: 'ui.gym_branch_total', noteKey: 'ui.gym_branch_total_note', icon: Building2 },
    { labelKey: 'ui.gym_branch_franchise_partners', noteKey: 'ui.gym_branch_franchise_note', icon: Ticket },
    { labelKey: 'ui.gym_branch_active_locations', noteKey: 'ui.gym_branch_active_note', icon: MapPin },
  ];
  return <div className="space-y-4"><div className="rounded-xl border border-border bg-card p-8 text-center"><Building2 size={18} strokeWidth={2} className="mx-auto mb-4 text-disabled" aria-hidden="true"/><h2 className="mb-2 text-xl font-bold text-primary">{t('ui.branch_amp_franchise_overview_1ed8e4fe')}</h2><p className="mx-auto max-w-md text-secondary">{t('ui.branch_and_franchise_management_is_handled_e_ae86071b')}</p></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{cards.map(({ labelKey, noteKey, icon: Icon }) => <div key={labelKey} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"><div className="rounded-lg bg-primary-subtle p-3 text-primary"><Icon size={18} strokeWidth={2} aria-hidden="true" /></div><div><p className="text-xs uppercase tracking-wider text-secondary">{t(labelKey)}</p><p className="text-2xl font-bold text-primary">{t('ui.text_26aeabd0')}</p><p className="mt-0.5 text-xs text-disabled">{t(noteKey)}</p></div></div>)}</div></div>;
}
