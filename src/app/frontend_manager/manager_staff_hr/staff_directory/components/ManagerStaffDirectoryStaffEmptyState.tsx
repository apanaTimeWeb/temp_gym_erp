// RESPONSIBILITY: Renders the Manager HR staff entity-specific empty state and chooses search-aware copy.
'use client';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerEmptyState from '@/components/ui/manager_empty_state/ManagerEmptyState';

import type { ManagerStaffPayrollAndAttendanceStaffEmptyStateProps } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_payroll_and_attendance_staff_empty_state.types';

/** @description Empty-state presentation for the Manager HR staff list, including search-adjustment messaging. */
/**
 * @description Renders ManagerStaffPayrollAndAttendanceStaffEmptyState, the manager hr UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerStaffPayrollAndAttendanceStaffEmptyState({ hasSearch }: ManagerStaffPayrollAndAttendanceStaffEmptyStateProps) {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  return (
    <ManagerEmptyState
      dataTestId="manager_hr-hr-staff-empty-state"
      icon={<Users size={18} strokeWidth={2} />}
      title={hasSearch ? t('TEXT_NO_STAFF_SEARCH') : t('TEXT_NO_STAFF')}
      subtitle={hasSearch ? t('TEXT_ADJUST_STAFF_FILTERS') : t('TEXT_ADD_FIRST_STAFF')}
    />
  );
}
