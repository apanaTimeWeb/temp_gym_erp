import React from 'react';

export interface ManagerEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  dataTestId?: string;
  'data-testid'?: string;
  className?: string;
}

export default function ManagerEmptyState({
  icon,
  title,
  subtitle,
  action,
  dataTestId,
  'data-testid': testIdProp,
  className = '',
}: ManagerEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center ${className}`}
      data-testid={dataTestId || testIdProp}
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-highlight text-secondary">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      {subtitle && <p className="mt-1.5 max-w-sm text-xs text-secondary">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

