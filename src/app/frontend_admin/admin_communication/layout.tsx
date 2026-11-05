"use client";
// Domain shell: secondary navigation only. Business logic stays in autonomous child leaves.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ADMIN_ANNOUNCEMENTS_ROUTES } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/config/admin_communication_notices_and_announcements.url_config';
import { ADMIN_CAMPAIGNS_ROUTES } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/config/admin_communication_whatsapp_campaigns.url_config';
import { ADMIN_NOTIFICATIONS_ROUTES } from '@/app/frontend_admin/admin_communication/communication_notifications_center/config/admin_communication_notifications_center.url_config';

const NAV_ITEMS = [
  { href: ADMIN_ANNOUNCEMENTS_ROUTES.root, labelKey: 'admin_navigation.AdminNavigation.communicationTabs.notices' },
  { href: ADMIN_CAMPAIGNS_ROUTES.root, labelKey: 'admin_navigation.AdminNavigation.communicationTabs.whatsappCampaigns' },
  { href: ADMIN_NOTIFICATIONS_ROUTES.root, labelKey: 'admin_navigation.AdminNavigation.communicationTabs.notifications' },
] as const;

export default function AdminCommunicationDomainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  return <div className="min-h-full bg-page text-primary">
    <nav aria-label={t('admin_navigation.AdminNavigation.communicationNavigation')} className="sticky top-0 z-20 border-b border-border bg-header px-3 py-3 sm:px-4">
      <div className="flex gap-2 overflow-x-auto" role="navigation">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-lg border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors ${active ? 'border-focus bg-surface-highlight text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>{t(item.labelKey)}</Link>;
        })}
      </div>
    </nav>
    {children}
  </div>;
}
