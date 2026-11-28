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
      className={`relative rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] shadow-card overflow-hidden ${className}`}
      data-testid={testId}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F]/70 via-[#38BDF8]/70 to-[#10B981]/70" />
      {(title || description || action) && (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border dark:border-white/10 p-5 ${headerClassName}`}>
          <div className="min-w-0">
            {title && <h2 className="text-base font-bold text-primary truncate">{title}</h2>}
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
