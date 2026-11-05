import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export default function ManagerStaffHrDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_STAFF_HR_NAVIGATION');
 return <section aria-label={t('DOMAIN_LABEL')} className="min-h-full"><nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        <a href="/frontend_manager/manager_staff_hr/staff_directory" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_staff_hr-layout-link-staff_directory">{t('STAFF_DIRECTORY')}</a>
        <a href="/frontend_manager/manager_staff_hr/staff_attendance" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_staff_hr-layout-link-staff_attendance">{t('STAFF_ATTENDANCE')}</a>
        <a href="/frontend_manager/manager_staff_hr/payroll_and_ledger" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_staff_hr-layout-link-payroll_and_ledger">{t('PAYROLL_AND_LEDGER')}</a>
</nav>{children}</section>;
}
