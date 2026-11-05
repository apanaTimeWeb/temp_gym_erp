'use client';

import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  'data-testid'?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  tone = 'primary',
  className = '',
  'data-testid': testId,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const toneFill = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-primary',
  }[tone];

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || 'Progress'}
      className={`h-full w-full overflow-hidden rounded-full bg-border/40 ${className}`}
      data-testid={testId}
    >
      <div
        className={`h-full ${toneFill} motion-safe:transition-all motion-safe:duration-base`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default ProgressBar;

