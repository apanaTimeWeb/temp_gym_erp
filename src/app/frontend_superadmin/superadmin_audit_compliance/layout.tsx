"use client";



import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';

const NAVIGATION_ITEMS = [
  { labelKey: 'navigation.items.compliance', href: '/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard' },
  { labelKey: 'navigation.items.global_audit', href: '/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview' }
] as const;

/** Secondary navigation for the audit-compliance domain; all items remain inside the owning domain. */
export default function SuperadminAuditComplianceDomainLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <>
      <nav aria-label={t('navigation.domain_sections')} className="mb-5 flex w-full flex-wrap gap-1 overflow-x-auto border-b border-border" data-testid="superadmin-domain-secondary-navigation-audit-compliance">
        {NAVIGATION_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`flex min-h-11 items-center whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${active ? 'border-focus text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      {children}
    </>
  );
}
