'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface MetricCardProps {
  label?: string;
  title?: string;
  value: string | number;
  helper?: string;
  subtitle?: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  icon?: LucideIcon | React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  className?: string;
  'data-testid'?: string;
  testId?: string;
  onClick?: () => void;
  href?: string;
}

export function MetricCard({
  label,
  title,
  value,
  helper,
  subtitle,
  tone = 'default',
  icon: Icon,
  className = '',
  'data-testid': dataTestId,
  testId,
  onClick,
  href,
}: MetricCardProps) {
  const displayTitle = label || title || '';
  const displaySubtitle = helper || subtitle;

  const toneBorder = {
    primary: 'hover:border-primary',
    success: 'hover:border-success',
    warning: 'hover:border-warning',
    danger: 'hover:border-danger',
    info: 'hover:border-info',
    default: 'hover:border-border-hover',
  }[tone];

  const tonePill = {
    primary: 'bg-primary-subtle text-primary',
    success: 'bg-success-bg text-success',
    warning: 'bg-warning-bg text-warning',
    danger: 'bg-danger-bg text-danger',
    info: 'bg-primary-subtle text-primary',
    default: 'bg-surface-hover text-secondary',
  }[tone];

  const cardContent = (
    <article
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`rounded-2xl border border-border bg-card p-5 shadow-card transition-all motion-safe:duration-base ${toneBorder} ${onClick || href ? 'cursor-pointer hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary' : ''} ${className}`}
      data-testid={dataTestId || testId}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-secondary">{displayTitle}</p>
          <p className="mt-1.5 truncate text-2xl font-bold tracking-tight text-primary">{value}</p>
        </div>
        {Icon && (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tonePill}`}>
            <Icon size={20} strokeWidth={2} aria-hidden={true} />
          </div>
        )}
      </div>
      {displaySubtitle && (
        <p className="mt-3 truncate text-xs text-secondary">{displaySubtitle}</p>
      )}
    </article>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default MetricCard;

