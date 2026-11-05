'use client';

import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  action?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function EmptyState({
  title = 'No records found',
  description,
  icon: Icon = Inbox,
  actionText,
  onAction,
  action,
  className = '',
  'data-testid': testId,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
      data-testid={testId}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-hover text-secondary">
        <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-primary">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-secondary">{description}</p>
      )}
      {action ? (
        <div className="mt-5">{action}</div>
      ) : actionText && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-text-on-primary shadow-sm hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors"
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;

