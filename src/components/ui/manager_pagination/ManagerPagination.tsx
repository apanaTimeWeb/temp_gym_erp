'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ManagerPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  className?: string;
  'data-testid'?: string;
}

export default function ManagerPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
  'data-testid': testId,
}: ManagerPaginationProps) {
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
            <strong className="font-semibold text-primary">{Math.max(1, totalPages)}</strong>
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-card p-1 text-sm text-primary transition-colors hover:bg-surface-hover disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: Math.min(5, Math.max(1, totalPages)) }, (_, i) => {
          let pageNum = i + 1;
          if (totalPages > 5 && currentPage > 3) {
            pageNum = Math.min(currentPage - 2 + i, totalPages);
          }
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'border border-border bg-card text-primary hover:bg-surface-hover'
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
          className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-card p-1 text-sm text-primary transition-colors hover:bg-surface-hover disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}

