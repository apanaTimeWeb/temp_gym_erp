"use client";
// RESPONSIBILITY: Renders the dashboard branch leaderboard with accessible, functional column sorting.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewBranchLeaderboard → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/branch_leaderboard/AdminDashboardOverviewBranchLeaderboard.tsx)

import { useLocale, useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewBranchLeaderboardTypes';
import { AdminDashboardFormatCurrency } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatCurrency';

import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';
import { TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';
import AdminDashboardBranchLeaderboardSortIcon from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/branch_leaderboard/AdminDashboardOverviewBranchLeaderboardSortIcon';
import type { BranchPerformance } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewTypes';
import { sortAdminBranchPerformanceRows } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewSortBranchPerformanceRows';
import { AdminDashboardOverviewEmptyState as AdminDashboardEmptyState } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/empty_state/AdminDashboardOverviewEmptyState';


/**
 * AdminDashboardOverviewBranchLeaderboard renders the admin dashboard branch leaderboard UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewBranchLeaderboard: Renders the dashboard branch leaderboard with accessible, functional column sorting.
 * @dependencies Consumes AdminDashboardBranchLeaderboardTypes, AdminDashboardFormatCurrency, useAdminDashboardLogic, AdminDashboardBranchLeaderboardSortIcon, AdminDashboardTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewBranchLeaderboard(){
  const locale = useLocale();
  const t = useTranslations();

  const {stats}=useAdminDashboardLogic(); const router=useRouter(); const pathname=usePathname(); const searchParams=useSearchParams(); const selectedBranchId=searchParams.get('branchId') || 'all';
  const [sortKey,setSortKey]=useState<LeaderboardSortKey>('revenue'); const [sortDir,setSortDir]=useState<LeaderboardSortDirection>('desc');
  const rows=useMemo(()=>sortAdminBranchPerformanceRows(stats?.branchLeaderboard??[],sortKey,sortDir),[stats?.branchLeaderboard,sortKey,sortDir]);
  const handleBranchSelect=(branchId:string)=>{const params=new URLSearchParams(searchParams.toString());if(branchId==='all')params.delete('branchId');else params.set('branchId',branchId);params.delete('page');router.replace(`${pathname}${params.toString()?`?${params.toString()}`:''}`,{scroll:false});}; const handleSort=(key:LeaderboardSortKey)=>{if(sortKey===key)setSortDir((d)=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('desc');}};
  if (!stats) return null;
  if (stats.branchLeaderboard.length === 0) return <AdminDashboardEmptyState title={t('dashboard.admin_dashboard_branch_leaderboard.text_b84bd2d793')} description={t('dashboard.admin_dashboard_branch_leaderboard.auto_d88f3d054d')} />;
  return <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6"><div className="flex items-center gap-3 mb-6"><div className="p-2.5 bg-primary-subtle text-primary rounded-xl"><Building2 size={18} strokeWidth={2}/></div><div><h2 className="text-lg font-bold text-primary">{t('dashboard.admin_dashboard_branch_leaderboard.text_186698a248')}</h2><p className="text-xs text-secondary">{t('dashboard.admin_dashboard_branch_leaderboard.text_f2cb6cc8de')}</p></div></div><div className="overflow-x-auto"><table data-admin-responsive-table className="w-full text-left border-collapse"><thead><tr className="border-b border-border text-xs font-semibold text-secondary uppercase tracking-wider"><th className="pb-3 pl-2">{t('dashboard.admin_dashboard_branch_leaderboard.text_dd48a11495')}</th>{(['name','revenue','activeMembers'] as const).map((key , __testIdIndex35)=><th tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={key} onClick={()=>handleSort(key)} className="pb-3 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid={`admin_dashboard-admin_dashboard-branch-leaderboard-control-map35-${__testIdIndex35}-1`}><div className={`${key==='name'?'text-left':'text-right'} flex items-center gap-1.5 ${key!=='name'?'justify-end':''}`}>{key==='name' ? t('dashboard.admin_dashboard_branch_leaderboard.auto_427d80bd4b') : key==='revenue' ? t('dashboard.admin_dashboard_branch_leaderboard.auto_53620f46a5') : t('dashboard.admin_dashboard_branch_leaderboard.auto_9ad7e475b7')}<AdminDashboardBranchLeaderboardSortIcon column={key} sortKey={sortKey} sortDir={sortDir}/></div></th>)}<th className="pb-3 text-center">{t('dashboard.admin_dashboard_branch_leaderboard.text_dae07c6ee8')}</th></tr></thead><tbody className="divide-y divide-border">{rows.map((branch,index)=>{const selected=selectedBranchId===branch.id;return <tr key={branch.id} className={`motion-safe:transition-colors group cursor-pointer ${selected?'bg-primary-subtle border-l-2 border-focus':'hover:bg-surface-hover'}`} tabIndex={0} onClick={()=>handleBranchSelect(branch.id)} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' ')handleBranchSelect(branch.id);}} data-testid={`admin_dashboard-admin_dashboard-branch-leaderboard-control-2-map35-${index}-1`}><td className="py-3 pl-2 text-xs font-bold text-secondary">{index+1}.</td><td className="py-3"><span className="text-sm font-semibold text-primary">{branch.name}</span></td><td className="py-3 text-right"><span className="text-sm font-bold text-success">{AdminDashboardFormatCurrency(branch.revenue, stats.currency, locale)}</span></td><td className="py-3 text-right"><span className="text-sm font-medium text-primary">{branch.activeMembers}</span></td><td className="py-3 text-center"><div className="flex justify-center">{branch.trend==='up'&&<TrendingUp size={18} className="text-success" strokeWidth={2}/>}{branch.trend==='down'&&<TrendingDown size={18} className="text-danger" strokeWidth={2}/>}{branch.trend==='flat'&&<Minus size={18} className="text-secondary" strokeWidth={2}/>}</div></td></tr>;})}</tbody></table></div></div>
}
