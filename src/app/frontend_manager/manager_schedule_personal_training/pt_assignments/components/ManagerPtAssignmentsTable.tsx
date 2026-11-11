// RESPONSIBILITY: Renders ManagerPtAssignmentsTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPtAssignmentsEmptyState from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsEmptyState';
import type { ManagerPtAssignmentsTableProps } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments_table.types';


/**
 * @description Renders/orchestrates the ManagerPtAssignmentsTable user interface for the pt module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_schedule_personal_training/manager_pt_components/manager_pt_assignments_empty_state/ManagerPtAssignmentsEmptyState; @/app/frontend_manager/manager_schedule_personal_training/manager_pt_types/ManagerPtAssignmentsTableTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const PT_ASSIGNMENTS_COLUMN_COUNT = 5;



/** @description Renders the ManagerPtAssignmentsTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerPtAssignmentsTable({ assignments, totalAssignments = assignments.length, currentPage = 1, totalPages = 1, pageSize: pageSizeProp = 10, onPageChange = () => undefined, markingId, onMarkSession, isPending }: ManagerPtAssignmentsTableProps) {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');
  const pageSize = Number.isSafeInteger(pageSizeProp) && pageSizeProp > 0 ? pageSizeProp : Math.max(1, assignments.length);

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-base font-semibold text-text-primary">{t("COPY_ACTIVE_ASSIGNMENTS_TRACKING")}</h2>
        <span className="text-xs text-text-secondary font-medium">{totalAssignments}{t("COPY_TOTAL")}</span>
      </div>

      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable labels={[t('COPY_MEMBER'), t('COPY_TRAINER_3'), t('COPY_PACKAGE'), t('COPY_PROGRESS'), t('COPY_ACTION')]}>
<table className="w-full text-left border-collapse min-w-176">
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              <th className="py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">{t("COPY_MEMBER")}</th>
              <th className="py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">{t("COPY_TRAINER_3")}</th>
              <th className="py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">{t("COPY_PACKAGE")}</th>
              <th className="py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider min-w-40">{t("COPY_PROGRESS")}</th>
              <th className="py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">{t("COPY_ACTION")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(() => { if (isPending) { return (
              <tr>
                <td colSpan={PT_ASSIGNMENTS_COLUMN_COUNT} className="py-16 text-center">
                  <Loader2 size={18} strokeWidth={2} className="mx-auto text-primary motion-safe:animate-spin"/>
                </td>
              </tr>
            ); } return (() => { if (assignments.length === 0) { return (
              <tr>
                <td colSpan={PT_ASSIGNMENTS_COLUMN_COUNT}>
                  <ManagerPtAssignmentsEmptyState />
                </td>
              </tr>
            ); } return (
              assignments.map((a, mapIndex) => {
                const pct = a.totalSessions > 0 ? Math.round((a.completedSessions / a.totalSessions) * 100) : 0;
                const isMarking = markingId === a.id;
                const isDone = a.completedSessions >= a.totalSessions;
                
                return (
                  <tr key={a.id} className="hover:bg-input motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                    <td className="py-3 px-4 text-sm font-medium text-text-primary">{a.memberName}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{a.trainerName}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{a.packageName} ({a.totalSessions}{t("COPY_S")}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-input rounded-full overflow-hidden">
                          <progress data-testid={`manager_pt-manager-pt-main-progress-${a.id}`}
                            value={pct}
                            max={100}
                            aria-label={t("COPY_COMPLETED_SESSIONS_PROGRESS")}
                            className={`h-full w-full overflow-hidden rounded-full ${isDone ? 'bg-success-bg' : 'bg-primary-subtle'}`}
                          />
                        </div>
                        <span className="text-xs font-bold text-text-primary whitespace-nowrap w-10 text-right">
                          {a.completedSessions}/{a.totalSessions}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-w-32 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-input hover:bg-primary-subtle hover:text-primary hover:border-primary border border-transparent text-primary rounded-lg motion-safe:transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_pt-pt-managerptassignmentstable-button-completed-${a.id}`}
                        onClick={() => onMarkSession(a.id)}
                        disabled={isMarking || isDone}
                        
                       type="button">
                        {isMarking && <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>}
                        {isDone ? t('COPY_COMPLETED') : t('COPY_MARK_SESSION')}
                      </button>
                    </td>
                  </tr>
                );
              })
            ); })(); })()}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      </div>

      {/* Pagination Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
        <p className="text-xs text-text-secondary font-medium">{t("COPY_SHOWING")}{assignments.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1}–{Math.min(currentPage * pageSize, totalAssignments)}{t("COPY_TEXT")}{totalAssignments}{t("COPY_RESULTS")}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">{t("COPY_PAGE_SIZE", { count: pageSize })}</span>
          <div className="flex items-center gap-1">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-w-11 min-h-11 min-w-11 min-h-11 min-w-11 min-h-11 p-1 rounded-md border border-border text-text-secondary bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_pt-manager-pt-main-button-pagination-1" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage <= 1} aria-label={t("COPY_PREVIOUS_PAGE")}  type="button">
              <ChevronLeft size={18} strokeWidth={2}/>
            </button>
            <span className="text-xs text-text-secondary">{currentPage} / {totalPages}</span>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-w-11 min-h-11 min-w-11 min-h-11 min-w-11 min-h-11 p-1 rounded-md border border-border text-text-secondary bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_pt-manager-pt-main-button-pagination-2" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages} aria-label={t("COPY_NEXT_PAGE")}  type="button">
              <ChevronRight size={18} strokeWidth={2}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
