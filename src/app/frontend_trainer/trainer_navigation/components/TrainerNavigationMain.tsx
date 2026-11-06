"use client";
// RESPONSIBILITY: Client-only authenticated Trainer shell; owns sidebar UI state and derives the current route's presentation metadata.
/**
 * @description Renders the authenticated Trainer shell and connects role-owned navigation with approved global feedback/realtime infrastructure.
 * @dependencies Uses feature-owned route contracts, the navigation shell components, confirmation/toast infrastructure, and the centralized Trainer socket provider.
 * @edge-cases Preserves collapsed-sidebar state, nested route title resolution, fixed shell offsets, and safe recovery around child route errors.
 */
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { usePathname } from 'next/navigation';

import { TRAINER_ROUTE_TITLE_MAP } from '@/app/frontend_trainer/trainer_navigation/config/TrainerNavigationConstants';

import { TrainerNavigationConfirmProvider } from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationConfirmProvider';

import TrainerNavigationToastHost from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationToastHost';

import TrainerNavigationBreadcrumbs from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationBreadcrumbs';

import TrainerNavigationCommandPalette from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationCommandPalette';

import TrainerNavigationHeader from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationHeader';

import '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationShell.css';

import TrainerNavigationSidebar from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationSidebar';

import TrainerNavigationSocketProvider from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationSocketProvider';

import type { TrainerNavigationMainProps } from '@/app/frontend_trainer/trainer_navigation/types/TrainerNavigationTypes';

/**
 * @description Owns TrainerNavigationMain behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Owns the Trainer role shell composition and collapsed-sidebar state while leaving feature behavior, state, and data ownership inside each feature module.
 * @dependencies Consumes role-owned navigation components and approved zero-business infrastructure providers/primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNavigationMain({ children }: TrainerNavigationMainProps) {
  const t = useTranslations('TRAINER_SHELL');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const pathname = usePathname();

  // Effect contract: keep drawer semantics aligned with the sidebar CSS breakpoint and close mobile navigation when returning to desktop.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 767px)') : null;
    const syncViewport = () => {
      const matches = mediaQuery ? mediaQuery.matches : window.innerWidth < 768;
      setIsMobileViewport(matches);
      if (!matches) setIsMobileOpen(false);
    };
    syncViewport();
    if (mediaQuery) {
      mediaQuery.addEventListener('change', syncViewport);
      return () => mediaQuery.removeEventListener('change', syncViewport);
    }
  }, []);

  const handleToggleSidebar = () => {
    if (isMobileViewport) {
      setIsMobileOpen((current) => !current);
      return;
    }
    setIsCollapsed((current) => !current);
  };
  const baseRoute = Object.keys(TRAINER_ROUTE_TITLE_MAP).find((route) => pathname === route || pathname.startsWith(`${route}/`)) ?? '';
  const headerProps = TRAINER_ROUTE_TITLE_MAP[baseRoute] ?? { titleKey: 'TEXT_GYMSMART_TRAINER', subtitleKey: 'TEXT_DEFAULT_SHELL_SUBTITLE' };

  return (
    <TrainerNavigationConfirmProvider>
      <TrainerNavigationSocketProvider>
      <div className="min-h-screen bg-page text-primary">
        <a
          href="#trainer-main-content"
          className="sr-only focus:not-sr-only focus:inline-flex focus:fixed focus:start-3 focus:top-3 focus:z-skip-link focus:min-h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:font-semibold focus:text-on-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page"
          data-testid="trainer_navigation-skip_to_content"
        >
          {t('TEXT_SKIP_TO_MAIN_CONTENT')}
        </a>
        <TrainerNavigationCommandPalette />
        <TrainerNavigationHeader
          title={t(headerProps.titleKey)}
          subtitle={t(headerProps.subtitleKey)}
          isSidebarCollapsed={isCollapsed}
          isMobileSidebarOpen={isMobileOpen}
          isMobileViewport={isMobileViewport}
          onToggleSidebar={handleToggleSidebar}
        />
        <TrainerNavigationSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <div id="trainer-main-content" tabIndex={-1} className={`min-h-screen pt-16 trainer-shell-scrollbar overflow-y-auto motion-safe:transition-all motion-safe:duration-base motion-reduce:transition-none ${isCollapsed ? "trainer-shell-content-offset-collapsed" : "trainer-shell-content-offset"}`}>
          <TrainerNavigationBreadcrumbs />
          {children}
        </div>
        <TrainerNavigationToastHost />
      </div>
      </TrainerNavigationSocketProvider>
    </TrainerNavigationConfirmProvider>
  );
}
