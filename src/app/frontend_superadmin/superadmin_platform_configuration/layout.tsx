"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

const NAVIGATION_ITEMS = [
  { labelKey: 'navigation.items.features', href: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management' },
  { labelKey: 'navigation.items.features', featureLabel: 'ui.release_notes_6cba0c4', href: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes' },
  { labelKey: 'navigation.items.integrations', href: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management' },
  { labelKey: 'navigation.items.settings', href: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general' },
  { labelKey: 'navigation.items.white_labeling', href: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings' },
] as const;

function SuperadminPlatformConfigurationSecondaryNav() {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const featureT = useTranslations('superadmin_platform_configuration_features');
  return (
    <nav
      aria-label={t('navigation.domain_sections')}
      className="mb-5 flex w-full items-center gap-1.5 overflow-x-auto hide-scrollbar rounded-2xl border border-border dark:border-white/10 bg-card/80 dark:bg-[#0E1526]/85 backdrop-blur-md p-1.5"
      data-testid="superadmin-domain-secondary-navigation-platform-configuration"
    >
      {NAVIGATION_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-10 items-center whitespace-nowrap rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active
                ? 'border-orange-500/40 bg-gradient-to-r from-[#FF5A1F]/20 to-[#F97316]/10 text-primary dark:text-orange-300 font-semibold shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
                : 'border-transparent text-secondary hover:bg-surface-hover dark:hover:bg-white/[0.06] hover:text-primary'
            }`}
          >
            {'featureLabel' in item ? featureT(item.featureLabel) : t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}

/** Secondary navigation for the platform-configuration domain; all items remain inside the owning domain. */
export default function SuperadminPlatformConfigurationDomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Suspense fallback={<nav className="mb-5 flex w-full rounded-2xl border border-border bg-card/80 p-1.5 min-h-[52px]" />}>
        <SuperadminPlatformConfigurationSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
