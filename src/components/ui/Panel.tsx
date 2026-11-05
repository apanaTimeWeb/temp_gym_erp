'use client';

import React from 'react';

export interface PanelProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  'data-testid'?: string;
}

export function Panel({
  title,
  description,
  action,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  'data-testid': testId,
}: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card shadow-card overflow-hidden ${className}`}
      data-testid={testId}
    >
      {(title || description || action) && (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border p-5 ${headerClassName}`}>
          <div>
            {title && <h2 className="text-base font-bold text-primary">{title}</h2>}
            {description && <p className="mt-1 text-xs text-secondary leading-relaxed">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

export default Panel;

