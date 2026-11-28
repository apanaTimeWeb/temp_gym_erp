"use client";

import Link from 'next/link';
import { Award, TrendingUp, Users, Building2 } from 'lucide-react';

export interface AdminGymsComparisonKpisProps {
  formatCurrency: (val: number) => string;
}

export type GymsComparisonKpisProps = AdminGymsComparisonKpisProps;

export function AdminGymsComparisonKpis({ formatCurrency }: GymsComparisonKpisProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" aria-label="Benchmarking Highlights">
      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Andheri%20East" className="relative overflow-hidden block rounded-2xl border border-amber-500/40 hover:border-amber-400/75 bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220] p-5 shadow-card motion-safe:transition-all motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#FACC15] to-transparent" />
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Top Revenue Gym</span>
          <span className="p-2 rounded-xl border border-amber-500/35 bg-amber-500/20 text-amber-400"><Award size={16} /></span>
        </div>
        <div className="text-xl font-extrabold text-text-primary">Andheri East</div>
        <div className="mt-1 text-sm font-semibold text-success">{formatCurrency(185000)} / mo</div>
        <div className="mt-2 pt-2 border-t border-border/70 text-xs text-secondary">Highest membership collection</div>
      </Link>

      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Bandra%20West" className="relative overflow-hidden block rounded-2xl border border-emerald-500/40 hover:border-emerald-400/75 bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220] p-5 shadow-card motion-safe:transition-all motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-transparent" />
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Most Cost Efficient</span>
          <span className="p-2 rounded-xl border border-emerald-500/35 bg-emerald-500/20 text-emerald-400"><TrendingUp size={16} /></span>
        </div>
        <div className="text-xl font-extrabold text-text-primary">Bandra West</div>
        <div className="mt-1 text-sm font-semibold text-success">57.0% Net Margin</div>
        <div className="mt-2 pt-2 border-t border-border/70 text-xs text-secondary">INR 81,000 net profit</div>
      </Link>

      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Andheri%20East" className="relative overflow-hidden block rounded-2xl border border-orange-500/40 hover:border-orange-400/75 bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220] p-5 shadow-card motion-safe:transition-all motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#FB923C] to-transparent" />
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Highest Active Members</span>
          <span className="p-2 rounded-xl border border-orange-500/35 bg-orange-500/20 text-orange-400"><Users size={16} /></span>
        </div>
        <div className="text-xl font-extrabold text-text-primary">Andheri East</div>
        <div className="mt-1 text-sm font-semibold text-text-primary">420 Members</div>
        <div className="mt-2 pt-2 border-t border-border/70 text-xs text-secondary">Largest active recurring subscriber base</div>
      </Link>

      <Link href="/frontend_admin/admin_gyms/gyms_branches_directory?search=Powai" className="relative overflow-hidden block rounded-2xl border border-sky-500/40 hover:border-sky-400/75 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220] p-5 shadow-card motion-safe:transition-all motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#22D3EE] to-transparent" />
        <div className="flex items-center justify-between text-secondary mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Capacity Leader</span>
          <span className="p-2 rounded-xl border border-sky-500/35 bg-sky-500/20 text-sky-400"><Building2 size={16} /></span>
        </div>
        <div className="text-xl font-extrabold text-text-primary">Powai</div>
        <div className="mt-1 text-sm font-semibold text-text-primary">59.4% Occupancy</div>
        <div className="mt-2 pt-2 border-t border-border/70 text-xs text-secondary">190 / 320 peak utilization</div>
      </Link>
    </section>
  );
}

export const GymsComparisonKpis = AdminGymsComparisonKpis;
