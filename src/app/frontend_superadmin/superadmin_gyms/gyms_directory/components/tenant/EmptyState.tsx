'use client';

import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
  actionText?: string;
}

export function EmptyState({
  title = 'No gyms found',
  description = 'Try adjusting your search criteria or clearing active filters.',
  onClearFilters,
  actionText = 'Clear filters',
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center p-12 text-center my-6"
    >
      <div className="w-14 h-14 rounded-full bg-surface-hover flex items-center justify-center text-secondary mb-4 border border-border">
        <SearchX size={28} className="text-disabled" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-primary mb-1">{title}</h3>
      <p className="text-sm text-secondary max-w-sm mb-6">{description}</p>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="min-h-11 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
