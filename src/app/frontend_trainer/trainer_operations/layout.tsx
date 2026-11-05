"use client";
// RESPONSIBILITY: Secondary navigation for the current Trainer domain only.
// Each link points to an independently mounted autonomous feature route.
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TRAINER_ATTENDANCE_PAGE_LIST as route0 } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';
import { TRAINER_ATTENDANCE_PAGE_LIST as route1 } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/config/trainer_operations_trainer_attendance.url_config';
import { TRAINER_SCHEDULE_PAGE_LIST as route2 } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';
import { TRAINER_SCHEDULE_PAGE_LIST as route3 } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/config/trainer_operations_leave_requests.url_config';

const domainLinks = [
  { href: route0, key: 'NAV_OPERATIONS_MEMBER_ATTENDANCE' },
  { href: route1, key: 'NAV_OPERATIONS_SELF_ATTENDANCE' },
  { href: route2, key: 'NAV_OPERATIONS_AVAILABILITY' },
  { href: route3, key: 'NAV_OPERATIONS_LEAVES' },
] as const;

export default function TrainerDomainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('TRAINER_SHELL');
  return (
    <div className="min-h-full">
      <nav aria-label={t('TEXT_TRAINER_NAVIGATION')} className="flex gap-2 overflow-x-auto border-b border-border bg-card px-3 py-2" data-testid="trainer-domain-secondary-nav">
        {domainLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-lg border px-4 text-sm font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${active ? 'border-focus bg-primary-subtle text-primary' : 'border-transparent text-secondary hover:bg-primary-subtle hover:text-primary'}`}>
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
