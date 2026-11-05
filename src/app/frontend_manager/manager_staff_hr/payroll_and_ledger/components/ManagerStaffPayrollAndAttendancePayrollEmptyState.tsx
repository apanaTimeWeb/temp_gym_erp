// RESPONSIBILITY: Renders the Manager HR payroll entity-specific empty state; payroll query state remains owned by the parent table/hook.
'use client';
import { Banknote } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerEmptyState from '@/components/ui/manager_empty_state/ManagerEmptyState';

/** @description Empty-state presentation for the Manager HR payroll list. */
/**
 * @description Renders ManagerStaffPayrollAndAttendancePayrollEmptyState, the manager hr UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerStaffPayrollAndAttendancePayrollEmptyState() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  return <ManagerEmptyState dataTestId="manager_hr-payroll-empty-state" icon={<Banknote size={18} strokeWidth={2} />} title={t('COPY_NO_PAYROLL_RECORDS_FOUND')} subtitle={t('COPY_THERE_NO_PAYROLL_RECORDS_SELECTED_FILTERS')} />;
}
