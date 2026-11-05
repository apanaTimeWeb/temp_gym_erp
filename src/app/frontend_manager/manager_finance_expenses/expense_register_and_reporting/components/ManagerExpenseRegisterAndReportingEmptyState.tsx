// RESPONSIBILITY: Renders the Manager Expenses entity-specific empty state for the expenses list.
'use client';
import { Banknote } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerEmptyState from '@/components/ui/manager_empty_state/ManagerEmptyState';

/** @description Empty-state presentation for the Manager Expenses table when no expense records match the request. */
/**
 * @description Renders ManagerExpenseRegisterAndReportingEmptyState, the manager expenses UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerExpenseRegisterAndReportingEmptyState() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');
  return <ManagerEmptyState dataTestId="manager_expenses-expenses-empty-state" icon={<Banknote size={18} strokeWidth={2} />} title={t('COPY_NO_EXPENSES_FOUND')} subtitle={t('COPY_THERE_NO_EXPENSES_MATCHING_CURRENT_CRITERIA')} />;
}
