import React from 'react';

export interface ManagerStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
  iconBg?: string;
  iconColor?: string;
  subtitle?: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  className?: string;
  testId?: string;
  'data-testid'?: string;
}

export default function ManagerStatCard({
  title,
  value,
  icon: Icon,
  iconBg = 'bg-primary-subtle',
  iconColor = 'text-primary',
  subtitle,
  change,
  changeType = 'neutral',
  className = '',
  testId,
  'data-testid': dataTestIdProp,
}: ManagerStatCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-md ${className}`}
      data-testid={testId || dataTestIdProp}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-secondary">{title}</p>
          <p className="mt-1.5 truncate text-2xl font-bold tracking-tight text-primary">{value}</p>
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
            <Icon size={22} className={iconColor} strokeWidth={2} aria-hidden />
          </div>
        )}
      </div>
      {(subtitle || change) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`font-semibold ${
                changeType === 'up'
                  ? 'text-success'
                  : changeType === 'down'
                  ? 'text-danger'
                  : 'text-secondary'
              }`}
            >
              {change}
            </span>
          )}
          {subtitle && <span className="truncate text-secondary">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}

