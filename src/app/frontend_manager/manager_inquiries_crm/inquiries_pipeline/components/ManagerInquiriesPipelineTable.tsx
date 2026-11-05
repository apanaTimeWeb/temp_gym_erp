// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { useTranslations } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';

import { MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import { INQUIRIES_TABLE_HEADER_KEYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_shared.constants';
import ManagerInquiriesPipelineTableRow from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineTableRow';
import ManagerInquiriesPipelineEmptyState from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineEmptyState';
import { useManagerInquiriesPipelineLogic } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineLogic';


/** @description Renders the ManagerInquiriesPipelineTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerInquiriesPipelineTable() {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');

  const {
    inquiries, isPending, isError, errorMessage, search, statusFilter, currentPage, setCurrentPage,
    openEdit, openMsg, deleteInquiry, updateStatus, totalInquiries,
    selectedIds, toggleSelectAll, toggleSelectOne } = useManagerInquiriesPipelineLogic();

  const allSelected = inquiries.length > 0 && selectedIds.length === inquiries.length;
  const isSelected = (id: string) => selectedIds?.includes(id);

  const totalPages = Math.ceil(totalInquiries / MANAGER_ITEMS_PER_PAGE);

  const MANAGER_SKELETON_ROWS = ['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5'];

  if (isPending) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
        <div className="overflow-x-auto">
          <ManagerInfrastructureResponsiveTable labels={['', ...INQUIRIES_TABLE_HEADER_KEYS.map((labelKey) => t(labelKey))]}>
<table className="w-full">
            <thead className="bg-primary-subtle">
              <tr>
                <th className="px-5 py-3 w-12" />
                {INQUIRIES_TABLE_HEADER_KEYS.map((labelKey) => (
                  <th key={labelKey} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3">
                    {t(labelKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MANAGER_SKELETON_ROWS.map((key) => (
                <tr key={key} className="motion-safe:animate-pulse">
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-4"></div></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-input"></div>
                      <div className="h-4 bg-input rounded w-24"></div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-32"></div></td>
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-16"></div></td>
                  <td className="px-5 py-4"><div className="h-8 bg-input rounded-lg w-28"></div></td>
                  <td className="px-5 py-4"><div className="h-4 bg-input rounded w-20"></div></td>
                  <td className="px-5 py-4"><div className="h-8 bg-input rounded-lg w-32"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
</ManagerInfrastructureResponsiveTable>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-card rounded-xl shadow-card border border-danger overflow-hidden flex flex-col h-full min-h-96 justify-center items-center py-16 text-center">
        <p role="alert" aria-live="assertive" className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <p className="text-sm mt-1 text-text-secondary">{t("COPY_CHECK_CONNECTION_TRY_AGAIN")}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable labels={['', ...INQUIRIES_TABLE_HEADER_KEYS.map((labelKey) => t(labelKey))]}>
<table className="w-full">
          <thead className="bg-primary-subtle">
            <tr>
              <th className="px-5 py-3 w-12 text-left">
                <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-4 h-4 rounded border-border text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-inquiries-table-input-checkbox-toggle"
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  
                 aria-label={t("TEXT_SELECT_ALL_INQUIRIES")}/>
              </th>
              {INQUIRIES_TABLE_HEADER_KEYS.map((labelKey) => (
                <th key={labelKey} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3">
                  {t(labelKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inquiries.map((inq, mapIndex) => (
              <ManagerInquiriesPipelineTableRow
                key={inq.id}
                inq={inq}
                mapIndex={mapIndex}
                selected={Boolean(isSelected(inq.id))}
                openEdit={openEdit}
                openMsg={openMsg}
                deleteInquiry={deleteInquiry}
                updateStatus={updateStatus}
                toggleSelectOne={toggleSelectOne}
              />
            ))}
            {inquiries.length === 0 && !isPending && !isError && (
              <tr>
                <td colSpan={INQUIRIES_TABLE_HEADER_KEYS.length + 1}>
                  <ManagerInquiriesPipelineEmptyState hasFilters={Boolean(search) || statusFilter !== MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.ALL_FILTER} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      </div>
      <ManagerPagination data-testid="manager_inquiries-managerinquiriestable-managerpagination-2"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalInquiries}
        itemsPerPage={MANAGER_ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
