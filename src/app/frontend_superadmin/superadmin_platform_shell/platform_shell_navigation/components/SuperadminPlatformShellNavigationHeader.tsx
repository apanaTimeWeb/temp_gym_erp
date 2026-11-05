// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformShellNavigationHeader owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: usePathname
 * MODULE DEPENDENCIES: next/navigation, lucide-react, next-intl, @/components/ThemeToggle, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationHeaderProfile, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_route_header_config.constants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the single persistent fixed Superadmin shell header. It owns shell controls only; feature business logic stays inside feature modules.
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/ThemeToggle';

import { SuperadminPlatformShellNavigationHeaderProfile } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationHeaderProfile';
import { getSuperadminRouteHeaderConfig } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_route_header_config.constants';


/**
 * @description Renders the single persistent fixed Superadmin shell header. It owns shell controls only; feature business logic stays inside feature modules.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
/**
 * @description Renders LayoutHeader within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformShellNavigationHeader() {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const pathname = usePathname();
  const { titleKey, subtitleKey } = getSuperadminRouteHeaderConfig(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16 bg-header-translucent backdrop-blur-md border-b border-border px-6 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base bg-input hover:bg-surface-hover rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
          id="superadmin-sidebar-toggle" aria-label={t('ui.toggle_sidebar_d4bbf74f')}
         data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-superadmin-header-toggle-sidebar">
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-primary truncate">{t(titleKey)}</h1>
          <p className="text-sm text-secondary truncate mt-0.5">{t(subtitleKey)}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:gap-3">
        <ThemeToggle />
        <SuperadminPlatformShellNavigationHeaderProfile />
      </div>
    </header>
  );
}
