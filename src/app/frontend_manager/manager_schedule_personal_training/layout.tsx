import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export default function ManagerSchedulePersonalTrainingDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_SCHEDULE_PERSONAL_TRAINING_NAVIGATION');
 return <section aria-label={t('DOMAIN_LABEL')} className="min-h-full"><nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        <a href="/frontend_manager/manager_schedule_personal_training/trainer_schedule" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_schedule_personal_training-layout-link-trainer_schedule">{t('TRAINER_SCHEDULE')}</a>
        <a href="/frontend_manager/manager_schedule_personal_training/pt_assignments" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_schedule_personal_training-layout-link-pt_assignments">{t('PERSONAL_TRAINING')}</a>
</nav>{children}</section>;
}
