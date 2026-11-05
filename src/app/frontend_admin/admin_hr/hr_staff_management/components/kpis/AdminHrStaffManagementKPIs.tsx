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
    { key: 'total', label: t('hr.AdminAuditRepair.staffTotalCount'), value: totalStaff, Icon: Users },
    { key: 'active', label: t('hr.AdminAuditRepair.activeStaffOnPage'), value: activeOnPage, Icon: UserCheck },
    { key: 'inactive', label: t('hr.AdminAuditRepair.inactiveStaffOnPage'), value: inactiveOnPage, Icon: UserX },
    { key: 'shown', label: t('hr.AdminAuditRepair.staffShownOnPage'), value: staff.length, Icon: ListChecks },
  ];
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="admin_hr-staff-kpis">{cards.map(({ key, label, value, Icon }) => <div key={key} className="rounded-xl p-4 shadow-card border border-border bg-card flex items-center gap-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-subtle"><Icon size={18} className="text-primary" aria-hidden="true" /></div><div><p className="text-xs font-medium text-secondary">{label}</p><p className="text-xl font-bold text-primary tabular-nums">{formatNumber(value, locale)}</p></div></div>)}</div>;
}
