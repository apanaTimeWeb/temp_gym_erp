"use client";
// RESPONSIBILITY: Side-by-side performance benchmarking across all gym branches.
// DATA FLOW: Branch fixtures → comparative metrics calculation → side-by-side benchmark table & charts.

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Building2, TrendingUp, Users, ArrowUpRight, Award, BarChart3, Download, Printer, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MOCK_BRANCHES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/mocks/fixtures/AdminGymsBranchesDirectoryMockFixtures';

export default function GymsComparisonPage() {
  const t = useTranslations();
  const locale = useLocale();

  const [selectedBranches, setSelectedBranches] = useState<string[]>(['b1', 'b2', 'b3', 'b4']);
  const [metricFilter, setMetricFilter] = useState<'all' | 'financial' | 'operations'>('all');

  const branches = MOCK_BRANCHES.filter((b) => selectedBranches.includes(b.id));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const toggleBranch = (id: string) => {
    if (selectedBranches.includes(id)) {
      if (selectedBranches.length > 2) {
        setSelectedBranches(selectedBranches.filter(b => b !== id));
      }
    } else {
      setSelectedBranches([...selectedBranches, id]);
    }
  };

  const maxRevenue = Math.max(...MOCK_BRANCHES.map(b => b.revenue));
  const maxMembers = Math.max(...MOCK_BRANCHES.map(b => b.studentsCount));

  const handleExportCsv = () => {
    const headers = ['Metric', ...branches.map(b => b.name)];
    const rows = [
      ['Branch Status', ...branches.map(b => b.status)],
      ['Location', ...branches.map(b => b.location)],
      ['Monthly Revenue', ...branches.map(b => `INR ${b.revenue}`)],
      ['Operating Expenses', ...branches.map(b => `INR ${b.expenses}`)],
      ['Net Operating Profit', ...branches.map(b => `INR ${b.revenue - b.expenses}`)],
      ['Profit Margin', ...branches.map(b => `${Math.round(((b.revenue - b.expenses) / b.revenue) * 100)}%`)],
      ['Active Members', ...branches.map(b => String(b.studentsCount))],
      ['Staff Count', ...branches.map(b => String(b.staffCount))],
      ['Equipment Count', ...branches.map(b => String(b.equipmentCount))],
      ['Current Occupancy', ...branches.map(b => `${b.currentOccupancy} / ${b.maxCapacity}`)],
    ];
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gym_comparison_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="space-y-6 p-6 min-h-full bg-page text-primary">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-primary-subtle text-primary border border-border">
              <BarChart3 size={22} strokeWidth={2} />
            </span>
            <h1 className="text-2xl font-bold text-primary">Gym Comparison</h1>
          </div>
          <p className="mt-1 text-sm text-secondary">
            Side-by-side performance benchmarking across your gyms
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all"
          >
            <Printer size={16} />
            <span>Print Report</span>
          </button>
        </div>
      </header>

      {/* Benchmark Summary KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Benchmarking Highlights">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Revenue Gym</span>
            <Award size={18} className="text-warning" />
          </div>
          <div className="text-xl font-bold text-primary">Andheri East</div>
          <div className="mt-1 text-sm font-semibold text-success">{formatCurrency(185000)} / mo</div>
          <div className="mt-2 text-xs text-secondary">Highest membership collection</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Most Cost Efficient</span>
            <TrendingUp size={18} className="text-success" />
          </div>
          <div className="text-xl font-bold text-primary">Bandra West</div>
          <div className="mt-1 text-sm font-semibold text-success">57.0% Net Margin</div>
          <div className="mt-2 text-xs text-secondary">INR 81,000 net profit</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Highest Active Members</span>
            <Users size={18} className="text-primary" />
          </div>
          <div className="text-xl font-bold text-primary">Andheri East</div>
          <div className="mt-1 text-sm font-semibold text-primary">420 Members</div>
          <div className="mt-2 text-xs text-secondary">Largest active recurring subscriber base</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Capacity Leader</span>
            <Building2 size={18} className="text-info-text" />
          </div>
          <div className="text-xl font-bold text-primary">Powai</div>
          <div className="mt-1 text-sm font-semibold text-primary">59.4% Occupancy</div>
          <div className="mt-2 text-xs text-secondary">190 / 320 peak utilization</div>
        </div>
      </section>

      {/* Branch Filter Selector */}
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary mr-2">Compare Gyms:</span>
          {MOCK_BRANCHES.map((b) => {
            const isChecked = selectedBranches.includes(b.id);
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => toggleBranch(b.id)}
                className={`inline-flex min-h-11 items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border motion-safe:transition-all ${
                  isChecked
                    ? 'border-primary bg-primary text-on-primary shadow-sm'
                    : 'border-border bg-surface-highlight text-secondary hover:text-primary'
                }`}
              >
                <Building2 size={13} />
                <span>{b.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 border border-border rounded-xl p-1 bg-surface-highlight">
          <button
            type="button"
            onClick={() => setMetricFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
              metricFilter === 'all' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            All Metrics
          </button>
          <button
            type="button"
            onClick={() => setMetricFilter('financial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
              metricFilter === 'financial' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            Financials
          </button>
          <button
            type="button"
            onClick={() => setMetricFilter('operations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
              metricFilter === 'operations' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            Operations
          </button>
        </div>
      </section>

      {/* Side-by-Side Visual Benchmarking Chart */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-4">
        <h2 className="text-base font-bold text-primary flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          <span>Revenue vs Member Scale Benchmarks</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Revenue Bars */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Monthly Revenue Comparison
            </div>
            {branches.map((b) => {
              const pct = Math.round((b.revenue / maxRevenue) * 100);
              return (
                <div key={b.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-primary">{b.name}</span>
                    <span className="text-success">{formatCurrency(b.revenue)}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-surface-highlight overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary motion-safe:transition-all motion-safe:duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Members Bars */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Active Members Count
            </div>
            {branches.map((b) => {
              const pct = Math.round((b.studentsCount / maxMembers) * 100);
              return (
                <div key={b.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-primary">{b.name}</span>
                    <span className="text-primary">{b.studentsCount} Members</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-surface-highlight overflow-hidden">
                    <div
                      className="h-full rounded-full bg-info-border motion-safe:transition-all motion-safe:duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Side-by-Side Comparison Table */}
      <section className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-base font-bold text-primary">Side-by-Side Detailed Benchmark Matrix</h2>
          <p className="text-xs text-secondary mt-0.5">Comprehensive operational and financial metrics compared across selected gyms</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-highlight">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-secondary w-64">
                  Comparison Metric
                </th>
                {branches.map((b) => (
                  <th key={b.id} className="p-4 text-sm font-bold text-primary min-w-48">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-primary" />
                      <span>{b.name}</span>
                    </div>
                    <span className="text-xs font-normal text-secondary">{b.location} ({b.branchCode})</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {/* Status */}
              <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                <td className="p-4 font-semibold text-secondary">Operational Status</td>
                {branches.map((b) => (
                  <td key={b.id} className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      b.status === 'active'
                        ? 'bg-success-bg text-success-text'
                        : 'bg-danger-bg text-danger-text'
                    }`}>
                      {b.status === 'active' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                      {b.status}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Monthly Revenue */}
              {(metricFilter === 'all' || metricFilter === 'financial') && (
                <>
                  <tr className="hover:bg-surface-hover motion-safe:transition-colors bg-card">
                    <td className="p-4 font-semibold text-secondary">Monthly Collections</td>
                    {branches.map((b) => (
                      <td key={b.id} className="p-4 font-bold text-success text-base">
                        {formatCurrency(b.revenue)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                    <td className="p-4 font-semibold text-secondary">Operating Expenses</td>
                    {branches.map((b) => (
                      <td key={b.id} className="p-4 font-medium text-danger">
                        {formatCurrency(b.expenses)}
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-surface-hover motion-safe:transition-colors bg-surface-highlight/50">
                    <td className="p-4 font-semibold text-primary">Net Operating Profit</td>
                    {branches.map((b) => {
                      const net = b.revenue - b.expenses;
                      return (
                        <td key={b.id} className="p-4 font-bold text-primary">
                          {formatCurrency(net)}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                    <td className="p-4 font-semibold text-secondary">Profit Margin %</td>
                    {branches.map((b) => {
                      const margin = Math.round(((b.revenue - b.expenses) / b.revenue) * 100);
                      return (
                        <td key={b.id} className="p-4 font-bold text-primary">
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                            margin >= 50 ? 'bg-success-bg text-success-text' : 'bg-warning-bg text-warning'
                          }`}>
                            {margin}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                </>
              )}

              {/* Operations */}
              {(metricFilter === 'all' || metricFilter === 'operations') && (
                <>
                  <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                    <td className="p-4 font-semibold text-secondary">Active Members</td>
                    {branches.map((b) => (
                      <td key={b.id} className="p-4 font-bold text-primary">
                        {b.studentsCount} Members
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                    <td className="p-4 font-semibold text-secondary">Total Staff Members</td>
                    {branches.map((b) => (
                      <td key={b.id} className="p-4 text-primary">
                        {b.staffCount} Staff
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                    <td className="p-4 font-semibold text-secondary">Equipments Tracked</td>
                    {branches.map((b) => (
                      <td key={b.id} className="p-4 text-primary">
                        {b.equipmentCount} Machines
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                    <td className="p-4 font-semibold text-secondary">Occupancy vs Capacity</td>
                    {branches.map((b) => {
                      const current = b.currentOccupancy ?? 0;
                      const max = b.maxCapacity ?? 100;
                      const pct = max > 0 ? Math.round((current / max) * 100) : 0;
                      return (
                        <td key={b.id} className="p-4">
                          <div className="font-semibold text-primary">{current} / {max}</div>
                          <div className="text-xs text-secondary">{pct}% utilization</div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="hover:bg-surface-hover motion-safe:transition-colors">
                    <td className="p-4 font-semibold text-secondary">Operating Hours</td>
                    {branches.map((b) => (
                      <td key={b.id} className="p-4 text-xs text-secondary">
                        {b.openingTime || '06:00'} - {b.closingTime || '22:00'}
                      </td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

