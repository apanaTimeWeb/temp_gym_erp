'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const LINKS = [
  { key: 'WORKOUT_PLANS', href: '/frontend_manager/manager_workout_diet_library/workout_plan_management', testId: 'manager_manager_workout_diet_library-layout-link-workout_plan_management' },
  { key: 'ASSIGNED_PLANS', href: '/frontend_manager/manager_workout_diet_library/assigned_workout_plans', testId: 'manager_manager_workout_diet_library-layout-link-assigned_workout_plans' },
  { key: 'EXERCISE_LIBRARY', href: '/frontend_manager/manager_workout_diet_library/exercise_library', testId: 'manager_manager_workout_diet_library-layout-link-exercise_library' },
  { key: 'DIET_LIBRARY', href: '/frontend_manager/manager_workout_diet_library/library_diet_plans', testId: 'manager_manager_workout_diet_library-layout-link-library_diet_plans' },
] as const;

export default function ManagerWorkoutDietLibraryDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_WORKOUT_DIET_LIBRARY_NAVIGATION');
  const pathname = usePathname();
  return (
    <section aria-label={t('DOMAIN_LABEL')} className="min-h-full">
      <nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border bg-card px-6 py-3">
        {LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined} className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${isActive ? 'bg-primary-subtle text-primary' : 'text-text-secondary hover:bg-input hover:text-text-primary'}`} data-testid={link.testId}>
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
      {children}
    </section>
  );
}
