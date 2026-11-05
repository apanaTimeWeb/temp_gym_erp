// RESPONSIBILITY: Presents the inquiries pipeline's zero-result state without owning filtering or inquiry actions.
'use client';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state for an empty or filtered inquiries pipeline. */
export default function ManagerInquiriesPipelineEmptyState({ hasFilters }: { hasFilters: boolean }) {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');
  return (
    <div data-testid="manager_inquiries-pipeline-empty-state" role="status" aria-live="polite" className="py-12 text-center text-sm text-text-secondary">
      {hasFilters ? t('COPY_NO_INQUIRIES_MATCH_FILTER') : t('COPY_NO_INQUIRIES_YET_ADD_FIRST_INQUIRY')}
    </div>
  );
}
