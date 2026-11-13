// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerMaintenanceRequestsEmptyState from '@/app/frontend_manager/manager_maintenance/maintenance_requests/components/ManagerMaintenanceRequestsEmptyState';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import { MAINTENANCE_PRIORITIES } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/constants/manager_maintenance_requests.constants';
import { MANAGER_MAINTENANCE_REQUESTS_DEFAULT_PRIORITY, MANAGER_MAINTENANCE_REQUESTS_RESOLVED_STATUS, MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/constants/manager_maintenance_requests.constants';
import { ManagerMaintenanceRequestsFormatCurrency, ManagerMaintenanceRequestsFormatDateTime } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/utils/ManagerMaintenanceRequestsFormatters';
import type { ManagerMaintenanceRequestsContentProps } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests_content.types';
import type { MaintenancePriority, MaintenanceStatus, MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/types/manager_maintenance_requests.types';

function getMaintenancePriorityClass(priority: MaintenancePriority): string {
  switch (priority) {
    case MAINTENANCE_PRIORITIES[2]?.value: return 'text-danger-text bg-danger-bg border-danger';
    case MANAGER_MAINTENANCE_REQUESTS_DEFAULT_PRIORITY: return 'text-warning-text bg-warning-bg border-warning';
    default: return 'text-success-text bg-success-bg border-success';
  }
}

function getMaintenanceStatusIcon(status: MaintenanceStatus) {
  switch (status) {
    case MANAGER_MAINTENANCE_REQUESTS_RESOLVED_STATUS: return <CheckCircle size={18} strokeWidth={2} className="text-success-text" aria-hidden="true"/>;
    case MANAGER_MAINTENANCE_REQUESTS_STATUS_VALUES.IN_PROGRESS: return <Clock size={18} strokeWidth={2} className="text-warning-text" aria-hidden="true"/>;
    default: return <AlertCircle size={18} strokeWidth={2} className="text-danger-text" aria-hidden="true" />;
  }
}

/**
 * @description Renders the maintenance list, loading skeleton, error recovery, and empty state while receiving business state from the parent orchestration layer.
 * @dependencies Maintenance data and mutation callbacks are supplied by the owning maintenance feature hook; formatting and constants remain module-owned.
 * @edge-case Keeps retry, empty, and mutation-loading states visible without exposing transport errors or creating sibling-feature dependencies.
 */
export default function ManagerMaintenanceRequestsContent({ tickets, isPending, isError, error, reload, resolveTicket, isResolving, locale }: ManagerMaintenanceRequestsContentProps) {
  const t = useTranslations('MANAGER_MAINTENANCE_REQUESTS');
  const { confirm } = useConfirm();
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-label={t("COPY_LOADING_MAINTENANCE_ISSUES")}>
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-44 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse">
            <div className="h-5 w-1/3 m-5 rounded bg-skeleton-highlight" />
            <div className="h-4 w-2/3 mx-5 mb-3 rounded bg-skeleton-highlight" />
            <div className="h-4 w-1/2 mx-5 rounded bg-skeleton-highlight" />
          </div>
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <div data-testid="manager_maintenance-manager-maintenance-content-status-error" className="rounded-xl border border-danger bg-danger-bg p-6">
        <p className="text-sm font-semibold text-danger-text">{t("COPY_WE_COULD_NOT_LOAD_MAINTENANCE_ISSUES_RIGHT_NOW")}</p>
        <p className="mt-1 text-sm text-text-secondary">{ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR'))}</p>
        <button className="mt-4 min-w-32 min-h-11 rounded-lg bg-primary text-on-primary px-4 font-semibold inline-flex items-center gap-2 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="manager_maintenance-manager-maintenance-content-button-retry" type="button" onClick={() => void reload()}>
          <Loader2 size={18} strokeWidth={2} aria-hidden="true"/>{t("COPY_RETRY")}
        </button>
      </div>
    );
  }
  if (tickets.length === 0) {
    return <ManagerMaintenanceRequestsEmptyState />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tickets.map((ticket: MaintenanceTicket, mapIndex: number) => (
        <article key={ticket.id} className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-card flex flex-col h-full motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
            <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded border ${getMaintenancePriorityClass(ticket.priority)}`}>{ticket.priority}{t("COPY_PRIORITY_1")}</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-input rounded-md">
              {getMaintenanceStatusIcon(ticket.status)}
              <span className="text-text-primary">{ticket.status.replace('_', ' ')}</span>
            </div>
          </div>
          <h3 className="text-base font-bold text-text-primary mb-1 truncate" title={ticket.title}>{ticket.title}</h3>
          <p className="text-sm font-medium text-text-secondary mb-4 truncate" title={ticket.equipment}>{ticket.equipment}</p>
          <div className="mt-auto space-y-2 text-xs text-text-secondary">
            <div className="flex justify-between gap-3"><span>{t("COPY_REPORTED")}</span><span className="font-medium text-text-primary text-right">{ManagerMaintenanceRequestsFormatDateTime(ticket.reportedAt)}</span></div>
            {ticket.assignedVendor && <div className="flex justify-between gap-3"><span>{t("COPY_VENDOR")}</span><span className="font-medium text-text-primary text-right truncate" title={ticket.assignedVendor}>{ticket.assignedVendor}</span></div>}
            {ticket.estimatedCost !== undefined && <div className="flex justify-between gap-3"><span>{t("COPY_EST_COST")}</span><span className="font-medium text-text-primary text-right">{ManagerMaintenanceRequestsFormatCurrency(ticket.estimatedCost, ManagerEnvConfig.currencyCode, locale)}</span></div>}
          </div>
          <div className="mt-3 pt-2 border-t border-border">
            <p className="text-[11px] text-text-secondary italic">
              Floor Verification: Manager confirms physical repair readiness. Admin approves final vendor billing.
            </p>
          </div>
          {ticket.status !== MANAGER_MAINTENANCE_REQUESTS_RESOLVED_STATUS && (
            <button className="w-full min-h-11 mt-3 rounded-lg bg-success text-on-success font-semibold text-sm motion-safe:transition-all disabled:opacity-70 inline-flex items-center justify-center gap-2 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid={`manager_maintenance-manager-maintenance-content-button-resolve-${ticket.id}`} type="button" onClick={async () => {
              if (isResolving) return;
              const ok = await confirm({
                title: 'Confirm Physical Repair Verification',
                message: `Have you verified that "${ticket.equipment}" is fully repaired and safe on the gym floor? Resolving notifies Admin for vendor settlement.`,
                type: 'info',
                confirmText: 'Verify & Mark Operational'
              });
              if (ok) {
                void resolveTicket(ticket.id);
              }
            }} disabled={isResolving}>
              {isResolving && <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true"/>}{isResolving ? t('COPY_RESOLVING') : t('COPY_MARK_AS_RESOLVED')}
            </button>
          )}
        </article>
      ))}
    </div>
  );
}
