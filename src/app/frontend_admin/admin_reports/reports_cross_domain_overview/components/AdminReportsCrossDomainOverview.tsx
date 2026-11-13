"use client";
// RESPONSIBILITY: Presents cross-domain report entry links along with executive performance graphs and metric summaries.
// DATA FLOW: Cross-domain report fixtures → executive visual chart cards → report entry links grouped by business owner.

import Link from 'next/link';
import { FileBarChart, ArrowUpRight, TrendingUp, Users, DollarSign, CalendarCheck, BarChart3, Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ADMIN_REPORTS_CATALOG_LINKS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/constants/AdminReportsCrossDomainOverviewConstants';

export default function AdminReportsCrossDomainOverview() {
  const t = useTranslations();

  // Branch performance metrics for visual benchmarking
  const branchMetrics = [
    { name: 'Andheri East', revenue: 185000, revenueFormatted: '₹1.85L', members: 420, netGrowth: '+48', occupancy: '78%' },
    { name: 'Bandra West', revenue: 142000, revenueFormatted: '₹1.42L', members: 340, netGrowth: '+36', occupancy: '72%' },
    { name: 'Powai', revenue: 98000, revenueFormatted: '₹98K', members: 220, netGrowth: '+22', occupancy: '68%' },
    { name: 'Thane', revenue: 60000, revenueFormatted: '₹60K', members: 180, netGrowth: '+12', occupancy: '54%' },
  ];

  const maxRevenue = 185000;

  return (
    <div className="w-full space-y-6 p-4 sm:p-6" data-testid="admin-reports-cross-domain-overview">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-border bg-surface-highlight p-2 text-primary">
            <FileBarChart size={24} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-primary">{t('admin_navigation.AdminNavigation.reportsCatalog.title')}</h1>
            <p className="text-xs text-secondary mt-0.5">Comprehensive multi-domain business intelligence and analytical performance logs</p>
          </div>
        </div>
      </header>

      {/* EXECUTIVE PERFORMANCE SNAPSHOT GRAPHS & METRICS */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-5" aria-label="Executive Performance Overview">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" />
            <h2 className="text-base font-bold text-primary">Cross-Domain Performance Benchmarks</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success-bg text-success-text">
            Overall Health: 94.2% Optimal
          </span>
        </div>

        {/* Top 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-surface-highlight p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Total Monthly Collections</p>
              <p className="text-xl font-bold text-success mt-1">₹4,85,000</p>
              <p className="text-xs text-secondary mt-0.5">+12.4% vs last period</p>
            </div>
            <span className="p-2.5 rounded-xl bg-card border border-border text-success">
              <TrendingUp size={20} />
            </span>
          </div>

          <div className="rounded-xl border border-border bg-surface-highlight p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Active Member Network</p>
              <p className="text-xl font-bold text-primary mt-1">1,160 Members</p>
              <p className="text-xs text-secondary mt-0.5">+118 net new members</p>
            </div>
            <span className="p-2.5 rounded-xl bg-card border border-border text-primary">
              <Users size={20} />
            </span>
          </div>

          <div className="rounded-xl border border-border bg-surface-highlight p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Avg Check-In Rate</p>
              <p className="text-xl font-bold text-primary mt-1">78.4% Capacity</p>
              <p className="text-xs text-secondary mt-0.5">Peak time: 06:00 - 09:30 AM</p>
            </div>
            <span className="p-2.5 rounded-xl bg-card border border-border text-info-text">
              <CalendarCheck size={20} />
            </span>
          </div>
        </div>

        {/* Visual Gym Performance Comparison Graph */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">
            Branch Revenue Contribution & Scale Distribution
          </p>
          <div className="space-y-3">
            {branchMetrics.map((branch) => {
              const pct = Math.round((branch.revenue / maxRevenue) * 100);
              return (
                <div key={branch.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-primary">
                      <Building2 size={13} className="text-secondary" />
                      <span>{branch.name}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-secondary">{branch.members} active</span>
                      <span className="text-success font-bold">{branch.revenueFormatted}</span>
                      <span className="text-primary font-bold">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-surface-highlight overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary motion-safe:transition-all motion-safe:duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DETAILED REPORT CATALOG CARDS */}
      <section aria-label={t('admin_navigation.AdminNavigation.reportsCatalog.title')} className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-secondary">
          Detailed Sub-Domain Reports Catalog
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ADMIN_REPORTS_CATALOG_LINKS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex min-h-36 flex-col justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
            >
              <div>
                <span className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-semibold text-primary group-hover:text-primary-hover">{t(item.titleKey)}</span>
                  <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="text-xs text-secondary leading-relaxed">{t(item.descriptionKey)}</span>
              </div>
              <div className="mt-3 flex items-center text-xs font-semibold text-primary underline underline-offset-4">
                View Full Detailed Report →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
