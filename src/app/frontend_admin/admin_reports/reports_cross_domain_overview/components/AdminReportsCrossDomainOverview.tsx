"use client";
// RESPONSIBILITY: Presents cross-domain report entry links along with executive performance graphs, gym benchmarking, and metric summaries.
// DATA FLOW: Cross-domain report fixtures → executive visual chart cards → report entry links grouped by business owner.

import { useState } from 'react';
import Link from 'next/link';
import { FileBarChart, ArrowUpRight, TrendingUp, Users, CalendarCheck, BarChart3, Building2, Layers, Download, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ADMIN_REPORTS_CATALOG_LINKS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/constants/AdminReportsCrossDomainOverviewConstants';
import AdminReportsCrossDomainOverviewChart from './AdminReportsCrossDomainOverviewChart';

export default function AdminReportsCrossDomainOverview() {
  const t = useTranslations();
  const [activeChartTab, setActiveChartTab] = useState<'financial' | 'attendance' | 'growth'>('financial');

  // Multi-month executive performance data
  const monthlyTrends = [
    { month: 'Jun', revenue: 380, expenses: 195, profit: 185, checkIns: 8420, newMembers: 85, netGrowth: 73 },
    { month: 'Jul', revenue: 410, expenses: 205, profit: 205, checkIns: 9150, newMembers: 94, netGrowth: 79 },
    { month: 'Aug', revenue: 435, expenses: 212, profit: 223, checkIns: 9680, newMembers: 102, netGrowth: 84 },
    { month: 'Sep', revenue: 450, expenses: 218, profit: 232, checkIns: 10120, newMembers: 110, netGrowth: 96 },
    { month: 'Oct', revenue: 472, expenses: 222, profit: 250, checkIns: 10540, newMembers: 115, netGrowth: 99 },
    { month: 'Nov', revenue: 485, expenses: 224, profit: 261, checkIns: 10920, newMembers: 118, netGrowth: 107 },
  ];

  // Branch performance metrics for visual benchmarking
  const branchMetrics = [
    { name: 'Andheri East', revenue: 185000, revenueFormatted: '₹1.85L', members: 420, netGrowth: '+48', occupancy: '78%', profitMargin: '54%' },
    { name: 'Bandra West', revenue: 142000, revenueFormatted: '₹1.42L', members: 340, netGrowth: '+36', occupancy: '72%', profitMargin: '51%' },
    { name: 'Powai', revenue: 98000, revenueFormatted: '₹98K', members: 220, netGrowth: '+22', occupancy: '68%', profitMargin: '48%' },
    { name: 'Thane', revenue: 60000, revenueFormatted: '₹60K', members: 180, netGrowth: '+12', occupancy: '54%', profitMargin: '45%' },
  ];

  const maxRevenue = 185000;

  return (
    <div className="w-full space-y-6 p-4 sm:p-6" data-testid="admin-reports-cross-domain-overview">
      <header className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-border bg-surface-highlight p-2 text-text-primary">
              <FileBarChart size={24} aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{t('admin_navigation.AdminNavigation.reportsCatalog.title')}</h1>
              <p className="text-xs text-secondary mt-0.5">Comprehensive multi-domain business intelligence, visual graph analytics and performance audits</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/frontend_admin/admin_gyms/gyms_comparison"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
            >
              <BarChart3 size={15} />
              <span>Gym Comparison Benchmarks</span>
            </Link>
            <Link
              href="/frontend_admin/admin_data_export"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
            >
              <Download size={15} />
              <span>Export Raw Data</span>
            </Link>
          </div>
        </div>
      </header>

      {/* EXECUTIVE PERFORMANCE SNAPSHOT GRAPHS & METRICS */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6" aria-label="Executive Performance Overview">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" />
            <h2 className="text-base font-bold text-text-primary">Cross-Domain Performance Benchmarks & Trend Graphs</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-border bg-surface-highlight p-1">
              <button
                type="button"
                onClick={() => setActiveChartTab('financial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  activeChartTab === 'financial' ? 'bg-card text-text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Financial Trends
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab('attendance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  activeChartTab === 'attendance' ? 'bg-card text-text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Attendance Volume
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab('growth')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  activeChartTab === 'growth' ? 'bg-card text-text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Member Growth
              </button>
            </div>
            <span className="hidden lg:inline text-xs font-semibold px-2.5 py-1 rounded-full bg-success-bg text-success-text">
              Network Health: 94.2% Optimal
            </span>
          </div>
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
              <p className="text-xl font-bold text-text-primary mt-1">1,160 Members</p>
              <p className="text-xs text-secondary mt-0.5">+118 net new members</p>
            </div>
            <span className="p-2.5 rounded-xl bg-card border border-border text-text-primary">
              <Users size={20} />
            </span>
          </div>

          <div className="rounded-xl border border-border bg-surface-highlight p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Avg Check-In Rate</p>
              <p className="text-xl font-bold text-text-primary mt-1">78.4% Capacity</p>
              <p className="text-xs text-secondary mt-0.5">Peak time: 06:00 - 09:30 AM</p>
            </div>
            <span className="p-2.5 rounded-xl bg-card border border-border text-info-text">
              <CalendarCheck size={20} />
            </span>
          </div>
        </div>

        {/* INTERACTIVE MULTI-MONTH PERFORMANCE GRAPH */}
        <AdminReportsCrossDomainOverviewChart
          activeChartTab={activeChartTab}
          monthlyTrends={monthlyTrends}
        />

        {/* Visual Branch Benchmarking Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
              Branch Performance Contribution
            </h3>
            <span className="text-xs text-secondary">4 Operating Facilities</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {branchMetrics.map((branch) => {
              const widthPct = Math.round((branch.revenue / maxRevenue) * 100);
              return (
                <Link
                  key={branch.name}
                  href={`/frontend_admin/admin_gyms/gyms_branches_directory?search=${encodeURIComponent(branch.name)}`}
                  className="block p-3.5 rounded-xl border border-border bg-surface-highlight hover:border-primary hover:bg-surface-hover transition-colors space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  title={`View ${branch.name} in Branches Directory`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary text-xs">{branch.name}</span>
                    <span className="text-xs font-semibold text-success">{branch.profitMargin} Net</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-secondary">
                      <span>Monthly Rev</span>
                      <span className="font-semibold text-text-primary">{branch.revenueFormatted}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${widthPct}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-secondary pt-1 border-t border-border">
                    <span>{branch.members} active</span>
                    <span className="text-success font-medium">{branch.netGrowth} new</span>
                    <span>{branch.occupancy} cap</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* REPORT DOMAIN CARDS */}
      <section className="space-y-4" aria-label="Detailed Domain Reports">
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
          <Layers size={18} />
          <span>Domain-Specific Detailed Reports</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ADMIN_REPORTS_CATALOG_LINKS.map((report) => (
            <Link
              key={report.id}
              href={report.href}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary hover:bg-surface-hover hover:shadow-lg motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-xl border border-border bg-surface-highlight p-2 text-text-primary group-hover:bg-surface-hover group-hover:text-primary motion-safe:transition-colors">
                    <FileBarChart size={20} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary group-hover:text-primary motion-safe:transition-colors">
                    <span>View Report</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary motion-safe:transition-colors">
                    {t(report.titleKey)}
                  </h3>
                  <p className="mt-1 text-xs text-secondary leading-relaxed">
                    {t(report.descriptionKey)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-secondary">
                <span className="font-medium text-secondary">{report.id.toUpperCase()}</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Audit Compliant</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
