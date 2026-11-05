"use client";
// RESPONSIBILITY: Renders the zero-business pagination primitive for Admin tables. Data/filter semantics remain owned by each feature.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutPagination.tsx)

import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AdminPaginationProps } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsPaginationTypes';

/**
 * getVisiblePages is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
  if (currentPage <= 3) return [1, 2, 3, 4, 'ellipsis', totalPages];
  if (currentPage >= totalPages - 2) return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}

/**
 * AdminNavigationLayoutPagination renders the admin pagination UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutPagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: AdminPaginationProps) {
  const t = useTranslations();

  const hasSummary = Number.isSafeInteger(totalItems) && (totalItems ?? 0) > 0 && Number.isSafeInteger(itemsPerPage) && (itemsPerPage ?? 0) > 0 && (currentPage - 1) * itemsPerPage! < totalItems!;
  const startItem = hasSummary ? (currentPage - 1) * itemsPerPage! + 1 : null;
  const endItem = hasSummary ? Math.min(currentPage * itemsPerPage!, totalItems!) : null;
  const safeTotalPages = Math.max(totalPages, 1);

  return (
    <nav className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-border" aria-label={t('admin_layout.AdminNavigationLayoutPagination.text_100325b8d6')}>
      {hasSummary && startItem !== null && endItem !== null ? (
        <div className="text-sm text-center sm:text-left text-secondary" aria-live="polite" data-testid="admin_navigation-admin-pagination-control">
          {t('admin_layout.AdminNavigationLayoutPagination.text_163d8174ff')}<span className="font-medium text-primary">{startItem}</span> {t('admin_layout.AdminNavigationLayoutPagination.text_4374aaee24')}{' '}
          <span className="font-medium text-primary">{endItem}</span> {t('admin_layout.AdminNavigationLayoutPagination.text_de04fa0e29')}{' '}
          <span className="font-medium text-primary">{totalItems}</span> {t('admin_layout.AdminNavigationLayoutPagination.text_cdf7e925f5')}</div>
      ) : (
        <div className="text-sm text-secondary" aria-live="polite" data-testid="admin_navigation-admin-pagination-control-2">
          {t('admin_layout.AdminNavigationLayoutPagination.text_fb06270f7c')}<span className="font-medium text-primary">{currentPage}</span> {t('admin_layout.AdminNavigationLayoutPagination.text_de04fa0e29')}{' '}
          <span className="font-medium text-primary">{safeTotalPages}</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          aria-label={t('admin_layout.AdminNavigationLayoutPagination.text_81f547195b')}
          className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-all motion-safe:duration-fast motion-safe:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out"
         data-testid="admin_navigation-admin-pagination-click">
          <ChevronLeft size={18} aria-hidden="true"  strokeWidth={2}/>
        </button>

        <div className="flex items-center gap-1 mx-1">
          {getVisiblePages(currentPage, safeTotalPages).map((page, index) => (
            page === 'ellipsis' ? (
              <span key={`ellipsis-${index + 1}`} className="min-w-11 text-center px-2 text-secondary" aria-hidden="true">…</span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={t('AdminNavigationLayoutPagination.auto_goToPage', { page })}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-sm font-medium motion-safe:transition-all motion-safe:duration-fast motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  currentPage === page
                    ? 'bg-primary text-on-primary'
                    : 'text-secondary hover:bg-surface-hover hover:text-primary'
                }`}
               data-testid={`admin_navigation-admin-pagination-click-2-map56-${index}-1`}>
                {page}
              </button>
            )
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
          disabled={currentPage >= safeTotalPages}
          aria-label={t('admin_layout.AdminNavigationLayoutPagination.text_4bfc194b68')}
          className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-all motion-safe:duration-fast motion-safe:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out"
         data-testid="admin_navigation-admin-pagination-click-3">
          <ChevronRight size={18} aria-hidden="true"  strokeWidth={2}/>
        </button>
      </div>
    </nav>
  );
}
