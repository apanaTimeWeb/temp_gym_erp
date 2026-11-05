// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Renders the pagination bar (Previous/Next + page info + rows-per-page) shared across all TRAINER table views.
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerInfrastructurePaginationPageItem } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTrainerInfrastructurePaginationPageItem';

import type { TrainerInfrastructurePaginationProps } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileTrainerInfrastructurePaginationProps';







/**
 * @description Owns TrainerInfrastructurePagination behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Renders pagination controls for the infrastructure feature while preserving current query/URL state and keyboard accessibility.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructurePagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: TrainerInfrastructurePaginationProps) {
  const t = useTranslations('TRAINER_SHELL');
  const maxPage = Math.max(1, totalPages);
  const page = Math.max(1, Math.min(currentPage, maxPage));
  const goToPage = (next: number) => {
    if (next >= 1 && next <= maxPage && next !== page) onPageChange(next);
  };
  const startItem = totalItems !== undefined && itemsPerPage !== undefined && totalItems > 0 ? (page - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems !== undefined && itemsPerPage !== undefined ? Math.min(page * itemsPerPage, totalItems) : null;

  const getVisiblePages = (): TrainerInfrastructurePaginationPageItem[] => {
    if (totalPages <= 0) return [];
    if (maxPage <= 5) return Array.from({ length: maxPage }, (_, index) => index + 1);
    if (page <= 3) return [1, 2, 3, 4, 'ellipsis', maxPage];
    if (page >= maxPage - 2) return [1, 'ellipsis', maxPage - 3, maxPage - 2, maxPage - 1, maxPage];
    return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', maxPage];
  };

  return (
    <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
      {startItem !== null && endItem !== null && totalItems !== undefined ? (
        <div className="text-sm text-center sm:text-start text-secondary">
          {t("TEXT_SHOWING")}<span className="font-medium text-primary">{startItem}</span> {t("TEXT_TO")}<span className="font-medium text-primary">{endItem}</span> {t("TEXT_OF")}<span className="font-medium text-primary">{totalItems}</span> {t("TEXT_RESULTS")}</div>
      ) : (
        <div className="text-sm text-secondary">{t("TEXT_PAGE")} <span className="font-medium text-primary">{totalPages <= 0 ? 0 : page}</span> {t("TEXT_OF")} <span className="font-medium text-primary">{Math.max(0, totalPages)}</span></div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1 max-w-full">
        <button
          type="button"
          onClick={() => goToPage(page - 1)}
          disabled={totalPages <= 0 || page === 1}
          aria-label={t("TEXT_PREVIOUS_PAGE")}
          className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_infrastructure-trainerinfrastructurepagination-button_1">
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1 mx-1 max-w-full">
          {getVisiblePages().map((itemPage, index) =>
            itemPage === 'ellipsis' ? (
              <span key={`dots-${index}`} className="px-2 text-secondary" aria-hidden="true">…</span>
            ) : (
              <button
                key={itemPage}
                type="button"
                onClick={() => goToPage(itemPage)}
                aria-current={page === itemPage ? 'page' : undefined}
                aria-label={t("TEXT_GO_TO_PAGE", { page: itemPage })}
                className={`min-w-11 min-h-11 flex items-center justify-center rounded-lg text-sm font-medium motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${page === itemPage ? 'bg-primary text-on-primary' : 'text-secondary hover:text-primary hover:bg-input'} motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
               data-testid={`trainer_infrastructure-pagination-page-${itemPage}`}>
                {itemPage}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => goToPage(page + 1)}
          disabled={totalPages <= 0 || page === maxPage}
          aria-label={t("TEXT_NEXT_PAGE")}
          className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_infrastructure-trainerinfrastructurepagination-button_3">
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
