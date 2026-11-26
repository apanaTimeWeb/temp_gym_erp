"use client";

import Link from 'next/link';
import { Award, TrendingUp, Users, Building2 } from 'lucide-react';

export interface AdminGymsComparisonKpisProps {
  formatCurrency: (val: number) => string;
}

export type GymsComparisonKpisProps = AdminGymsComparisonKpisProps;

export function AdminGymsComparisonKpis({ formatCurrency }: GymsComparisonKpisProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Benchmarking Highlights">
      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Andheri%20East" className="block rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Top Revenue Gym</span>
          <Award size={18} className="text-warning" />
        </div>
        <div className="text-xl font-bold text-primary">Andheri East</div>
        <div className="mt-1 text-sm font-semibold text-success">{formatCurrency(185000)} / mo</div>
        <div className="mt-2 text-xs text-secondary">Highest membership collection</div>
      </Link>

      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Bandra%20West" className="block rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Most Cost Efficient</span>
          <TrendingUp size={18} className="text-success" />
        </div>
        <div className="text-xl font-bold text-primary">Bandra West</div>
        <div className="mt-1 text-sm font-semibold text-success">57.0% Net Margin</div>
        <div className="mt-2 text-xs text-secondary">INR 81,000 net profit</div>
      </Link>

      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Andheri%20East" className="block rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Highest Active Members</span>
          <Users size={18} className="text-primary" />
        </div>
        <div className="text-xl font-bold text-primary">Andheri East</div>
        <div className="mt-1 text-sm font-semibold text-primary">420 Members</div>
        <div className="mt-2 text-xs text-secondary">Largest active recurring subscriber base</div>
      </Link>

      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Powai" className="block rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Capacity Leader</span>
          <Building2 size={18} className="text-info-text" />
        </div>
        <div className="text-xl font-bold text-primary">Powai</div>
        <div className="mt-1 text-sm font-semibold text-primary">59.4% Occupancy</div>
        <div className="mt-2 text-xs text-secondary">190 / 320 peak utilization</div>
      </Link>
    </section>
  );
}

export const GymsComparisonKpis = AdminGymsComparisonKpis;
