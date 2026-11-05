// RESPONSIBILITY: Renders responsive desktop and mobile staff lists and their pagination.
'use client';


import { Edit2, Trash2, CheckCircle2, Ban, PlayCircle, Users } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';
import ManagerStaffPayrollAndAttendanceStaffEmptyState from '@/app/frontend_manager/manager_staff_hr/staff_directory/components/ManagerStaffDirectoryStaffEmptyState';
import { STAFF_TABLE_HEADERS } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_shared.constants';
import { ManagerStaffPayrollAndAttendanceDisplayValue, ManagerStaffPayrollAndAttendanceFormatCurrency, ManagerStaffPayrollAndAttendanceFormatDate, ManagerStaffPayrollAndAttendanceMaskSensitiveData } from '@/app/frontend_manager/manager_staff_hr/staff_directory/utils/ManagerStaffDirectoryFormatters';
import type { Staff } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';

type Props = {
  staff: Staff[]; totalStaff: number; debouncedSearch: string; currentPage: number; setCurrentPage: (page: number) => void;
  openEdit: (staff: Staff) => void; deleteStaff: (id: string) => Promise<void>; toggleStaffStatus: (staff: Staff) => Promise<void>;
  setViewProfileData: (staff: Staff | null) => void;
};
export default function ManagerStaffPayrollAndAttendanceStaffTableContent({ staff, totalStaff, debouncedSearch, currentPage, setCurrentPage, openEdit, deleteStaff, toggleStaffStatus, setViewProfileData }: Props) {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();
  const { confirm } = useConfirm();
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
  const totalPages = Math.max(1, Math.ceil(totalStaff / MANAGER_ITEMS_PER_PAGE));
  return (
    <>
      <div className="hidden lg:block flex-1">
        <ManagerInfrastructureResponsiveTable labels={[...translatedHeaders, t('COPY_ACTIONS_3')]}>
<table className="w-full">
          <thead className="bg-input text-text-secondary border-b border-border">
            <tr>
              {translatedHeaders.map((header, index) => (
                <th key={STAFF_TABLE_HEADERS[index]} className={`text-xs font-semibold uppercase tracking-wider px-3 py-3 whitespace-nowrap ${index === 4 || index === 5 ? 'text-right' : 'text-left'}`}>
                  {header}
                </th>
              ))}
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-3 py-3 whitespace-nowrap">{t("COPY_ACTIONS_3")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map((s, mapIndex) => (
              <tr
                data-testid={`manager_hr-hr-managerhrstafftable-row-${s.id}`}
                key={s.id}
                className="motion-safe:transition-all hover:bg-surface-hover motion-safe:duration-200 ease-in-out"
              >
                <td className="px-3 py-3 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setViewProfileData(s)}
                    aria-label={t('TEXT_OPEN_STAFF_PROFILE', { value: s.name })}
                    aria-haspopup="dialog"
                    className="flex w-full items-center gap-2.5 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-subtle text-sm font-bold text-primary shrink-0">
                      {(s.name || '?').charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-text-primary">{ManagerStaffPayrollAndAttendanceDisplayValue(s.name)}</span>
                      <span className="block text-xs text-text-secondary">{ManagerStaffPayrollAndAttendanceDisplayValue(s.email)}</span>
                    </span>
                  </button>
                </td>
                <td className="px-3 py-3 text-sm text-text-primary whitespace-nowrap">{s.role}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  {s.isActive === false ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-danger text-on-danger border border-border" data-testid="manager_hr-managerhrstafftable-status-badge-1">
                      <Ban size={15} strokeWidth={2} className=""/>{t("COPY_SUSPENDED")}</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success border border-border" data-testid="manager_hr-managerhrstafftable-status-badge-2">
                      <CheckCircle2 size={15} strokeWidth={2} className=""/>{t("COPY_ACTIVE")}</span>
                  )}
                </td>
                <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">{ManagerStaffPayrollAndAttendanceMaskSensitiveData(s.phone, 'phone')}</td>
                <td className="px-3 py-3 text-sm font-medium text-success-text text-right whitespace-nowrap">{ManagerStaffPayrollAndAttendanceFormatCurrency(s.salary || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-3 py-3 text-sm font-medium text-text-primary text-right whitespace-nowrap">{s.advanceSalary && s.advanceSalary > 0 ? ManagerStaffPayrollAndAttendanceFormatCurrency(s.advanceSalary, ManagerEnvConfig.currencyCode, locale) : ManagerStaffPayrollAndAttendanceDisplayValue(null)}</td>
                <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                  {ManagerStaffPayrollAndAttendanceDisplayValue(s.joinDate ? ManagerStaffPayrollAndAttendanceFormatDate(s.joinDate) : null)}
                </td>
                <td className="px-3 py-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 min-w-11 md:min-h-8 md:min-w-8 p-1.5 flex items-center justify-center rounded-lg motion-safe:transition-all motion-safe:duration-200 ease-in-out ${
                        s.isActive === false
                          ? 'text-success-text hover:bg-success-bg'
                          : 'text-danger-text hover:bg-danger-bg'
                      } motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-suspend-staff-member-${mapIndex}`}
                      onClick={async (e) => {
                        e.stopPropagation();
                        // Rule 71: toggleStaffStatus is a destructive/reversible action — require confirmation.
                        const isSuspending = s.isActive !== false;
                        const ok = await confirm({
                          title: isSuspending ? t("TEXT_CONFIRM_SUSPEND_TITLE") : t("TEXT_CONFIRM_ACTIVATE_TITLE"),
                          message: isSuspending
                            ? t("TEXT_CONFIRM_SUSPEND_MESSAGE", { value: s.name })
                            : t("TEXT_CONFIRM_ACTIVATE_MESSAGE", { value: s.name }),
                          type: isSuspending ? 'danger' : 'info',
                          confirmText: isSuspending ? t("TEXT_SUSPEND_ACTION") : t("TEXT_ACTIVATE_ACTION") });
                        if (ok) toggleStaffStatus(s);
                      }}
                      
                      title={s.isActive === false ? t("TEXT_ACTIVATE_STAFF") : t("TEXT_SUSPEND_STAFF")}
                      aria-label={s.isActive === false ? t("TEXT_ACTIVATE_STAFF_BY_NAME", { value: s.name }) : t("TEXT_SUSPEND_STAFF_BY_NAME", { value: s.name })}
                     type="button">
                      {s.isActive === false ? <PlayCircle size={16} strokeWidth={2}/> : <Ban size={16} strokeWidth={2}/>}
                    </button>
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 md:min-h-8 md:min-w-8 p-1.5 flex items-center justify-center rounded hover:bg-primary-subtle motion-safe:transition-all text-text-secondary hover:text-primary motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-edit-${s.id}`} 
                      onClick={(e) => { e.stopPropagation(); openEdit(s); }} 
                      
                      title={t("COPY_EDIT")}
                     type="button">
                      <Edit2 size={16} strokeWidth={2}/>
                    </button>
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 md:min-h-8 md:min-w-8 p-1.5 flex items-center justify-center rounded motion-safe:transition-all text-danger-text hover:bg-danger-bg motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-delete-staff-${mapIndex}`} 
                      onClick={async (e) => { 
                        e.stopPropagation(); 
                        const ok = await confirm({
                          title: t("COPY_DELETE_STAFF_1"),
                          message: t("TEXT_DELETE_STAFF_MESSAGE", { value: s.name }),
                          type: 'danger',
                          confirmText: t("COPY_DELETE_2")
                        });
                        if (ok) {
                          deleteStaff(s.id); 
                        }
                      }}
                      
                      title={t("COPY_DELETE_1")}
                     type="button">
                      <Trash2 size={16} strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={STAFF_TABLE_HEADERS.length + 1} className="p-0 border-b-0">
                  <ManagerStaffPayrollAndAttendanceStaffEmptyState hasSearch={Boolean(debouncedSearch)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      </div>
      <div className="lg:hidden flex-1 overflow-y-auto divide-y divide-border">
        {staff.map((s, mapIndex) => (
          <article key={`mobile-staff-${s.id}`} className="p-4 bg-card space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-text-primary truncate">{s.name}</p>
                <p className="text-xs text-text-secondary truncate">{ManagerStaffPayrollAndAttendanceDisplayValue(s.email)}</p>
              </div>
              <span className={`shrink-0 px-2 py-1 rounded-full text-badge font-semibold ${s.isActive === false ? 'bg-danger text-on-danger' : 'bg-success text-on-success'}`} data-testid="manager_hr-managerhrstafftable-status-badge-3">
                {s.isActive === false ? t('COPY_INACTIVE') : t('COPY_ACTIVE')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-text-secondary">{t("COPY_ROLE_1")}</p><p className="text-text-primary truncate">{ManagerStaffPayrollAndAttendanceDisplayValue(s.role)}</p></div>
              <div><p className="text-xs text-text-secondary">{t("COPY_PHONE_2")}</p><p className="text-text-primary truncate">{ManagerStaffPayrollAndAttendanceDisplayValue(s.phone)}</p></div>
              <div><p className="text-xs text-text-secondary">{t("COPY_SALARY")}</p><p className="text-text-primary">{ManagerStaffPayrollAndAttendanceFormatCurrency(s.salary || 0, ManagerEnvConfig.currencyCode, locale)}</p></div>
              <div><p className="text-xs text-text-secondary">{t("COPY_JOIN_DATE_2")}</p><p className="text-text-primary">{s.joinDate ? ManagerStaffPayrollAndAttendanceFormatDate(s.joinDate) : '—'}</p></div>
            </div>
            <div className="flex justify-end gap-2">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-edit-mobile-${s.id}`} type="button" onClick={() => openEdit(s)}  aria-label={t("TEXT_EDIT_STAFF", { value: s.name })}><Edit2 size={18} strokeWidth={2}/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-view-mobile-${s.id}`} type="button" onClick={() => setViewProfileData(s)}  aria-label={t("TEXT_VIEW_STAFF", { value: s.name })}><Users size={18} strokeWidth={2}/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 min-w-11 p-2 rounded-md motion-safe:transition-all ${s.isActive === false ? 'text-success-text hover:bg-success-bg' : 'text-danger-text hover:bg-danger-bg'} motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-toggle-mobile-${s.id}`} type="button" onClick={async () => {
                const isSuspending = s.isActive !== false;
                const ok = await confirm({ title: isSuspending ? t("TEXT_CONFIRM_SUSPEND_TITLE") : t("TEXT_CONFIRM_ACTIVATE_TITLE"), message: isSuspending ? t("TEXT_CONFIRM_SUSPEND_MESSAGE", { value: s.name }) : t("TEXT_CONFIRM_ACTIVATE_MESSAGE", { value: s.name }), type: isSuspending ? 'danger' : 'info', confirmText: isSuspending ? t("TEXT_SUSPEND_ACTION") : t("TEXT_ACTIVATE_ACTION") });
                if (ok) toggleStaffStatus(s);
              }}  aria-label={s.isActive === false ? t("TEXT_ACTIVATE_STAFF_BY_NAME", { value: s.name }) : t("TEXT_SUSPEND_STAFF_BY_NAME", { value: s.name })}>{s.isActive === false ? <PlayCircle size={18} strokeWidth={2}/> : <Ban size={18} strokeWidth={2}/>}</button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 rounded-md text-danger-text hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrstafftable-button-activate-${mapIndex}`} type="button" onClick={async () => {
                const ok = await confirm({ title: t("COPY_DELETE_STAFF_2"), message: t("TEXT_DELETE_STAFF_MESSAGE", { value: s.name }), type: 'danger', confirmText: t("COPY_DELETE_3") });
                if (ok) deleteStaff(s.id);
              }}  aria-label={t("TEXT_DELETE_STAFF_BY_NAME", { value: s.name })}><Trash2 size={18} strokeWidth={2}/></button>
            </div>
          </article>
        ))}
        {staff.length === 0 && (
          <div className="p-0"><ManagerStaffPayrollAndAttendanceStaffEmptyState hasSearch={Boolean(debouncedSearch)} /></div>
        )}
      </div>
      <ManagerPagination data-testid="manager_hr-managerhrstafftable-managerpagination-1" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalStaff} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </>
  );
}
