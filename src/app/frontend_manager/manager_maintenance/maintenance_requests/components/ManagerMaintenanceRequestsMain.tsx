// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';

import { Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import ManagerMaintenanceRequestsContent from '@/app/frontend_manager/manager_maintenance/maintenance_requests/components/ManagerMaintenanceRequestsContent';
import { ManagerMaintenanceRequestsLogIssueModal } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/components/ManagerMaintenanceRequestsLogIssueModal';
import { useManagerMaintenanceRequestsLogic } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsLogic';

/**
 * @description Orchestrates the maintenance route shell, modal lifecycle, and module-owned data hook without rendering the feature list internals.
 * @dependencies Uses only the maintenance feature hook plus the module-owned create modal/content components.
 * @edge-case Keeps retry, empty, error, and mutation states delegated to the content component while preserving modal open/close behavior.
 */
export default function ManagerMaintenanceRequestsMain() {
  const t = useTranslations('MANAGER_MAINTENANCE_REQUESTS');
  const locale = useLocale();
  const { tickets, isPending, isError, error, reload, createTicket, resolveTicket, isResolving } = useManagerMaintenanceRequestsLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-full pb-10">
      
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-page-title font-extrabold text-text-primary">{t("COPY_MAINTENANCE")}</h1>
          <button data-testid="manager_maintenance-managermaintenancemain-button-log-issue" type="button" onClick={() => setIsModalOpen(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer w-full sm:w-auto">
            <Plus size={18} strokeWidth={2} aria-hidden="true" />{t("COPY_LOG_ISSUE")}
          </button>
        </div>
        <ManagerMaintenanceRequestsContent tickets={tickets} isPending={isPending} isError={isError} error={error} reload={reload} resolveTicket={resolveTicket} isResolving={isResolving} locale={locale} />
      </div>
      {isModalOpen && <ManagerMaintenanceRequestsLogIssueModal data-testid="manager_maintenance-managermaintenancemain-managermaintenancelogissuemodal-2" onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />}
    </div>
  );
}
