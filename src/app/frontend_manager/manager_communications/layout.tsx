'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/frontend_manager/manager_communications/communications_compose', labelKey: 'COMPOSE', testId: 'manager_manager_communications-layout-link-communications_compose' },
  { href: '/frontend_manager/manager_communications/communications_history', labelKey: 'HISTORY', testId: 'manager_manager_communications-layout-link-communications_history' },
  { href: '/frontend_manager/manager_communications/communications_automations', labelKey: 'AUTOMATIONS', testId: 'manager_manager_communications-layout-link-communications_automations' },
  { href: '/frontend_manager/manager_communications/communications_churn_recovery', labelKey: 'CHURN_RECOVERY', testId: 'manager_manager_communications-layout-link-communications_churn_recovery' },
  { href: '/frontend_manager/manager_communications/notifications_inbox', labelKey: 'NOTIFICATIONS', testId: 'manager_manager_communications-layout-link-notifications_inbox' },
] as const;

export default function ManagerCommunicationsDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_COMMUNICATIONS_NAVIGATION');
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
