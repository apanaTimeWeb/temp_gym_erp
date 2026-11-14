"use client";
// RESPONSIBILITY: Presents cross-domain report entry links along with executive performance graphs, gym benchmarking, and metric summaries.
// DATA FLOW: Cross-domain report fixtures → executive visual chart cards → report entry links grouped by business owner.

import { useState } from 'react';
import Link from 'next/link';
import { FileBarChart, ArrowUpRight, TrendingUp, Users, CalendarCheck, BarChart3, Building2, Layers, Download, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ADMIN_REPORTS_CATALOG_LINKS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/constants/AdminReportsCrossDomainOverviewConstants';

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

  const maxRevenueVal = 500; // in thousands (₹5.0L)
  const maxCheckIns = 12000;
  const maxGrowth = 140;

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
            <span className="rounded-xl border border-border bg-surface-highlight p-2 text-primary">
              <FileBarChart size={24} aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-primary">{t('admin_navigation.AdminNavigation.reportsCatalog.title')}</h1>
              <p className="text-xs text-secondary mt-0.5">Comprehensive multi-domain business intelligence, visual graph analytics and performance audits</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/frontend_admin/admin_gyms/gyms_comparison"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
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
            <h2 className="text-base font-bold text-primary">Cross-Domain Performance Benchmarks & Trend Graphs</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-border bg-surface-highlight p-1">
              <button
                type="button"
                onClick={() => setActiveChartTab('financial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  activeChartTab === 'financial' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Financial Trends
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab('attendance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  activeChartTab === 'attendance' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Attendance Volume
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab('growth')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  activeChartTab === 'growth' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
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

        {/* INTERACTIVE MULTI-MONTH PERFORMANCE GRAPH */}
        <div className="rounded-xl border border-border bg-surface-highlight p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-sm font-bold text-primary">
                {activeChartTab === 'financial' && 'Monthly Revenue vs Expenses vs Net Profit (Last 6 Months)'}
                {activeChartTab === 'attendance' && 'Total Member & Staff Check-Ins (Last 6 Months)'}
                {activeChartTab === 'growth' && 'New Member Enrollments vs Net Member Growth (Last 6 Months)'}
              </p>
              <p className="text-xs text-secondary">
                {activeChartTab === 'financial' && 'Figures shown in Thousands INR (₹K) with comparative operating margins'}
                {activeChartTab === 'attendance' && 'Combined barcode and manual check-in volume logged across all gym gates'}
                {activeChartTab === 'growth' && 'Net monthly addition after factoring voluntary freezes and scheduled expirations'}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {activeChartTab === 'financial' && (
                <>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-success inline-block" /> Revenue</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-danger inline-block" /> Expenses</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Net Profit</span>
                </>
              )}
              {activeChartTab === 'attendance' && (
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-info inline-block" /> Total Check-Ins</span>
              )}
              {activeChartTab === 'growth' && (
                <>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> New Enrolls</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-success inline-block" /> Net Growth</span>
                </>
              )}
            </div>
          </div>

          {/* Graphical Visualization Bar Columns */}
          <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-border">
            {monthlyTrends.map((item) => {
              if (activeChartTab === 'financial') {
                const revHeight = Math.round((item.revenue / maxRevenueVal) * 100);
                const expHeight = Math.round((item.expenses / maxRevenueVal) * 100);
                const profHeight = Math.round((item.profit / maxRevenueVal) * 100);
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-16 flex items-end justify-center gap-1 h-full">
                      <div
                        className="w-1/3 rounded-t-md bg-success motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                        style={{ height: `${revHeight}%` }}
                        title={`${item.month}: Revenue ₹${item.revenue}K`}
                      />
                      <div
                        className="w-1/3 rounded-t-md bg-danger motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                        style={{ height: `${expHeight}%` }}
                        title={`${item.month}: Expenses ₹${item.expenses}K`}
                      />
                      <div
                        className="w-1/3 rounded-t-md bg-primary motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                        style={{ height: `${profHeight}%` }}
                        title={`${item.month}: Profit ₹${item.profit}K`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-secondary">{item.month}</span>
                  </div>
                );
              }

              if (activeChartTab === 'attendance') {
                const height = Math.round((item.checkIns / maxCheckIns) * 100);
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-xs font-bold text-primary group-hover:opacity-100 opacity-80">{item.checkIns.toLocaleString()}</span>
                    <div className="w-full max-w-14 flex items-end justify-center h-full">
                      <div
                        className="w-full rounded-t-md bg-info motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                        style={{ height: `${height}%` }}
                        title={`${item.month}: ${item.checkIns} check-ins`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-secondary">{item.month}</span>
                  </div>
                );
              }

              const newHeight = Math.round((item.newMembers / maxGrowth) * 100);
              const netHeight = Math.round((item.netGrowth / maxGrowth) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full max-w-14 flex items-end justify-center gap-1.5 h-full">
                    <div
                      className="w-1/2 rounded-t-md bg-primary motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                      style={{ height: `${newHeight}%` }}
                      title={`${item.month}: +${item.newMembers} New Members`}
                    />
                    <div
                      className="w-1/2 rounded-t-md bg-success motion-safe:transition-all motion-safe:duration-500 group-hover:opacity-90"
                      style={{ height: `${netHeight}%` }}
                      title={`${item.month}: +${item.netGrowth} Net Growth`}
                    />
                  </div>
                  <span className="text-xs font-semibold text-secondary">{item.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-secondary pt-1">
            <span>Data updated real-time across all 4 operational gym locations</span>
            <span className="font-semibold text-primary">Current Period Collections: ₹4,85,000 (Margin 53.8%)</span>
          </div>
        </div>

        {/* Visual Gym Performance Comparison Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary">
              Branch Revenue Contribution & Scale Distribution
            </p>
            <Link
              href="/frontend_admin/admin_gyms/gyms_comparison"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Side-by-side performance benchmarking across your gyms</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
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
                      <span className="text-secondary">Margin: {branch.profitMargin}</span>
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
