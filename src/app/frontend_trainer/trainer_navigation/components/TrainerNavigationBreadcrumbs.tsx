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

  return (
    <nav
      aria-label={t('TEXT_BREADCRUMBS')}
      data-testid="trainer_navigation-breadcrumbs"
      className="px-6 pt-3 pb-1 text-sm"
    >
      <ol className="flex min-w-0 flex-wrap items-center gap-1 text-secondary">
        {!isDashboard && (
          <li className="inline-flex min-w-0 items-center gap-1">
            <Link
              href={TRAINER_DASHBOARD_PAGE_LIST}
              className="inline-flex min-h-11 items-center rounded-md px-2 -ms-2 hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              {t('TEXT_NAV_DASHBOARD')}
            </Link>
            <ChevronRight size={16} strokeWidth={2} aria-hidden="true" className="shrink-0 rtl:rotate-180" />
          </li>
        )}
        <li aria-current="page" className="inline-flex min-h-11 min-w-0 items-center px-2 font-medium text-primary">
          <span className="truncate">{t(currentTitleKey)}</span>
        </li>
      </ol>
    </nav>
  );
}
