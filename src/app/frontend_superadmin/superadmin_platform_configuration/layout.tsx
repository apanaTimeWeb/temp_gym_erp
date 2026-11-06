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
  { labelKey: 'navigation.items.white_labeling', href: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings' }
] as const;

function SuperadminPlatformConfigurationSecondaryNav() {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const featureT = useTranslations('superadmin_platform_configuration_features');
  return (
    <nav aria-label={t('navigation.domain_sections')} className="mb-5 flex w-full flex-wrap gap-1 overflow-x-auto border-b border-border" data-testid="superadmin-domain-secondary-navigation-platform-configuration">
      {NAVIGATION_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`flex min-h-11 items-center whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-focus text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>
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
      <Suspense fallback={<nav className="mb-5 flex w-full border-b border-border min-h-11" />}>
        <SuperadminPlatformConfigurationSecondaryNav />
      </Suspense>
      {children}
    </>
  );
}
