// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';

import { Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerGrievanceResolutionContent from '@/app/frontend_manager/manager_grievances/grievance_resolution/components/ManagerGrievanceResolutionContent';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { ManagerGrievanceResolutionLogComplaintModal } from '@/app/frontend_manager/manager_grievances/grievance_resolution/components/ManagerGrievanceResolutionLogComplaintModal';
import { useManagerGrievanceResolutionLogic } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionLogic';
import { useManagerGrievanceResolutionResolution } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionResolution';

/**
 * @description Orchestrates the grievance route shell, search state, create-modal lifecycle, and feature hooks while delegating list/resolution rendering to a child view.
 * @dependencies Uses only the grievance feature hooks plus the module-owned content/modal components.
 * @edge-case Preserves the create flow while resolution draft protection and retry/empty/error behavior remain inside the documented hook/content boundary.
 */
export default function ManagerGrievanceResolutionMain() {
  const t = useTranslations('MANAGER_GRIEVANCE_RESOLUTION');
  const { tickets, search, setSearch, status, setStatus, category, setCategory, date, setDate, isPending, isError, error, reload, createTicket, resolveTicket, isResolving } = useManagerGrievanceResolutionLogic();
  const resolution = useManagerGrievanceResolutionResolution({ resolveTicket, isResolving });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-full pb-10">
      
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex justify-end">
          <button data-testid="manager_grievance-managergrievancemain-button-log-complaint" type="button" onClick={() => setIsModalOpen(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            <Plus size={18} strokeWidth={2} aria-hidden="true" />{t("COPY_LOG_COMPLAINT")}
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-card p-4 rounded-xl border border-border shadow-card flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
            <label htmlFor="manager-grievance-search" className="sr-only">{t("COPY_SEARCH_COMPLAINTS")}</label>
            <input className="w-full min-h-11 pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="manager_grievance-manager-grievance-main-manager-grievance-search" id="manager-grievance-search" type="search" placeholder={t("COPY_SEARCH_MEMBER_NAME_ISSUE")} value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className="w-full sm:w-44">
            <ManagerSearchableDropdown
              dataTestId="manager_grievance-status-filter"
              value={status}
              onChange={(val) => setStatus(String(val))}
              options={[
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Open', value: 'OPEN' },
                { label: 'Resolving', value: 'RESOLVING' },
                { label: 'Closed', value: 'CLOSED' },
              ]}
              placeholder="Status"
              ariaLabel="Grievance Status Filter"
            />
          </div>
          <div className="w-full sm:w-48">
            <ManagerSearchableDropdown
              dataTestId="manager_grievance-category-filter"
              value={category}
              onChange={(val) => setCategory(String(val))}
              options={[
                { label: 'All Categories', value: 'ALL' },
                { label: 'Hygiene / Cleanliness', value: 'HYGIENE' },
                { label: 'Staff Behaviour', value: 'STAFF_BEHAVIOUR' },
                { label: 'Equipment Issue', value: 'EQUIPMENT' },
                { label: 'Other', value: 'OTHER' },
              ]}
              placeholder="Category"
              ariaLabel="Grievance Category Filter"
            />
          </div>
          <div className="w-full sm:w-40">
            <ManagerSearchableDropdown
              dataTestId="manager_grievance-date-filter"
              value={date}
              onChange={(val) => setDate(String(val))}
              options={[
                { label: 'All Time', value: 'all' },
                { label: 'This Month', value: 'this_month' },
                { label: 'Last Month', value: 'last_month' },
                { label: 'This Year', value: 'this_year' },
              ]}
              placeholder="Period"
              ariaLabel="Grievance Date Filter"
            />
          </div>
        </div>
        <ManagerGrievanceResolutionContent tickets={tickets} isPending={isPending} isError={isError} error={error} reload={reload} isResolving={isResolving} resolvingTicketId={resolution.resolvingTicketId} resolutionNote={resolution.resolutionNote} setResolutionNote={resolution.setResolutionNote} startResolution={resolution.startResolution} cancelResolution={resolution.cancelResolution} submitResolution={resolution.submitResolution} />
      </div>
      {isModalOpen && <ManagerGrievanceResolutionLogComplaintModal data-testid="manager_grievance-managergrievancemain-managergrievancelogcomplaintmodal-2" onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />}
    </div>
  );
}
