import { PLANS_MASTER, findPlan } from '../constants/SuperadminGymsDirectoryPlans';
import type { Tenant, Plan } from '../types/SuperadminGymsDirectoryTenantTypes';

/**
 * Calculates Monthly Recurring Revenue (MRR) for a tenant.
 * Rule: Returns 0 if subscriptionState is TRIAL, EXPIRED, or CANCELLED,
 * or if accessStatus is INACTIVE. Otherwise returns the plan price.
 */
export function getMrr(
  tenant: Pick<Tenant, 'accessStatus' | 'subscriptionState' | 'planId'> | null | undefined,
  plans: Plan[] = PLANS_MASTER
): number {
  if (!tenant) return 0;

  if (tenant.accessStatus === 'INACTIVE') {
    return 0;
  }

  if (
    tenant.subscriptionState === 'TRIAL' ||
    tenant.subscriptionState === 'EXPIRED' ||
    tenant.subscriptionState === 'CANCELLED'
  ) {
    return 0;
  }

  const plan =
    plans.find((p) => p.id === tenant.planId || p.name.toLowerCase() === tenant.planId?.toLowerCase()) ||
    findPlan(tenant.planId);

  return plan ? plan.price : 0;
}

export interface DaysLeftResult {
  daysLeft: number;
  isExpired: boolean;
  isExpiringSoon: boolean; // < 7 days
  label: string;
}

/**
 * Calculates remaining days until expiry.
 * If past date: isExpired = true, label = 'Expired'
 * If < 7 days: isExpiringSoon = true
 */
export function getDaysLeft(expiryDateStr?: string | null, referenceDate: Date = new Date()): DaysLeftResult {
  if (!expiryDateStr) {
    return {
      daysLeft: 0,
      isExpired: true,
      isExpiringSoon: true,
      label: 'Expired',
    };
  }

  const expiry = new Date(expiryDateStr);
  if (isNaN(expiry.getTime())) {
    return {
      daysLeft: 0,
      isExpired: true,
      isExpiringSoon: true,
      label: 'Expired',
    };
  }

  // Calculate day difference based on UTC/calendar days
  const diffTime = expiry.getTime() - referenceDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return {
      daysLeft: diffDays,
      isExpired: true,
      isExpiringSoon: true,
      label: 'Expired',
    };
  }

  return {
    daysLeft: diffDays,
    isExpired: false,
    isExpiringSoon: diffDays <= 7,
    label: diffDays === 1 ? '1 day left' : `${diffDays} days left`,
  };
}

/**
 * Formats a date string in Indian Standard Time (IST, Asia/Kolkata) as "DD MMM YYYY".
 * Example: "18 Nov 2026"
 */
export function formatIstDate(dateStr?: string | null): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

/**
 * Formats a date string in IST with full time for tooltips.
 * Example: "18 Nov 2026, 02:30:15 PM IST"
 */
export function formatIstFullDateTime(dateStr?: string | null): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';

  const formatted = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(date);

  return `${formatted} IST`;
}

/**
 * Formats currency in INR with ₹ symbol and 2 decimal places.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Masks an email for privacy (e.g., jo****@iron.com).
 */
export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return email || '';
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return `${user}****@${domain}`;
  }
  return `${user.slice(0, 2)}****@${domain}`;
}
