// RESPONSIBILITY: Presents the grievance resolution zero-result state without owning ticket filtering or resolution actions.
'use client';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state when no grievance tickets match the current view. */
export default function ManagerGrievanceResolutionEmptyState() {
  const t = useTranslations('MANAGER_GRIEVANCE_RESOLUTION');
  return (
    <div data-testid="manager_grievance-manager-grievance-content-status-empty" role="status" aria-live="polite" className="py-20 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-4"><CheckCircle size={18} strokeWidth={2} className="text-success-text" aria-hidden="true" /></div>
      <h3 className="text-lg font-bold text-text-primary">{t('COPY_NO_COMPLAINTS_FOUND')}</h3>
      <p className="text-text-secondary text-sm mt-1">{t('COPY_TRY_CLEARING_SEARCH_LOG_NEW_COMPLAINT')}</p>
    </div>
  );
}
