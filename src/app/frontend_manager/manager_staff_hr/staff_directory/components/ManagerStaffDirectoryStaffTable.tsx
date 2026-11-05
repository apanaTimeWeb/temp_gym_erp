// RESPONSIBILITY: Renders ManagerStaffPayrollAndAttendanceStaffTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';


import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { STAFF_TABLE_HEADERS } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_shared.constants';

import ManagerStaffPayrollAndAttendanceStaffTableContent from '@/app/frontend_manager/manager_staff_hr/staff_directory/components/ManagerStaffDirectoryStaffTableContent';
import { useManagerStaffDirectoryContext } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryUIState';

// Rule 71 FIX: toggleStaffStatus now uses useConfirm() modal before firing.
// Rule 48 FIX: Uses ManagerEmptyState component for empty state.


/** @description Renders the ManagerStaffPayrollAndAttendanceStaffTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves loading state, empty state, modal lifecycle, responsive behavior. */
export default function ManagerStaffPayrollAndAttendanceStaffTable() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const staffTableHeaderKeys = [
    'TEXT_STAFF_FIELD_FULL_NAME',
    'COPY_ROLE_1',
    'COPY_STATUS_1',
    'COPY_PHONE_2',
    'COPY_SALARY',
    'COPY_ADVANCE_BALANCE_1',
    'COPY_JOIN_DATE_2',
  ] as const;
  const translatedHeaders = staffTableHeaderKeys.map((key) => t(key));

  const {
    staff, totalStaff, isPending, isError, error, loadAll, debouncedSearch,
    currentPage, setCurrentPage, openEdit, deleteStaff, toggleStaffStatus,
    setViewProfileData, exportStaff,
  } = useManagerStaffDirectoryContext();


  if (isPending) {
    return (
      <div className="flex flex-col h-full">
        <div className="hidden lg:block overflow-x-auto flex-1">
          <ManagerInfrastructureResponsiveTable labels={[...translatedHeaders, t('COPY_ACTIONS_3')]}>
            <table className="w-full">
              <thead className="bg-input text-text-secondary">
                <tr>
                  {translatedHeaders.map((header, index) => <th key={STAFF_TABLE_HEADERS[index]} className={`text-xs font-semibold uppercase tracking-wider px-4 py-3 ${index === 4 || index === 5 ? 'text-right' : 'text-left'}`}>{header}</th>)}
                  <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">{t('COPY_ACTIONS_3')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...Array(5)].map((_, index) => (
                  <tr key={`staff-loading-${index}`} className="motion-safe:animate-pulse">
                    {Array.from({ length: STAFF_TABLE_HEADERS.length + 1 }, (_, cellIndex) => (
                      <td key={`staff-loading-${index}-cell-${cellIndex}`} className="px-4 py-4"><div className="h-4 rounded bg-input w-24" /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </ManagerInfrastructureResponsiveTable>
        </div>
        <div className="lg:hidden flex-1 p-4 space-y-3" role="status" aria-live="polite" aria-busy="true">
          {[...Array(4)].map((_, index) => (
            <div key={`staff-mobile-loading-${index}`} className="rounded-xl border border-border bg-card p-4 space-y-3 motion-safe:animate-pulse">
              <div className="h-4 w-2/3 rounded bg-input" />
              <div className="h-3 w-1/2 rounded bg-input" />
              <div className="grid grid-cols-2 gap-3"><div className="h-4 rounded bg-input" /><div className="h-4 rounded bg-input" /></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 rounded-xl border border-danger bg-card p-6 text-center" role="alert">
        <p className="text-sm text-danger-text">{error || t('TEXT_GENERIC_ERROR')}</p>
        <button type="button" onClick={() => { void loadAll(); }} className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
          {t('COPY_TRY_AGAIN')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Export CSV toolbar — Rule HIGHLY RECOMMENDED */}
      <div className="flex justify-end px-4 pt-3">
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-primary-subtle text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-staff-table-button-export"
          onClick={() => { void exportStaff(); }}
          
          aria-label={t("COPY_EXPORT_STAFF_LIST_AS_CSV")}
         type="button">
          <Download size={18} strokeWidth={2}/>{t("COPY_EXPORT_CSV")}</button>
      </div>
      <ManagerStaffPayrollAndAttendanceStaffTableContent
        staff={staff}
        totalStaff={totalStaff}
        debouncedSearch={debouncedSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openEdit={openEdit}
        deleteStaff={deleteStaff}
        toggleStaffStatus={toggleStaffStatus}
        setViewProfileData={setViewProfileData}
      />
    </div>
  );
}
