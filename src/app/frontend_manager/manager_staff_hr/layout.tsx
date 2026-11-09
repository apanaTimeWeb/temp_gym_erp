'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/frontend_manager/manager_staff_hr/staff_directory', labelKey: 'STAFF_DIRECTORY', testId: 'manager_manager_staff_hr-layout-link-staff_directory' },
  { href: '/frontend_manager/manager_staff_hr/staff_attendance', labelKey: 'STAFF_ATTENDANCE', testId: 'manager_manager_staff_hr-layout-link-staff_attendance' },
  { href: '/frontend_manager/manager_staff_hr/payroll_and_ledger', labelKey: 'PAYROLL_AND_LEDGER', testId: 'manager_manager_staff_hr-layout-link-payroll_and_ledger' },
] as const;

export default function ManagerStaffHrDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_STAFF_HR_NAVIGATION');
  const pathname = usePathname();

  return (
    <section aria-label={t('DOMAIN_LABEL')} className="min-h-full">
      <nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium ${isActive ? 'bg-primary-subtle text-primary border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-input'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
              data-testid={item.testId}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      {children}
    </section>
  );
}
