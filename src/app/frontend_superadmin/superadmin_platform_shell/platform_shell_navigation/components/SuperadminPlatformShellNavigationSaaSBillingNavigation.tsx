// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationSaaSBillingNavigation within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformShellNavigationSaaSBillingNavigation owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: usePathname, useRouter
 * MODULE DEPENDENCIES: next/navigation, next-intl, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_saa_s_billing.constants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin SaaS Billing sub-navigation and performs client-side route transitions only.
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_saa_s_billing.constants';


/**
 * @description Renders SaaSBillingNavigation within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformShellNavigationSaaSBillingNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');

  return (
    <nav aria-label={t('navigation.saaS_billing_sections')} className="flex w-full flex-wrap overflow-x-auto border-b border-border">
      {SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS.map(({ nameKey, href, icon: Icon, routeMatch }) => {
        const active = Boolean(pathname && (pathname === routeMatch || pathname.startsWith(`${routeMatch}/`)));
        return (
          <button
            key={nameKey}
            type="button"
            onClick={() => router.push(href)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-11 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-focus text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}
           data-testid={`SuperadminPlatformShellLayoutStyles-saas-billing-navigation-${nameKey}` }>
            <Icon size={18} aria-hidden="true" />
            {t(`navigation.${nameKey}`)}
          </button>
        );
      })}
    </nav>
  );
}

