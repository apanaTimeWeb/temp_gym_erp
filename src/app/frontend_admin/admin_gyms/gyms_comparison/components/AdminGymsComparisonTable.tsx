"use client";

import { Building2, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';
import { CopyButton } from '@/components/ui/CopyButton';

export interface AdminGymsComparisonTableProps {
  branches: Branch[];
  metricFilter: 'all' | 'financial' | 'operations';
  formatCurrency: (val: number) => string;
}

export type GymsComparisonTableProps = AdminGymsComparisonTableProps;

export function AdminGymsComparisonTable({
  branches,
  metricFilter,
  formatCurrency,
}: AdminGymsComparisonTableProps) {
  const TABLE_COLUMN_COUNT = 1 + branches.length;
  return (
    <section className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-base font-bold text-primary">Side-by-Side Detailed Benchmark Matrix</h2>
        <p className="text-xs text-secondary mt-0.5">Comprehensive operational and financial metrics compared across selected gyms</p>
      </div>

      <div className="overflow-x-auto max-h-[640px] overflow-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-highlight">
            <tr className="border-b border-border">
              <th className="sticky start-0 z-30 bg-surface-highlight border-e border-border p-4 text-xs font-bold uppercase tracking-wider text-secondary w-64">
                Comparison Metric
              </th>
              {branches.map((b) => (
                <th key={b.id} className="p-4 text-sm font-bold text-primary min-w-48">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={16} className="text-primary" />
                    <span>{b.name}</span>
                    <CopyButton text={b.name} label={b.name} />
                  </div>
                  <span className="text-xs font-normal text-secondary">{b.location} ({b.branchCode})</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {/* Status */}
            <tr className="hover:bg-surface-highlight/50 transition-colors group">
              <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Operational Status</td>
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
                <tr className="hover:bg-surface-highlight/50 transition-colors group bg-card">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Monthly Collections</td>
                  {branches.map((b) => (
                    <td key={b.id} className="p-4 font-bold text-success text-base">
                      {formatCurrency(b.revenue)}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Operating Expenses</td>
                  {branches.map((b) => (
                    <td key={b.id} className="p-4 font-medium text-danger">
                      {formatCurrency(b.expenses)}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-surface-highlight/50 transition-colors group bg-surface-highlight/50">
                  <td className="sticky start-0 z-10 bg-surface-highlight border-e border-border p-4 font-semibold text-primary">Net Operating Profit</td>
                  {branches.map((b) => {
                    const net = b.revenue - b.expenses;
                    return (
                      <td key={b.id} className="p-4 font-bold text-primary">
                        {formatCurrency(net)}
                      </td>
                    );
                  })}
                </tr>

                <tr className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Profit Margin %</td>
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
                <tr className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Active Members</td>
                  {branches.map((b) => (
                    <td key={b.id} className="p-4 font-bold text-primary">
                      {b.studentsCount} Members
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Total Staff Members</td>
                  {branches.map((b) => (
                    <td key={b.id} className="p-4 text-primary">
                      {b.staffCount} Staff
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Equipments Tracked</td>
                  {branches.map((b) => (
                    <td key={b.id} className="p-4 text-primary">
                      {b.equipmentCount} Machines
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Occupancy vs Capacity</td>
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

                <tr className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="sticky start-0 z-10 bg-card border-e border-border p-4 font-semibold text-secondary">Operating Hours</td>
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
  );
}

export const GymsComparisonTable = AdminGymsComparisonTable;
