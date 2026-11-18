'use client';

import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SuperadminGymsDirectoryTablePaginationProps {
  total: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  pageSizeParam: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSizeStr: string) => void;
}

export function SuperadminGymsDirectoryTablePagination({
  total,
  currentPage,
  totalPages,
  isLoading,
  pageSizeParam,
  handlePageChange,
  handlePageSizeChange,
}: SuperadminGymsDirectoryTablePaginationProps) {
  const startRow = total === 0 ? 0 : (currentPage - 1) * pageSizeParam + 1;
  const endRow = Math.min(currentPage * pageSizeParam, total);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="p-3 px-4 border-t border-border bg-card shrink-0 flex items-center justify-between gap-4 flex-wrap text-xs text-secondary z-30">
      {/* Left: Showing X-Y of N */}
      <div>
        Showing <span className="font-bold text-primary">{startRow}</span>-
        <span className="font-bold text-primary">{endRow}</span> of{' '}
        <span className="font-bold text-primary">{total}</span> gyms
      </div>

      {/* Center: Pagination controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
          aria-label="Previous Page"
          className="min-h-9 px-3 py-1.5 rounded-lg border border-border text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers with ellipsis */}
        <div className="flex items-center gap-1 mx-1">
          {pageNumbers.map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-disabled font-mono">
                  …
                </span>
              );
            }
            const pageNum = Number(p);
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-8 min-w-8 px-2 rounded-lg font-semibold motion-safe:transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'hover:bg-surface-hover text-secondary hover:text-primary'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          aria-label="Next Page"
          className="min-h-9 px-3 py-1.5 rounded-lg border border-border text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Right: Page-Size Dropdown */}
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <select
          value={String(pageSizeParam)}
          onChange={(e) => handlePageSizeChange(e.target.value)}
          aria-label="Page Size"
          className="min-h-8 bg-input border border-border rounded-md ps-2.5 pe-7 py-1 text-xs text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
}

export default SuperadminGymsDirectoryTablePagination;
