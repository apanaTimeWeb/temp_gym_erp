// RESPONSIBILITY: Renders/orchestrates SuperadminGymsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsEmptyState owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the empty state UI for the Gyms table when no gyms match the current search. Shows icon, message, and search adjustment hint.
import { Ban } from 'lucide-react';
import { useTranslations } from 'next-intl';


/**
 * @description Renders GymsEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryEmptyState() {
  const t = useTranslations('superadmin_gyms');
    return (<div className="p-12 flex flex-col items-center text-secondary" data-testid="superadmin_gyms-superadmin-gyms-empty-state-gyms-empty-state-empty">
      <div className="bg-card p-4 rounded-full border border-border mb-3" data-testid="superadmin_gyms-gymsemptystate-state">
        <Ban size={18} className="opacity-50"/>
      </div>
      <h3 className="text-base font-medium text-primary">{t('ui.no_gyms_found_ce3950ee')}</h3>
      <p className="text-sm mt-1 max-w-sm text-center">{t('ui.we_couldn_apos_t_find_any_gyms_matching_your_515559aa')}</p>
    </div>);
}
