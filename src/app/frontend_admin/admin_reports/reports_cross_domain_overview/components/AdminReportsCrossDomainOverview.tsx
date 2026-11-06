import Link from 'next/link';
import { FileBarChart, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ADMIN_REPORTS_CATALOG_LINKS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/constants/AdminReportsCrossDomainOverviewConstants';

/** Presents report entry links grouped by business owner without fetching or duplicating business data. */
export default function AdminReportsCrossDomainOverview() {
  const t = useTranslations();
  return <div className="w-full space-y-6 p-4 sm:p-6" data-testid="admin-reports-cross-domain-overview">
    <header className="space-y-2">
      <div className="flex items-center gap-3"><span className="rounded-lg border border-border bg-surface-highlight p-2 text-primary"><FileBarChart size={22} aria-hidden="true" /></span><h1 className="text-2xl font-bold text-primary">{t('admin_navigation.AdminNavigation.reportsCatalog.title')}</h1></div>
      <p className="max-w-3xl text-sm text-secondary">{t('admin_navigation.AdminNavigation.reportsCatalog.intro')}</p>
    </header>
    <section aria-label={t('admin_navigation.AdminNavigation.reportsCatalog.title')} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {ADMIN_REPORTS_CATALOG_LINKS.map((item) => <Link key={item.id} href={item.href} className="group flex min-h-36 flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="flex items-center justify-between gap-3"><span className="font-semibold text-primary">{t(item.titleKey)}</span><ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        <span className="text-sm text-secondary">{t(item.descriptionKey)}</span>
      </Link>)}
    </section>
  </div>;
}
