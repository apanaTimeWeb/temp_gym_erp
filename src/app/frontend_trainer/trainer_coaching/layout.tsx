"use client";
// RESPONSIBILITY: Secondary navigation for the current Trainer domain only.
// Each link points to an independently mounted autonomous feature route.
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TRAINER_WORKOUT_PAGE_LIST as route0 } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';
import { TRAINER_WORKOUT_PAGE_LIST as route1 } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/trainer_coaching_exercise_management.url_config';
import { TRAINER_LIBRARY_PAGE_LIST as route2 } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/trainer_coaching_diet_library_and_assignments.url_config';
import { TRAINER_SESSIONS_PAGE_LIST as route3 } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';
import { TRAINER_PROGRESS_TRACKING_PAGE_LIST as route4 } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';
import { TRAINER_PROGRESS_TRACKING_PAGE_LIST as route5 } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/config/trainer_coaching_progress_comparison.url_config';

const domainLinks = [
  { href: route0, key: 'NAV_COACHING_PLANS' },
  { href: route1, key: 'NAV_COACHING_EXERCISES' },
  { href: route2, key: 'NAV_COACHING_DIET' },
  { href: route3, key: 'NAV_COACHING_SESSIONS' },
  { href: route4, key: 'NAV_COACHING_INDIVIDUAL' },
  { href: route5, key: 'NAV_COACHING_COMPARISON' },
] as const;

export default function TrainerDomainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('TRAINER_SHELL');
  return (
    <div className="min-h-full">
      <nav aria-label={t('TEXT_TRAINER_NAVIGATION')} className="flex gap-2 overflow-x-auto border-b border-border bg-card px-3 py-2" data-testid="trainer-domain-secondary-nav">
        {domainLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-lg border px-4 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${active ? 'border-focus bg-primary-subtle text-primary' : 'border-transparent text-secondary hover:bg-primary-subtle hover:text-primary'}`}>
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
