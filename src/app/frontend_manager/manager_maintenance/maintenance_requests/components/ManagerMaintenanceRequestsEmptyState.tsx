// RESPONSIBILITY: Presents the maintenance requests zero-result state without owning ticket creation or resolution actions.
'use client';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state when no maintenance requests are present. */
export default function ManagerMaintenanceRequestsEmptyState() {
  const t = useTranslations('MANAGER_MAINTENANCE_REQUESTS');
  return (
    <div data-testid="manager_maintenance-manager-maintenance-content-status-empty" role="status" aria-live="polite" className="py-20 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-4"><CheckCircle size={18} strokeWidth={2} className="text-success-text" aria-hidden="true" /></div>
      <h3 className="text-lg font-bold text-text-primary">{t('COPY_NO_MAINTENANCE_ISSUES_FOUND')}</h3>
      <p className="text-text-secondary text-sm mt-1">{t('COPY_LOG_ISSUE_WHEN_EQUIPMENT_FACILITY_NEEDS_ATTENTION')}</p>
    </div>
  );
}
