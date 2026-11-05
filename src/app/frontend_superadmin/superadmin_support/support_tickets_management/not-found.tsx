// RESPONSIBILITY: Renders/orchestrates not-found within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the superadmin_support_tickets route-segment not-found state and provides the documented recovery navigation.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/config/superadmin_support_tickets_management.url_config';



/**
 * @description Renders the recoverable not-found state for the superadmin_support_tickets route segment.
 * @dependencies Uses only module-local translations and centralized route configuration.
 * @edge-case Provides keyboard-focus-visible navigation back to the owning module without exposing route internals.
 */
export default function SuperadminSupportTicketsNotFound() {
  const t = useTranslations('superadmin_support_tickets');
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center" data-testid="superadmin_support_tickets-not-found-superadmin_support_tickets-not-found-state">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-floating" aria-hidden="true" data-testid="superadmin_support_tickets-not-found-not-found-not-found">
        <span className="text-2xl font-bold text-secondary">{t('ui.404_4f4adcbf')}</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary">{t('ui.page_not_found_title_v3')}</h2>
        <p className="mt-1 max-w-md text-sm text-secondary">{t('ui.page_not_found_message_v3')}</p>
      </div>
      <Link href={SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_ROUTES.MAIN} data-testid="superadmin_support_tickets-not-found-superadmin_support_tickets-not-found-back" className="min-h-11 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t('ui.back_to_module_v3')}</Link>
    </div>
  );
}
