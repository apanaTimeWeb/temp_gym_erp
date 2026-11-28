"use client";
// RESPONSIBILITY: Renders localized breadcrumb context for the active Trainer role destination.
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TRAINER_ROUTE_TITLE_MAP } from '@/app/frontend_trainer/trainer_navigation/config/TrainerNavigationConstants';
import { TRAINER_DASHBOARD_PAGE_LIST } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';

/** Shows the dashboard parent and current destination using the canonical feature route metadata. */
export default function TrainerNavigationBreadcrumbs() {
  const t = useTranslations('TRAINER_SHELL');
  const pathname = usePathname();
  const baseRoute = Object.keys(TRAINER_ROUTE_TITLE_MAP).find(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  ) ?? TRAINER_DASHBOARD_PAGE_LIST;
  const currentTitleKey = TRAINER_ROUTE_TITLE_MAP[baseRoute]?.titleKey ?? 'TEXT_DEFAULT_SHELL_TITLE';
  const isDashboard = baseRoute === TRAINER_DASHBOARD_PAGE_LIST;

  if (isDashboard) return null;

  return (
    <nav
      aria-label={t('TEXT_BREADCRUMBS')}
      data-testid="trainer_navigation-breadcrumbs"
      className="px-4 sm:px-6 pt-3 pb-1 text-sm"
    >
      <ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-secondary">
        <li className="inline-flex min-w-0 items-center gap-1">
          <Link
            href={TRAINER_DASHBOARD_PAGE_LIST}
            className="inline-flex min-h-9 items-center rounded-lg px-2.5 py-1 text-orange-500 bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            {t('TEXT_NAV_DASHBOARD')}
          </Link>
          <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" className="shrink-0 text-orange-400/70 rtl:rotate-180" />
        </li>
        <li aria-current="page" className="inline-flex min-h-9 min-w-0 items-center gap-2 rounded-lg px-3 py-1 bg-card dark:bg-gradient-to-r dark:from-[#162035] dark:to-[#101726] border border-border dark:border-white/15 font-semibold text-text-primary shadow-sm">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#EC4899] shrink-0 shadow-[0_0_8px_rgba(255,90,31,0.65)]" aria-hidden="true" />
          <span className="truncate">{t(currentTitleKey)}</span>
        </li>
      </ol>
    </nav>
  );
}
