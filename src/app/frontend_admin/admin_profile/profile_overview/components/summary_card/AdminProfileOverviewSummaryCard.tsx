"use client";
// RESPONSIBILITY: Renders the AdminProfileOverviewSummaryCard UI surface for profile_overview; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → AdminProfileOverviewSummaryCard → accessible UI/events routed to owning hooks (admin_profile/profile_overview/components/summary_card/AdminProfileOverviewSummaryCard.tsx)

import { useTranslations } from 'next-intl';
import { displayValue } from '@/app/frontend_admin/admin_profile/profile_overview/utils/AdminProfileOverviewDisplayValue';
import type { AdminProfileSummaryCardProps } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewComponentPropsTypes';


/** Renders the localized Admin profile heading and summary without inventing a user status absent from the profile contract. 
 * @description AdminProfileOverviewSummaryCard renders the ProfileOverviewSummaryCard interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminProfileOverviewSummaryCard({ profile, displayInitial }: AdminProfileSummaryCardProps) {
  const t = useTranslations();
  return (
    <>
      <header>
        <h1 className="text-page-title font-bold text-primary">{t('profile.admin_profile_main.text_9ba8d391c5')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('profile.admin_profile_main.text_28dfd9f67e')}</p>
      </header>
      <section className="flex items-center gap-5 rounded-xl border border-border bg-primary-subtle p-6 shadow-card" aria-label={t('profile.admin_profile_main.text_9ba8d391c5')}>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-on-primary">{displayInitial}</div>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-primary">{displayValue(profile?.name)}</p>
          <p className="truncate text-sm text-secondary">{displayValue(profile?.email)}</p>
        </div>
      </section>
    </>
  );
}
