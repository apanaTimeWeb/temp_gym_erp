"use client";

import { BarChart3 } from 'lucide-react';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';

interface GymsComparisonChartsProps {
  branches: Branch[];
  maxRevenue: number;
  maxMembers: number;
  formatCurrency: (val: number) => string;
}

export function GymsComparisonCharts({
  branches,
  maxRevenue,
  maxMembers,
  formatCurrency,
}: GymsComparisonChartsProps) {
  return (
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
  );
}
