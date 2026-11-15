'use client';

import React from 'react';
import { findPlan } from '../../constants/plans';

interface PlanBadgeProps {
  planIdOrName?: string;
  className?: string;
}

export function PlanBadge({ planIdOrName, className = '' }: PlanBadgeProps) {
  const plan = findPlan(planIdOrName);
  const planKey = (plan?.id || planIdOrName || 'starter').toLowerCase();
  const displayName = plan?.name || planIdOrName?.toUpperCase() || 'STARTER';

  let colorClasses = 'bg-card text-secondary border border-border';

  switch (planKey) {
    case 'starter':
      colorClasses = 'bg-info-bg text-info-text border border-info';
      break;
    case 'basic':
      colorClasses = 'bg-success-bg text-success-text border border-success';
      break;
    case 'pro':
      colorClasses = 'bg-warning-bg text-warning-text border border-warning';
      break;
    case 'growth':
      colorClasses = 'bg-purple-subtle text-purple-text border border-purple-text';
      break;
    case 'enterprise':
      colorClasses = 'bg-purple-bg text-purple-text border border-purple-text';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${colorClasses} ${className}`}
    >
      {displayName}
    </span>
  );
}
