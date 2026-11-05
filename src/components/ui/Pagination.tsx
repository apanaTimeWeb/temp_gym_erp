'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  className?: string;
  'data-testid'?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
  'data-testid': testId,
}: PaginationProps) {
  if (totalPages <= 1 && !totalItems) return null;

  const startItem = totalItems !== undefined && itemsPerPage ? Math.min((currentPage - 1) * itemsPerPage + 1, totalItems) : null;
  const endItem = totalItems !== undefined && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  return (
    <nav
      aria-label="Pagination"
      className={`flex flex-wrap items-center justify-between gap-3 px-2 py-3 ${className}`}
      data-testid={testId}
    >
      <div className="text-xs text-secondary" aria-live="polite">
        {totalItems !== undefined && startItem !== null && endItem !== null ? (
          <span>
            Showing <strong className="font-semibold text-primary">{startItem}</strong> to{' '}
            <strong className="font-semibold text-primary">{endItem}</strong> of{' '}
            <strong className="font-semibold text-primary">{totalItems}</strong> results
          </span>
        ) : (
          <span>
            Page <strong className="font-semibold text-primary">{currentPage}</strong> of{' '}
            <strong className="font-semibold text-primary">{totalPages || 1}</strong>
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-input text-secondary motion-safe:transition-colors hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum = i + 1;
          if (totalPages > 5) {
            if (currentPage <= 3) pageNum = i + 1;
            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
            else pageNum = currentPage - 2 + i;
          }
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Go to page ${pageNum}`}
              className={`flex min-h-9 min-w-9 items-center justify-center rounded-lg text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'bg-primary text-text-on-primary shadow-sm'
                  : 'border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-input text-secondary motion-safe:transition-colors hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

export default Pagination;

