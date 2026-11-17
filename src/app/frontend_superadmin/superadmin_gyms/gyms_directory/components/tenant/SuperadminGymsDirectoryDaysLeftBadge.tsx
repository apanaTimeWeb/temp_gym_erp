'use client';

import React from 'react';
import { AlertCircle, Clock, Calendar } from 'lucide-react';
import { getDaysLeft } from '../../utils/SuperadminGymsDirectoryTenantUtils';

export interface SuperadminGymsDirectoryDaysLeftBadgeProps {
  expiryDateStr?: string | null;
  className?: string;
}

export type DaysLeftBadgeProps = SuperadminGymsDirectoryDaysLeftBadgeProps;

export function SuperadminGymsDirectoryDaysLeftBadge({ expiryDateStr, className = '' }: SuperadminGymsDirectoryDaysLeftBadgeProps) {
  const result = getDaysLeft(expiryDateStr);

  if (result.isExpired) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-danger-bg text-danger-text border border-danger ${className}`}
        title="Subscription has expired"
      >
        <AlertCircle size={12} aria-hidden="true" />
        <span>Expired</span>
      </span>
    );
  }

  if (result.isExpiringSoon) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-danger-bg text-danger-text border border-danger animate-pulse ${className}`}
        title={`Expires soon: ${result.label}`}
      >
        <Clock size={12} aria-hidden="true" />
        <span>{result.label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-card text-secondary border border-border ${className}`}
      title={result.label}
    >
      <Calendar size={12} aria-hidden="true" />
      <span>{result.label}</span>
    </span>
  );
}

export const DaysLeftBadge = SuperadminGymsDirectoryDaysLeftBadge;
