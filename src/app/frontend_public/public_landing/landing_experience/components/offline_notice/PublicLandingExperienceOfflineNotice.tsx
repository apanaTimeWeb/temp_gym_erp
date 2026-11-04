// RESPONSIBILITY: Renders the non-blocking connection-state notice used by network-backed PublicLanding forms.
'use client';

import { WifiOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** Renders a localized offline banner without owning or altering form state.
 * @dependencies next-intl and Lucide iconography only.
 * @edge-case The form remains mounted so typed values are preserved while the user is offline.
 */
export default function PublicLandingOfflineNotice() {
  const t = useTranslations('LANDING');
  return (
    <div role="status" aria-live="polite" data-testid="public_landing-offline-notice" className="mb-5 flex items-start gap-3 rounded-lg border border-border bg-warning-bg px-4 py-3 text-sm text-warning">
      <WifiOff size={18} strokeWidth={2} aria-hidden="true" />
      <span>{t('shared.offlineNotice')}</span>
    </div>
  );
}
