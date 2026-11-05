"use client";
// RESPONSIBILITY: Render active health alerts, sortable/paginated records, configured action links, and confirmed dismissals.
// DATA FLOW: feature data/state and user input → AdminGymsHealthAlertsMonitoringTable → accessible UI/events routed to owning hooks (admin_gym_health_alerts/gym_health_alerts_monitoring/components/table/AdminGymsHealthAlertsMonitoringTable.tsx)

import { useEffect, useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatDateTime } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/utils/AdminGymsHealthAlertsMonitoringFormatters';
import { useAdminGymHealthAlertsLogic } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringLogic';
import { ADMIN_GYM_HEALTH_ALERTS_ROUTES } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/config/admin_gyms_health_alerts_monitoring.url_config';
import { GYM_HEALTH_ALERT_SEVERITY_LABEL_KEYS, GYM_HEALTH_ALERT_SEVERITY_STYLES, GYM_HEALTH_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/constants/AdminGymsHealthAlertsMonitoringConstants';
import type { GymHealthAlert } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringTypes';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/AdminGymsHealthAlertsMonitoringTableSkeleton';

 type SortKey = 'severity' | 'title' | 'gymName' | 'detectedAt';
 type SortDirection = 'asc' | 'desc';

function resolveActionUrl(actionKey: string): string | null {
  if (actionKey === 'members') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.members;
  if (actionKey === 'finance') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.finance;
  if (actionKey === 'hr') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.hr;
  if (actionKey === 'attendance') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.attendance;
  return null;
}

function compareAlerts(left: GymHealthAlert, right: GymHealthAlert, key: SortKey): number {
  if (key === 'detectedAt') {
    const leftTime = Date.parse(left.detectedAt);
    const rightTime = Date.parse(right.detectedAt);
    if (Number.isFinite(leftTime) && Number.isFinite(rightTime)) return leftTime - rightTime;
    if (Number.isFinite(leftTime)) return 1;
    if (Number.isFinite(rightTime)) return -1;
  }
  return String(left[key]).localeCompare(String(right[key]), undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * @description AdminGymsHealthAlertsMonitoringTable renders the GymHealthAlertsMonitoringTable interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminGymsHealthAlertsMonitoringTable() {
  const t = useTranslations();
  const locale = useLocale();
  const { alerts, status, dismissAlert, retryAlerts, hasActiveFilters } = useAdminGymHealthAlertsLogic();
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(GYM_HEALTH_ITEMS_PER_PAGE);

  useEffect(() => setPage(1), [alerts, pageSize, hasActiveFilters]);

  const sortedAlerts = useMemo(() => {
    if (!sortKey) return alerts;
    return [...alerts].sort((left, right) => compareAlerts(left, right, sortKey) * (sortDirection === 'asc' ? 1 : -1));
  }, [alerts, sortDirection, sortKey]);
  const totalPages = Math.max(1, Math.ceil(sortedAlerts.length / pageSize));
  const activePage = Math.min(page, totalPages);
  const visibleAlerts = sortedAlerts.slice((activePage - 1) * pageSize, activePage * pageSize);
  const startRecord = sortedAlerts.length ? (activePage - 1) * pageSize + 1 : 0;
  const endRecord = Math.min(activePage * pageSize, sortedAlerts.length);

  function changeSort(nextKey: SortKey) {
    setPage(1);
    if (sortKey === nextKey) setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
    else { setSortKey(nextKey); setSortDirection('asc'); }
  }

  function renderSortHeader(key: SortKey, label: string) {
    const active = sortKey === key;
    const sortIcon = !active ? <ArrowUpDown size={14} aria-hidden="true" /> : sortDirection === 'asc' ? <ArrowUp size={14} aria-hidden="true" /> : <ArrowDown size={14} aria-hidden="true" />;
    return <th scope="col" aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'} className="px-4 py-3">
      <button type="button" onClick={() => changeSort(key)} aria-label={t('gym-health-alerts.admin_gym_health_alerts_table.sortBy', { column: label })} className="inline-flex min-h-8 items-center gap-2 rounded text-left hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-table-change-sort">{label}{sortIcon}</button>
    </th>;
  }

  if (status === 'pending') return <AdminNavigationLayoutTableSkeleton rows={6} cols={6} />;
  if (status === 'error') return <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-danger" role="alert" data-testid="admin_gym_health_alerts-admin_gym_health_alerts-table-control"><p>{t('gym-health-alerts.admin_gym_health_alerts_table.text_9f3ad23bcd')}</p><button type="button" onClick={() => void retryAlerts()} className="mt-3 min-h-11 rounded px-3 underline text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-table-retry-alerts">{t('gym-health-alerts.admin_gym_health_alerts_table.retry')}</button></div>;
  if (!alerts.length) return <div className="rounded-xl border border-border bg-card p-10 text-center">{!hasActiveFilters && <CheckCircle2 size={18} strokeWidth={2} className="mx-auto mb-3 text-success" aria-hidden="true" />}<p className="text-sm font-semibold text-primary">{t(hasActiveFilters ? 'gym-health-alerts.admin_gym_health_alerts_table.noMatches' : 'gym-health-alerts.admin_gym_health_alerts_table.text_d0a3276f46')}</p></div>;

  return <section className="rounded-xl border border-border bg-card overflow-hidden" aria-label={t('gym-health-alerts.admin_gym_health_alerts_table.text_b969680a49')}>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
      <p className="text-sm text-secondary" aria-live="polite" data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-table-live-region">{t('gym-health-alerts.admin_gym_health_alerts_table.paginationSummary', { start: startRecord, end: endRecord, total: sortedAlerts.length })}</p>
      <label className="flex items-center gap-2 text-sm text-secondary">{t('gym-health-alerts.admin_gym_health_alerts_table.rowsPerPage')}
        <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))} className="min-h-11 rounded-md border border-border bg-input px-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('gym-health-alerts.admin_gym_health_alerts_table.rowsPerPage')} data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-table-set-page-size">
          {[10, 25, 50].map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
      </label>
    </div>
    <div className="overflow-x-auto"><table className="w-full text-left border-collapse" data-admin-responsive-table>
      <thead><tr className="bg-surface-highlight text-xs uppercase tracking-wider text-secondary">
        {renderSortHeader('severity', t('gym-health-alerts.admin_gym_health_alerts_table.text_de314fa0c9'))}
        {renderSortHeader('title', t('gym-health-alerts.admin_gym_health_alerts_table.text_b969680a49'))}
        {renderSortHeader('gymName', t('gym-health-alerts.admin_gym_health_alerts_table.text_bc4359231d'))}
        {renderSortHeader('detectedAt', t('gym-health-alerts.admin_gym_health_alerts_table.text_74fb2cc6c8'))}
        <th scope="col" className="px-4 py-3">{t('gym-health-alerts.admin_gym_health_alerts_table.text_97c89a4d66')}</th>
        <th scope="col" className="px-4 py-3 text-right">{t('gym-health-alerts.admin_gym_health_alerts_table.text_70afe9eff3')}</th>
      </tr></thead>
      <tbody className="divide-y divide-border">{visibleAlerts.map((alert) => {
        const href = resolveActionUrl(alert.actionKey);
        return <tr key={alert.id} className="motion-safe:transition-colors hover:bg-surface-hover">
          <td className="px-5 py-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${GYM_HEALTH_ALERT_SEVERITY_STYLES[alert.severity]}`} data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-table-severity-${alert.id}`}>{t(GYM_HEALTH_ALERT_SEVERITY_LABEL_KEYS[alert.severity])}</span></td>
          <td className="px-4 py-4"><p className="text-sm font-semibold text-primary">{alert.title}</p><p className="mt-1 text-xs text-secondary">{alert.description}</p><p className="mt-1 text-xs text-secondary">{alert.metric} {t('gym-health-alerts.admin_gym_health_alerts_table.text_e7d139364f')}{alert.threshold}</p></td>
          <td className="px-4 py-4 text-sm text-primary">{alert.gymName}</td>
          <td className="px-4 py-4 text-sm text-secondary">{formatDateTime(alert.detectedAt, locale)}</td>
          <td className="px-4 py-4">{href ? <Link data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-table-navigate-${alert.id}`} href={href} className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('gym-health-alerts.admin_gym_health_alerts_table.text_c0ba32fc60')}</Link> : <span className="text-xs text-disabled">{t('gym-health-alerts.admin_gym_health_alerts_table.text_a42c475248')}</span>}</td>
          <td className="px-4 py-4 text-right"><button type="button" onClick={() => dismissAlert(alert.id, alert.title)} aria-label={t('gym-health-alerts.AdminGymHealthAlertsTable.auto_dismiss', { title: alert.title })} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:bg-danger-bg hover:text-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-table-dismiss-${alert.id}`}><X size={18} strokeWidth={2} aria-hidden="true" /></button></td>
        </tr>;
      })}</tbody>
    </table></div>
    <nav aria-label={t('gym-health-alerts.admin_gym_health_alerts_table.paginationNavigation')} className="flex items-center justify-end gap-2 border-t border-border p-3">
      <button type="button" disabled={activePage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="min-h-11 inline-flex items-center gap-1 rounded-md border border-border px-3 text-sm text-primary disabled:cursor-not-allowed disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-table-set-page"><ChevronLeft size={16} aria-hidden="true" />{t('gym-health-alerts.admin_gym_health_alerts_table.previousPage')}</button>
      <span className="min-w-20 text-center text-sm text-secondary" aria-live="polite" data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-table-live-region-2">{t('gym-health-alerts.admin_gym_health_alerts_table.pageSummary', { page: activePage, pages: totalPages })}</span>
      <button type="button" disabled={activePage >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="min-h-11 inline-flex items-center gap-1 rounded-md border border-border px-3 text-sm text-primary disabled:cursor-not-allowed disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="gym-health-alerts-monitoring-gym-health-alerts-monitoring-table-set-page-2">{t('gym-health-alerts.admin_gym_health_alerts_table.nextPage')}<ChevronRight size={16} aria-hidden="true" /></button>
    </nav>
  </section>;
}
