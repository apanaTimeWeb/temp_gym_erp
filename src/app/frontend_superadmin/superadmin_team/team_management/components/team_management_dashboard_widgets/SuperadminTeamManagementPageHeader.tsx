// RESPONSIBILITY: Renders/orchestrates SuperadminTeamPageHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminTeamSectionProps } from '@/app/frontend_superadmin/superadmin_team/team_management/types/superadmin_team_management.types';

export default function SuperadminTeamManagementPageHeader({ data }: SuperadminTeamSectionProps) {
  const t = useTranslations('superadmin_team');
  return (
    <section className="relative overflow-hidden rounded-2xl border border-indigo-500/35 bg-card dark:bg-gradient-to-br dark:from-[#161B33] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex items-center justify-between gap-4">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#818CF8] via-[#A855F7] to-[#38BDF8]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary">{t('ui.platform_team_0225e1f8')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.internal_access_operator_roles_active_accoun_c46895b6')}</p>
      </div>
      <span className="p-3 rounded-xl border border-indigo-500/35 bg-indigo-500/15 text-indigo-500 dark:text-indigo-300 shrink-0" aria-hidden="true">
        <Briefcase size={20} strokeWidth={2.2} />
      </span>
    </section>
  );
}
