// RESPONSIBILITY: Composes the Staff Directory page and provides one shared orchestration instance to its table and modal surfaces.
'use client';

import { useTranslations } from 'next-intl';

import ManagerStaffPayrollAndAttendanceStaffTable from '@/app/frontend_manager/manager_staff_hr/staff_directory/components/ManagerStaffDirectoryStaffTable';
import ManagerStaffPayrollAndAttendanceStaffModal from '@/app/frontend_manager/manager_staff_hr/staff_directory/components/ManagerStaffDirectoryStaffModal';
import ManagerStaffPayrollAndAttendanceStaffProfileModal from '@/app/frontend_manager/manager_staff_hr/staff_directory/components/ManagerStaffDirectoryStaffProfileModal';
import ManagerStaffDirectoryLocalToast from '@/app/frontend_manager/manager_staff_hr/staff_directory/components/ManagerStaffDirectoryLocalToast';
import { HR_ROLE_FILTER_OPTIONS } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_shared.constants';
import { ManagerStaffDirectoryProvider } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryUIState';
import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryLogic';

export default function StaffDirectoryMain() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const directory = useManagerStaffPayrollAndAttendanceLogic();
  const roleOptions = HR_ROLE_FILTER_OPTIONS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));

  return (
    <ManagerStaffDirectoryProvider value={directory}>
      <section className="min-h-full space-y-5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-text-primary">{t('COPY_HR_WORKSPACE')}</h1>
          <button
            type="button"
            onClick={directory.openAdd}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            data-testid="manager_hr-staff-directory-add-staff"
          >
            {t('TEXT_HR_ADD_STAFF')}
          </button>
        </div>

        <div className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.45fr)]">
          <div>
            <label
              htmlFor="manager-hr-staff-directory-search"
              className="mb-1.5 block text-xs font-semibold text-text-secondary"
            >
              {t('COPY_SEARCH_STAFF_2')}
            </label>
            <input
              id="manager-hr-staff-directory-search"
              type="search"
              value={directory.search}
              onChange={(event) => directory.setSearch(event.target.value)}
              placeholder={t('COPY_SEARCH_STAFF_1')}
              className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid="manager_hr-staff-directory-search"
            />
          </div>

          <div>
            <label
              htmlFor="manager-hr-staff-directory-role-filter"
              className="mb-1.5 block text-xs font-semibold text-text-secondary"
            >
              {t('COPY_FILTER_ROLE')}
            </label>
            <select
              id="manager-hr-staff-directory-role-filter"
              value={directory.roleFilter}
              onChange={(event) => directory.setRoleFilter(event.target.value)}
              className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              data-testid="manager_hr-staff-directory-role-filter"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <ManagerStaffDirectoryLocalToast
          toast={directory.toast}
          onClose={directory.hideToast}
          dismissLabel={t('COPY_CANCEL_1')}
        />

        <ManagerStaffPayrollAndAttendanceStaffTable />
        <ManagerStaffPayrollAndAttendanceStaffModal />
        <ManagerStaffPayrollAndAttendanceStaffProfileModal />
      </section>
    </ManagerStaffDirectoryProvider>
  );
}
