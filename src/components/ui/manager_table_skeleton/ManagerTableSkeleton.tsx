import React from 'react';

export interface ManagerTableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export default function ManagerTableSkeleton({
  rows = 5,
  columns = 5,
  className = '',
}: ManagerTableSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading table data"
      className={`w-full overflow-hidden rounded-xl border border-border bg-card p-4 shadow-card ${className}`}
    >
      <div className="space-y-3">
        <div className="flex gap-4 border-b border-border pb-3">
          {Array.from({ length: columns }, (_, i) => (
            <div
              key={`header-${i}`}
              className="h-4 flex-1 animate-pulse rounded bg-surface-highlight"
            />
          ))}
        </div>
        {Array.from({ length: rows }, (_, r) => (
          <div key={`row-${r}`} className="flex gap-4 py-2">
            {Array.from({ length: columns }, (_, c) => (
              <div
                key={`cell-${r}-${c}`}
                className="h-4 flex-1 animate-pulse rounded bg-surface-highlight/70"
              />
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

