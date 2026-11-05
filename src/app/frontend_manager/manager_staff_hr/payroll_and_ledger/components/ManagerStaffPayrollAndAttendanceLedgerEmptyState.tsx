// RESPONSIBILITY: Renders ManagerStaffPayrollAndAttendanceLedgerEmptyState's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** @description Renders the entity-specific empty state for a staff ledger with no transactions. @dependencies Local dependencies are owned by this feature module (0 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerStaffPayrollAndAttendanceLedgerEmptyState() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');

  return (
    <div data-testid="manager_hr-ledger-empty-state" className="flex flex-col items-center gap-2 p-12 text-center text-text-secondary">
      <FileText size={18} strokeWidth={2} aria-hidden="true" className="opacity-20"/>
      <p>{t("COPY_NO_TRANSACTIONS_FOUND_STAFF_MEMBER")}</p>
    </div>
  );
}
