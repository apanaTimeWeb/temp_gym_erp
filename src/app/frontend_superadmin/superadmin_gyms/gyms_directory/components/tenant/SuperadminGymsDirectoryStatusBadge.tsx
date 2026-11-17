'use client';

import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import type { TenantAccessStatus, TenantSubscriptionState } from '../../types/SuperadminGymsDirectoryTenantTypes';

export interface SuperadminGymsDirectoryStatusBadgeProps {
  type: 'access' | 'subscription';
  status: TenantAccessStatus | TenantSubscriptionState | string;
  className?: string;
}

export type StatusBadgeProps = SuperadminGymsDirectoryStatusBadgeProps;

export function SuperadminGymsDirectoryStatusBadge({ type, status, className = '' }: SuperadminGymsDirectoryStatusBadgeProps) {
  const s = (status || '').toUpperCase();

  if (type === 'access') {
    if (s === 'ACTIVE') {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success-text border border-success ${className}`}
        >
          <ShieldCheck size={13} aria-hidden="true" />
          <span>Active</span>
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger-bg text-danger-text border border-danger ${className}`}
      >
        <ShieldAlert size={13} aria-hidden="true" />
        <span>Inactive</span>
      </span>
    );
  }

  // Subscription state
  switch (s) {
    case 'ACTIVE':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success-text border border-success ${className}`}
        >
          <CheckCircle2 size={13} aria-hidden="true" />
          <span>Active</span>
        </span>
      );
    case 'TRIAL':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning-text border border-warning ${className}`}
        >
          <Clock size={13} aria-hidden="true" />
          <span>Trial</span>
        </span>
      );
    case 'EXPIRED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger-bg text-danger-text border border-danger ${className}`}
        >
          <AlertTriangle size={13} aria-hidden="true" />
          <span>Expired</span>
        </span>
      );
    case 'CANCELLED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-card text-secondary border border-border ${className}`}
        >
          <XCircle size={13} aria-hidden="true" />
          <span>Cancelled</span>
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-card text-disabled border border-border ${className}`}
        >
          <span>{status || 'Unknown'}</span>
        </span>
      );
  }
}

export const StatusBadge = SuperadminGymsDirectoryStatusBadge;
