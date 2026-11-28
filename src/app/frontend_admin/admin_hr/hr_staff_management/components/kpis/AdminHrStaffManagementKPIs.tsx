"use client";
// RESPONSIBILITY: Displays staff-directory totals and current-page status counts; financial KPIs belong to Finance.
import { useLocale, useTranslations } from 'next-intl';
import { formatNumber } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementFormatters';
import { RefreshCw, Users, UserCheck, UserX, ListChecks } from 'lucide-react';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementViewModel';

export default function AdminHrManagementKPIs() {
  const t = useTranslations();
  const locale = useLocale();
  const { staff, totalStaff, status, error, retryStaff } = useAdminHrViewModel();
  if (status === 'pending') {
    return <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-busy="true" aria-label={t('hr.AdminAuditRepair.staffMetricsLoading')} data-testid="admin_hr-staff-kpis-loading">{['staff-kpi-1','staff-kpi-2','staff-kpi-3','staff-kpi-4'].map((key) => <div key={key} className="h-28 rounded-xl border border-border bg-card motion-safe:animate-pulse" />)}</div>;
  }
  if (status === 'error') {
    return <div className="rounded-xl border border-border bg-danger-bg p-4 text-sm text-danger" role="alert" data-testid="admin_hr-staff-kpis-error"><p>{t('hr.AdminAuditRepair.staffMetricsFailed')}</p><button type="button" onClick={() => void retryStaff()} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="admin_hr-staff-kpis-retry"><RefreshCw size={16} aria-hidden="true" />{t('hr.AdminAuditRepair.retryStaffMetrics')}</button></div>;
  }
  const activeOnPage = staff.filter((member) => member.isActive).length;
  const inactiveOnPage = staff.length - activeOnPage;
  const cards = [
    { key: 'total', label: t('hr.AdminAuditRepair.staffTotalCount'), value: totalStaff, Icon: Users, border: 'border-orange-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent', badge: 'bg-orange-500/20 border-orange-500/40 text-orange-400' },
    { key: 'active', label: t('hr.AdminAuditRepair.activeStaffOnPage'), value: activeOnPage, Icon: UserCheck, border: 'border-emerald-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]', topBar: 'from-[#10B981] via-[#34D399] to-transparent', badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' },
    { key: 'inactive', label: t('hr.AdminAuditRepair.inactiveStaffOnPage'), value: inactiveOnPage, Icon: UserX, border: 'border-rose-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]', topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent', badge: 'bg-rose-500/20 border-rose-500/40 text-rose-400' },
    { key: 'shown', label: t('hr.AdminAuditRepair.staffShownOnPage'), value: staff.length, Icon: ListChecks, border: 'border-sky-500/40', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]', topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent', badge: 'bg-sky-500/20 border-sky-500/40 text-sky-400' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_hr-staff-kpis">
      {cards.map(({ key, label, value, Icon, border, surface, topBar, badge }) => (
        <div key={key} className={`relative overflow-hidden rounded-2xl p-5 shadow-card border ${surface} ${border} flex items-center justify-between gap-3`}>
          <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${topBar}`} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary truncate">{label}</p>
            <p className="text-kpi font-extrabold text-text-primary tabular-nums mt-1">{formatNumber(value, locale)}</p>
          </div>
          <div className={`p-2.5 rounded-xl border shrink-0 flex items-center justify-center ${badge}`}>
            <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
          </div>
        </div>
      ))}
    </div>
  );
}
